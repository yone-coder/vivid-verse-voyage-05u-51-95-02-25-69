-- Add a product_type column to products table to distinguish between variable and single products
ALTER TABLE products ADD COLUMN product_type TEXT DEFAULT 'single' CHECK (product_type IN ('single', 'variable'));

-- Insert a variable product for testing
INSERT INTO products (id, name, description, price, discount_price, product_type, inventory) VALUES 
('11111111-1111-1111-1111-111111111111', 'Wireless Headphones Pro', 'Premium wireless headphones with multiple color options', 199.99, 149.99, 'variable', 100);

-- Insert a single product for testing  
INSERT INTO products (id, name, description, price, discount_price, product_type, inventory) VALUES
('22222222-2222-2222-2222-222222222222', 'USB Cable', 'High-quality USB-C cable', 29.99, 24.99, 'single', 50);

-- Add some images for the variable product
INSERT INTO product_images (product_id, src, alt) VALUES 
('11111111-1111-1111-1111-111111111111', '/placeholder.svg', 'Wireless Headphones Pro'),
('11111111-1111-1111-1111-111111111111', '/placeholder.svg', 'Wireless Headphones Pro Side View');

-- Add some images for the single product
INSERT INTO product_images (product_id, src, alt) VALUES 
('22222222-2222-2222-2222-222222222222', '/placeholder.svg', 'USB Cable'),
('22222222-2222-2222-2222-222222222222', '/placeholder.svg', 'USB Cable Detail');