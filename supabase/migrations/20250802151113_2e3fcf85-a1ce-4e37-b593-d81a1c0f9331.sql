-- Add foreign key relationship between products and sellers
ALTER TABLE products 
ADD CONSTRAINT products_seller_id_fkey 
FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE SET NULL;

-- Insert sample sellers with real data
INSERT INTO sellers (id, name, description, image_url, verified, rating, total_sales, followers_count, category, email, phone, address, trust_score, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'TechNova Store', 'Premium electronics and gadgets retailer specializing in cutting-edge technology products', '20250322_230219.jpg', true, 4.8, 15420, 25600, 'Electronics', 'contact@technova.com', '+1-555-0123', '123 Tech Avenue, Silicon Valley, CA', 92, 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'Fashion Forward', 'Trendy clothing and accessories for the modern lifestyle', '20250322_230219.jpg', true, 4.6, 8950, 18300, 'Fashion', 'hello@fashionforward.com', '+1-555-0456', '456 Style Street, New York, NY', 89, 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'Home & Garden Pro', 'Quality home improvement and garden supplies', '20250322_230219.jpg', false, 4.4, 6200, 12100, 'Home & Garden', 'info@homegardenPro.com', '+1-555-0789', '789 Garden Lane, Portland, OR', 85, 'active'),
('550e8400-e29b-41d4-a716-446655440004', 'Sports Central', 'Sports equipment and outdoor gear for athletes and enthusiasts', '20250322_230219.jpg', true, 4.7, 11200, 20800, 'Sports', 'team@sportscentral.com', '+1-555-0321', '321 Athletic Blvd, Denver, CO', 90, 'active'),
('550e8400-e29b-41d4-a716-446655440005', 'Beauty Boutique', 'Premium beauty products and cosmetics', '20250322_230219.jpg', true, 4.9, 9800, 22400, 'Beauty', 'beauty@beautyboutique.com', '+1-555-0654', '654 Beauty Circle, Los Angeles, CA', 94, 'active');

-- Update existing products to have seller associations
UPDATE products SET seller_id = '550e8400-e29b-41d4-a716-446655440001' WHERE tags @> ARRAY['electronics'] OR tags @> ARRAY['tech'];
UPDATE products SET seller_id = '550e8400-e29b-41d4-a716-446655440002' WHERE tags @> ARRAY['fashion'] OR tags @> ARRAY['clothing'];
UPDATE products SET seller_id = '550e8400-e29b-41d4-a716-446655440003' WHERE tags @> ARRAY['home'] OR tags @> ARRAY['garden'];
UPDATE products SET seller_id = '550e8400-e29b-41d4-a716-446655440004' WHERE tags @> ARRAY['sports'] OR tags @> ARRAY['outdoor'];
UPDATE products SET seller_id = '550e8400-e29b-41d4-a716-446655440005' WHERE tags @> ARRAY['beauty'] OR tags @> ARRAY['cosmetics'];

-- Add some video reels for sellers
INSERT INTO videos (id, title, description, video_url, thumbnail_url, duration, views, likes, username, avatar_url, user_id, tags) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Latest iPhone 15 Unboxing', 'Check out the newest iPhone 15 features and specs', 'sample-tech-video.mp4', 'iphone-thumbnail.jpg', 45, 12500, 890, 'TechNova Store', '20250322_230219.jpg', '550e8400-e29b-41d4-a716-446655440001', ARRAY['tech', 'unboxing', 'iphone']),
('660e8400-e29b-41d4-a716-446655440002', 'Summer Fashion Haul 2024', 'Trending summer outfits and styling tips', 'sample-fashion-video.mp4', 'fashion-thumbnail.jpg', 60, 8200, 654, 'Fashion Forward', '20250322_230219.jpg', '550e8400-e29b-41d4-a716-446655440002', ARRAY['fashion', 'haul', 'summer']),
('660e8400-e29b-41d4-a716-446655440003', 'Garden Makeover Tips', 'Transform your backyard with these simple tips', 'sample-garden-video.mp4', 'garden-thumbnail.jpg', 90, 5600, 423, 'Home & Garden Pro', '20250322_230219.jpg', '550e8400-e29b-41d4-a716-446655440003', ARRAY['garden', 'diy', 'makeover']),
('660e8400-e29b-41d4-a716-446655440004', 'Best Running Gear 2024', 'Top running equipment for serious athletes', 'sample-sports-video.mp4', 'sports-thumbnail.jpg', 75, 9800, 567, 'Sports Central', '20250322_230219.jpg', '550e8400-e29b-41d4-a716-446655440004', ARRAY['running', 'sports', 'gear']),
('660e8400-e29b-41d4-a716-446655440005', 'Evening Makeup Tutorial', 'Create a stunning evening look with our products', 'sample-beauty-video.mp4', 'beauty-thumbnail.jpg', 120, 15600, 1200, 'Beauty Boutique', '20250322_230219.jpg', '550e8400-e29b-41d4-a716-446655440005', ARRAY['makeup', 'tutorial', 'beauty']);