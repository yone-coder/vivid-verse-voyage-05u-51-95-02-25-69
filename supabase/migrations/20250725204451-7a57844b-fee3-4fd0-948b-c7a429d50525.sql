-- Create sellers table
CREATE TABLE public.sellers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(3,2) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
  total_sales INTEGER NOT NULL DEFAULT 0,
  followers_count INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  trust_score INTEGER NOT NULL DEFAULT 70 CHECK (trust_score >= 0 AND trust_score <= 100),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view active sellers" 
ON public.sellers 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Authenticated users can create sellers" 
ON public.sellers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update sellers" 
ON public.sellers 
FOR UPDATE 
USING (true);

-- Add seller_id to products table
ALTER TABLE public.products 
ADD COLUMN seller_id UUID REFERENCES public.sellers(id);

-- Create trigger for automatic timestamp updates on sellers
CREATE TRIGGER update_sellers_updated_at
BEFORE UPDATE ON public.sellers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample sellers
INSERT INTO public.sellers (name, description, image_url, verified, rating, total_sales, followers_count, category, trust_score) VALUES
('TechWorld Store', 'Leading electronics retailer with cutting-edge gadgets', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop', true, 4.8, 2847, 15420, 'electronics', 95),
('Fashion Hub', 'Trendy fashion for all occasions', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop', true, 4.6, 1923, 8750, 'fashion', 88),
('Home & Garden', 'Everything for your home and garden needs', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop', true, 4.7, 1564, 6890, 'home', 92),
('Sports Central', 'Premium sports equipment and gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop', true, 4.5, 1345, 4560, 'sports', 87),
('Flash Deals Store', 'Amazing deals and discounts daily', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop', true, 4.9, 3256, 22340, 'flash-deals', 98);

-- Update existing products to have sellers (randomly assign)
UPDATE public.products 
SET seller_id = (
  SELECT id FROM public.sellers 
  WHERE category = ANY(products.tags) 
  LIMIT 1
)
WHERE seller_id IS NULL;