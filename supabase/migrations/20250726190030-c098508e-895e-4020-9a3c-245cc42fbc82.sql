-- Create fresh flash deals with current timestamp
UPDATE products 
SET 
  flash_deal = true,
  flash_start_time = NOW(),
  discount_price = price * 0.7  -- 30% discount
WHERE id IN (
  SELECT id FROM products 
  WHERE flash_deal = false 
  LIMIT 3
);