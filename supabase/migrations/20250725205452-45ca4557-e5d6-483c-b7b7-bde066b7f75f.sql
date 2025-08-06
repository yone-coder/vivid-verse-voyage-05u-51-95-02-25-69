-- Distribute products among sellers to ensure each seller has multiple products
-- First, let's update products to assign them to different sellers

UPDATE products 
SET seller_id = '7f4e937f-d215-4e86-a286-8cfa3e8b4525'  -- TechWorld Store
WHERE seller_id IS NULL 
AND name ILIKE ANY (ARRAY['%webcam%', '%mouse%', '%laptop%', '%smartwatch%'])
AND id IN (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  AND name ILIKE ANY (ARRAY['%webcam%', '%mouse%', '%laptop%', '%smartwatch%'])
  LIMIT 5
);

UPDATE products 
SET seller_id = '1fa13d0a-b2d1-45da-9e7e-ef3b8a3c3041'  -- Fashion Hub
WHERE seller_id IS NULL 
AND id IN (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  LIMIT 5
);

UPDATE products 
SET seller_id = '74a5e2e0-f07b-4f3e-83f3-b918d18b2cb4'  -- Home & Garden
WHERE seller_id IS NULL 
AND name ILIKE ANY (ARRAY['%lamp%', '%ceiling%', '%desk%', '%home%'])
AND id IN (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  AND name ILIKE ANY (ARRAY['%lamp%', '%ceiling%', '%desk%', '%home%'])
  LIMIT 5
);

UPDATE products 
SET seller_id = 'd4bef095-fb57-4eaa-89f3-d54776735658'  -- Sports Central
WHERE seller_id IS NULL 
AND id IN (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  LIMIT 5
);

-- Assign any remaining products to TechWorld Store to ensure it has enough
UPDATE products 
SET seller_id = '7f4e937f-d215-4e86-a286-8cfa3e8b4525'  -- TechWorld Store
WHERE seller_id IS NULL 
LIMIT 5;