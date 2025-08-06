-- Create collections table for sellers to categorize their products
CREATE TABLE public.collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  product_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view collections" 
ON public.collections 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create collections" 
ON public.collections 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update collections" 
ON public.collections 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete collections" 
ON public.collections 
FOR DELETE 
USING (true);

-- Add trigger for timestamps
CREATE TRIGGER update_collections_updated_at
BEFORE UPDATE ON public.collections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample collections for our sellers
INSERT INTO public.collections (seller_id, name, description, cover_image, product_count) VALUES
-- TechStore Pro collections
((SELECT id FROM sellers WHERE name = 'TechStore Pro'), 'Laptops & Computers', 'High-performance laptops and desktop computers', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop', 15),
((SELECT id FROM sellers WHERE name = 'TechStore Pro'), 'Mobile Accessories', 'Phone cases, chargers, and mobile tech', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop', 8),

-- Fashion Hub collections  
((SELECT id FROM sellers WHERE name = 'Fashion Hub'), 'Summer Collection', 'Trendy summer clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop', 12),
((SELECT id FROM sellers WHERE name = 'Fashion Hub'), 'Winter Essentials', 'Warm clothing for cold weather', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop', 9),

-- Home Essentials collections
((SELECT id FROM sellers WHERE name = 'Home Essentials'), 'Kitchen & Dining', 'Everything you need for your kitchen', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', 18),
((SELECT id FROM sellers WHERE name = 'Home Essentials'), 'Living Room Decor', 'Stylish furniture and decorations', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', 11),

-- Sports Central collections
((SELECT id FROM sellers WHERE name = 'Sports Central'), 'Fitness Equipment', 'Professional gym and home fitness gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop', 14),
((SELECT id FROM sellers WHERE name = 'Sports Central'), 'Athletic Wear', 'Comfortable sportswear for all activities', 'https://images.unsplash.com/photo-1506629905877-4d8d78d82a1f?w=300&h=200&fit=crop', 7),

-- Beauty Boutique collections
((SELECT id FROM sellers WHERE name = 'Beauty Boutique'), 'Skincare Essentials', 'Premium skincare products for all skin types', 'https://images.unsplash.com/photo-1556228578-dd6acaaac5ce?w=300&h=200&fit=crop', 16),
((SELECT id FROM sellers WHERE name = 'Beauty Boutique'), 'Makeup Collection', 'Professional makeup and cosmetics', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=200&fit=crop', 13),

-- Electronics World collections
((SELECT id FROM sellers WHERE name = 'Electronics World'), 'Smart Home', 'Intelligent devices for modern homes', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', 10),
((SELECT id FROM sellers WHERE name = 'Electronics World'), 'Audio & Video', 'High-quality sound and entertainment systems', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop', 6);

-- Add collection_id column to products table
ALTER TABLE public.products ADD COLUMN collection_id UUID REFERENCES public.collections(id);

-- Update some products to be part of collections (randomly assign)
UPDATE products SET collection_id = (
  SELECT c.id FROM collections c 
  WHERE c.seller_id = products.seller_id 
  ORDER BY RANDOM() 
  LIMIT 1
) WHERE seller_id IS NOT NULL AND RANDOM() < 0.7;