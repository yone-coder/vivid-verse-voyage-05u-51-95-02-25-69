-- Add inventory field to products table for stock management
ALTER TABLE public.products 
ADD COLUMN inventory integer DEFAULT 100;

-- Add location field for better location tracking
ALTER TABLE public.products 
ADD COLUMN location text;

-- Add status field for approval/verification tracking
ALTER TABLE public.products 
ADD COLUMN status text DEFAULT 'active' CHECK (status IN ('active', 'pending', 'approved', 'rejected', 'out_of_stock'));

-- Update existing products to have some realistic inventory values
UPDATE public.products 
SET inventory = CASE 
  WHEN random() < 0.1 THEN 0  -- 10% out of stock
  WHEN random() < 0.3 THEN floor(random() * 10 + 1)::integer  -- 20% low stock (1-10)
  ELSE floor(random() * 100 + 10)::integer  -- 70% good stock (10-110)
END
WHERE inventory IS NULL;