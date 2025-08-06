-- Update the first 5 products to be variable products
UPDATE products 
SET product_type = 'variable' 
WHERE id IN (
  '60c749ab-321d-484b-9bfd-3b1a6c1a218c',
  'aae97882-a3a1-4db5-b4f5-156705cd10ee', 
  '6a8cabae-8ac1-416c-803f-59267c27105d',
  '3bef7e72-64ea-41bc-8ded-c511be656ae4',
  '40ac2361-61d0-40d4-81f6-423fa08fb8e8'
);