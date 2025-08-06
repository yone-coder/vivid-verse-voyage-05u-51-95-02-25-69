-- Add flash deals tracking fields to products table
ALTER TABLE public.products 
ADD COLUMN flash_deal BOOLEAN DEFAULT false,
ADD COLUMN flash_start_time TIMESTAMP WITH TIME ZONE,
ADD COLUMN views INTEGER DEFAULT 0,
ADD COLUMN saves INTEGER DEFAULT 0,
ADD COLUMN seller_trust_score INTEGER DEFAULT 70,
ADD COLUMN last_activity TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create index for efficient flash deals queries
CREATE INDEX idx_products_flash_deals ON public.products(flash_deal, flash_start_time) WHERE flash_deal = true;
CREATE INDEX idx_products_views ON public.products(views);
CREATE INDEX idx_products_activity ON public.products(last_activity);

-- Create function to automatically select flash deals
CREATE OR REPLACE FUNCTION public.auto_select_flash_deals()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    category_record RECORD;
    selected_products UUID[];
BEGIN
    -- First, expire old flash deals (older than 24 hours)
    UPDATE products 
    SET flash_deal = false, flash_start_time = null
    WHERE flash_deal = true 
    AND flash_start_time < NOW() - INTERVAL '24 hours';

    -- Get categories to ensure diversity
    FOR category_record IN 
        SELECT DISTINCT unnest(tags) as category_name 
        FROM products 
        WHERE tags IS NOT NULL
        AND flash_deal = false
    LOOP
        -- Select top product from each category based on criteria
        WITH eligible_products AS (
            SELECT id, name, views, saves, seller_trust_score,
                   ROW_NUMBER() OVER (ORDER BY views DESC, saves DESC, created_at DESC) as rn
            FROM products p
            WHERE p.flash_deal = false
            AND p.created_at > NOW() - INTERVAL '5 days'  -- Recent products
            AND p.seller_trust_score >= 70  -- Trusted sellers
            AND p.views >= 10  -- Minimum engagement
            AND p.tags @> ARRAY[category_record.category_name]  -- From current category
            AND p.name IS NOT NULL AND p.name != ''  -- Has title
            AND p.description IS NOT NULL AND p.description != ''  -- Has description
        )
        SELECT id INTO selected_products[array_length(selected_products, 1) + 1]
        FROM eligible_products 
        WHERE rn = 1;
    END LOOP;

    -- Update selected products to be flash deals
    UPDATE products 
    SET flash_deal = true, 
        flash_start_time = NOW(),
        tags = CASE 
            WHEN 'flash-deals' = ANY(tags) THEN tags
            ELSE array_append(tags, 'flash-deals')
        END
    WHERE id = ANY(selected_products)
    AND array_length(selected_products, 1) > 0;

    -- Log the selection
    RAISE NOTICE 'Selected % products for flash deals', array_length(selected_products, 1);
END;
$$;

-- Create function to increment product views
CREATE OR REPLACE FUNCTION public.increment_product_views(product_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE products 
    SET views = views + 1,
        last_activity = NOW()
    WHERE id = product_id;
END;
$$;

-- Create function to increment product saves
CREATE OR REPLACE FUNCTION public.increment_product_saves(product_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE products 
    SET saves = saves + 1,
        last_activity = NOW()
    WHERE id = product_id;
END;
$$;