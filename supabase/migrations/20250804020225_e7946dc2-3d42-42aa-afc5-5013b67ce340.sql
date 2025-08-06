-- Add more products with different categories for flash deals tabs
INSERT INTO public.products (
  name, 
  description, 
  price, 
  discount_price, 
  tags, 
  flash_deal, 
  flash_start_time, 
  inventory,
  seller_trust_score
) VALUES 

-- New Arrivals Products
('Wireless Earbuds Pro', 'Latest wireless earbuds with noise cancellation', 89.99, 69.99, ARRAY['new-arrivals', 'electronics'], true, NOW(), 50, 85),
('Smart Fitness Watch', 'Advanced fitness tracking with heart rate monitor', 199.99, 149.99, ARRAY['new-arrivals', 'fitness'], true, NOW(), 30, 90),
('USB-C Fast Charger', 'High-speed charging cable with durable design', 24.99, 18.99, ARRAY['new-arrivals', 'accessories'], true, NOW(), 100, 75),
('Bluetooth Speaker Mini', 'Compact speaker with powerful sound', 45.99, 34.99, ARRAY['new-arrivals', 'audio'], true, NOW(), 75, 80),

-- Bestsellers Products  
('Premium Coffee Maker', 'Professional grade coffee machine', 299.99, 229.99, ARRAY['bestsellers', 'kitchen'], true, NOW(), 25, 95),
('Gaming Mechanical Keyboard', 'RGB backlit mechanical keyboard for gaming', 129.99, 99.99, ARRAY['bestsellers', 'gaming'], true, NOW(), 40, 88),
('Wireless Mouse Pro', 'High precision wireless gaming mouse', 79.99, 59.99, ARRAY['bestsellers', 'gaming'], true, NOW(), 60, 85),
('Smartphone Stand', 'Adjustable stand for phones and tablets', 19.99, 14.99, ARRAY['bestsellers', 'accessories'], true, NOW(), 150, 70),

-- Today's Deals Products
('LED Desk Lamp', 'Adjustable LED lamp with multiple brightness levels', 39.99, 24.99, ARRAY['deals', 'lighting'], true, NOW(), 80, 75),
('Portable Phone Charger', '10000mAh power bank with fast charging', 34.99, 19.99, ARRAY['deals', 'electronics'], true, NOW(), 120, 80),
('Bluetooth Headphones', 'Over-ear headphones with premium sound quality', 159.99, 89.99, ARRAY['deals', 'audio'], true, NOW(), 45, 85),
('Tablet Case Pro', 'Protective case with keyboard for tablets', 49.99, 29.99, ARRAY['deals', 'accessories'], true, NOW(), 90, 78),

-- Trending Now Products
('Smart Home Hub', 'Voice-controlled smart home assistant', 149.99, 119.99, ARRAY['trending', 'smart-home'], true, NOW(), 35, 90),
('Wireless Charging Pad', 'Fast wireless charger for smartphones', 29.99, 22.99, ARRAY['trending', 'accessories'], true, NOW(), 100, 82),
('4K Web Camera', 'Ultra HD webcam for streaming and video calls', 89.99, 69.99, ARRAY['trending', 'electronics'], true, NOW(), 55, 87),
('Smart Light Bulbs', 'Color-changing LED bulbs controlled by app', 24.99, 18.99, ARRAY['trending', 'lighting'], true, NOW(), 200, 75),

-- Staff Picks Products
('Premium Backpack', 'Waterproof laptop backpack with USB charging port', 79.99, 59.99, ARRAY['staff-picks', 'bags'], true, NOW(), 40, 88),
('Stainless Steel Water Bottle', 'Insulated bottle that keeps drinks cold for 24h', 34.99, 24.99, ARRAY['staff-picks', 'lifestyle'], true, NOW(), 80, 85),
('Ergonomic Office Chair', 'Comfortable chair with lumbar support', 199.99, 149.99, ARRAY['staff-picks', 'furniture'], true, NOW(), 20, 92),
('Noise Cancelling Headphones', 'Active noise cancellation for peaceful listening', 249.99, 189.99, ARRAY['staff-picks', 'audio'], true, NOW(), 25, 95),

