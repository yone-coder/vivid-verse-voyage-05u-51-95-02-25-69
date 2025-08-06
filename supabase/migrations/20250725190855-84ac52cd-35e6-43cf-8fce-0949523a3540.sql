-- Create videos table for reels
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 30, -- duration in seconds
  views INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  user_id UUID,
  username TEXT NOT NULL,
  avatar_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view videos" 
ON public.videos 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create videos" 
ON public.videos 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos" 
ON public.videos 
FOR UPDATE 
USING (true);

CREATE POLICY "Authenticated users can delete videos" 
ON public.videos 
FOR DELETE 
USING (true);

-- Add trigger for timestamps
CREATE TRIGGER update_videos_updated_at
BEFORE UPDATE ON public.videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample video data
INSERT INTO public.videos (title, description, video_url, thumbnail_url, duration, views, likes, username, avatar_url, tags) VALUES
('Amazing Street Food in Bangkok', 'Check out this incredible street food tour in Bangkok! The flavors are unreal! #food #travel', 'https://assets.mixkit.co/videos/preview/mixkit-person-cooking-in-a-hot-pot-4787-large.mp4', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop', 45, 125000, 8500, 'foodlover_thai', 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&h=100&fit=crop&crop=face', ARRAY['food', 'travel', 'bangkok', 'street-food']),

('DIY Phone Case Decoration', 'Transform your boring phone case into something amazing! Super easy tutorial #diy #crafts', 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-computer-keyboard-4851-large.mp4', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop', 60, 89000, 6200, 'craftqueen', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', ARRAY['diy', 'crafts', 'phone', 'tutorial']),

('Cute Cat Compilation', 'These cats will make your day better! Warning: extreme cuteness ahead 🐱', 'https://assets.mixkit.co/videos/preview/mixkit-cat-resting-on-a-wooden-surface-4870-large.mp4', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop', 35, 210000, 15600, 'catlover99', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', ARRAY['cats', 'animals', 'cute', 'pets']),

('Fashion Haul Summer 2024', 'My latest fashion finds! Affordable and trendy pieces for summer ☀️ #fashion #haul', 'https://assets.mixkit.co/videos/preview/mixkit-makeup-artist-applies-moisturizer-to-the-face-of-a-woman-48613-large.mp4', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop', 90, 67000, 4800, 'fashionista_em', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', ARRAY['fashion', 'haul', 'summer', 'style']),

('Quick Cooking Recipes', 'Cook amazing meals in under 15 minutes! Perfect for busy weekdays 🍳', 'https://assets.mixkit.co/videos/preview/mixkit-cooking-in-a-camping-site-12992-large.mp4', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop', 55, 156000, 9800, 'quickchef', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', ARRAY['cooking', 'recipes', 'quick', 'food']),

('Travel Vlog: Tokyo Adventure', 'First day in Tokyo and already blown away! Come explore with me 🗾', 'https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-busy-street-4063-large.mp4', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=600&fit=crop', 120, 98000, 7200, 'wanderlust_sarah', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', ARRAY['travel', 'japan', 'tokyo', 'vlog']),

('Tech Review: Latest Gadgets', 'Testing the newest tech gadgets - are they worth the hype? 📱💻', 'https://assets.mixkit.co/videos/preview/mixkit-person-using-a-smartphone-4913-large.mp4', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop', 75, 134000, 8900, 'techguru_alex', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face', ARRAY['tech', 'review', 'gadgets', 'technology']),

('Workout Motivation', 'No gym? No problem! Full body workout you can do anywhere 💪', 'https://assets.mixkit.co/videos/preview/mixkit-person-doing-yoga-exercises-4928-large.mp4', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop', 40, 203000, 12400, 'fitlife_coach', 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=100&h=100&fit=crop&crop=face', ARRAY['fitness', 'workout', 'health', 'motivation']);