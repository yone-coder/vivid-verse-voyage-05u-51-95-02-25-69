-- Distribute products among sellers to ensure each seller has multiple products

-- Update tech-related products for TechWorld Store
UPDATE products 
SET seller_id = '7f4e937f-d215-4e86-a286-8cfa3e8b4525'
WHERE seller_id IS NULL 
AND (name ILIKE '%webcam%' OR name ILIKE '%mouse%' OR name ILIKE '%laptop%' OR name ILIKE '%smartwatch%');

-- Update remaining products for Fashion Hub  
WITH fashion_products AS (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  ORDER BY created_at 
  LIMIT 5
)
UPDATE products 
SET seller_id = '1fa13d0a-b2d1-45da-9e7e-ef3b8a3c3041'
WHERE id IN (SELECT id FROM fashion_products);

-- Update home-related products for Home & Garden
WITH home_products AS (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  AND (name ILIKE '%lamp%' OR name ILIKE '%ceiling%' OR name ILIKE '%desk%')
  LIMIT 5
)
UPDATE products 
SET seller_id = '74a5e2e0-f07b-4f3e-83f3-b918d18b2cb4'
WHERE id IN (SELECT id FROM home_products);

-- Update remaining products for Sports Central
WITH sports_products AS (
  SELECT id FROM products 
  WHERE seller_id IS NULL 
  ORDER BY created_at DESC
  LIMIT 5
)
UPDATE products 
SET seller_id = 'd4bef095-fb57-4eaa-89f3-d54776735658'
WHERE id IN (SELECT id FROM sports_products);