-- Clearance Products
('Phone Case Bundle', 'Set of 3 protective cases for various phone models', 29.99, 12.99, ARRAY['clearance', 'accessories'], true, NOW(), 200, 70),
('Wired Earphones', 'Basic earphones with good sound quality', 19.99, 9.99, ARRAY['clearance', 'audio'], true, NOW(), 300, 65),
('USB Flash Drive 32GB', 'Reliable storage solution for files', 15.99, 7.99, ARRAY['clearance', 'storage'], true, NOW(), 150, 68),
('Screen Protector Pack', 'Tempered glass protectors for smartphones', 12.99, 5.99, ARRAY['clearance', 'accessories'], true, NOW(), 400, 60),

-- Under $25 Products
('Cable Organizer', 'Keep your cables neat and organized', 8.99, 6.99, ARRAY['under-25', 'organization'], true, NOW(), 250, 72),
('Phone Ring Holder', 'Secure grip and stand for smartphones', 5.99, 3.99, ARRAY['under-25', 'accessories'], true, NOW(), 500, 68),
('Microfiber Cleaning Cloth', 'Perfect for cleaning screens and lenses', 7.99, 4.99, ARRAY['under-25', 'cleaning'], true, NOW(), 300, 70),
('Sticky Notes Set', 'Colorful sticky notes for organization', 9.99, 6.99, ARRAY['under-25', 'office'], true, NOW(), 200, 65),

-- Gift Ideas Products
('Portable Bluetooth Speaker', 'Perfect gift for music lovers', 59.99, 44.99, ARRAY['gift-ideas', 'audio'], true, NOW(), 60, 85),
('Smart Mug Warmer', 'Keep beverages at perfect temperature', 39.99, 29.99, ARRAY['gift-ideas', 'kitchen'], true, NOW(), 45, 80),
('Wireless Charging Stand', 'Elegant charging solution for any desk', 34.99, 24.99, ARRAY['gift-ideas', 'accessories'], true, NOW(), 70, 78),
('Mini Projector', 'Portable projector for entertainment anywhere', 99.99, 74.99, ARRAY['gift-ideas', 'electronics'], true, NOW(), 30, 82),

-- Seasonal Picks Products
('Winter Tech Gloves', 'Touchscreen compatible gloves for cold weather', 19.99, 14.99, ARRAY['seasonal', 'accessories'], true, NOW(), 100, 75),
('Heated Car Seat Cover', 'Stay warm during winter commutes', 49.99, 37.99, ARRAY['seasonal', 'automotive'], true, NOW(), 35, 80),
('Portable Heater', 'Compact heater for small spaces', 79.99, 59.99, ARRAY['seasonal', 'appliances'], true, NOW(), 25, 85),
('LED String Lights', 'Decorative lights for any season', 16.99, 11.99, ARRAY['seasonal', 'decoration'], true, NOW(), 150, 72),

-- Premium Selection Products
('Professional Camera Lens', 'High-quality lens for photography enthusiasts', 499.99, 399.99, ARRAY['premium', 'photography'], true, NOW(), 15, 95),
('Luxury Leather Wallet', 'Handcrafted wallet with RFID protection', 89.99, 69.99, ARRAY['premium', 'accessories'], true, NOW(), 40, 90),
('Premium Coffee Beans', 'Single-origin beans from exclusive farms', 34.99, 27.99, ARRAY['premium', 'coffee'], true, NOW(), 60, 88),
('Wireless Charging Station', 'Multi-device charging hub with premium design', 129.99, 99.99, ARRAY['premium', 'electronics'], true, NOW(), 30, 92);