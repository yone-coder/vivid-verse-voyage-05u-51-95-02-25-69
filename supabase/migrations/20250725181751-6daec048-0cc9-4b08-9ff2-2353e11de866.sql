-- Update a product to be a flash deal for testing
UPDATE products 
SET 
  flash_deal = true,
  flash_start_time = NOW(),
  views = 15,
  tags = CASE 
    WHEN 'flash-deals' = ANY(tags) THEN tags
    ELSE array_append(COALESCE(tags, ARRAY[]::text[]), 'flash-deals')
  END,
  discount_price = price * 0.7  -- 30% discount
WHERE id = '60c749ab-321d-484b-9bfd-3b1a6c1a218c';