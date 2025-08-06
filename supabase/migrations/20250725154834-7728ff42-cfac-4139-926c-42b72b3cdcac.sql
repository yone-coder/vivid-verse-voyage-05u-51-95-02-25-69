-- Add tags column to products table
ALTER TABLE public.products 
ADD COLUMN tags TEXT[];

-- Create an index for better performance on tag queries
CREATE INDEX idx_products_tags ON public.products USING GIN(tags);

-- Update existing products with discount_price to have 'flash-deals' tag
UPDATE public.products 
SET tags = ARRAY['flash-deals'] 
WHERE discount_price IS NOT NULL;