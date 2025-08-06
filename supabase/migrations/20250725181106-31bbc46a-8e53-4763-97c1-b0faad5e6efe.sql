-- Fix the auto_select_flash_deals function
CREATE OR REPLACE FUNCTION public.auto_select_flash_deals()
RETURNS void
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE
    category_record RECORD;
    selected_product UUID;
    selected_count INTEGER := 0;
BEGIN
    -- First, expire old flash deals (older than 24 hours)
    UPDATE products 
    SET flash_deal = false, flash_start_time = null
    WHERE flash_deal = true 
    AND flash_start_time < NOW() - INTERVAL '24 hours';

    -- Get categories to ensure diversity (limit to max 12 products)
    FOR category_record IN 
        SELECT DISTINCT unnest(tags) as category_name 
        FROM products 
        WHERE tags IS NOT NULL
        AND flash_deal = false
        LIMIT 12
    LOOP
        -- Select top product from each category based on criteria
        SELECT id INTO selected_product
        FROM products p
        WHERE p.flash_deal = false
        AND p.created_at > NOW() - INTERVAL '5 days'  -- Recent products
        AND p.seller_trust_score >= 70  -- Trusted sellers
        AND p.views >= 10  -- Minimum engagement
        AND p.tags @> ARRAY[category_record.category_name]  -- From current category
        AND p.name IS NOT NULL AND p.name != ''  -- Has title
        AND p.description IS NOT NULL AND p.description != ''  -- Has description
        ORDER BY p.views DESC, p.saves DESC, p.created_at DESC
        LIMIT 1;

        -- If we found a product, mark it as flash deal
        IF selected_product IS NOT NULL THEN
            UPDATE products 
            SET flash_deal = true, 
                flash_start_time = NOW(),
                tags = CASE 
                    WHEN 'flash-deals' = ANY(tags) THEN tags
                    ELSE array_append(tags, 'flash-deals')
                END
            WHERE id = selected_product;
            
            selected_count := selected_count + 1;
            selected_product := NULL; -- Reset for next iteration
        END IF;
    END LOOP;

    -- Log the selection
    RAISE NOTICE 'Selected % products for flash deals', selected_count;
END;
$$;