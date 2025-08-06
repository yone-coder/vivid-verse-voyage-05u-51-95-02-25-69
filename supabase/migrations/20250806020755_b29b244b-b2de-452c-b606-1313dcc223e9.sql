-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own videos" ON storage.objects;

-- Create more permissive policies that work with custom auth
-- Allow anyone to upload videos to the videos bucket
CREATE POLICY "Anyone can upload videos to videos bucket" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'videos');

-- Allow anyone to update videos in the videos bucket
CREATE POLICY "Anyone can update videos in videos bucket" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'videos')
WITH CHECK (bucket_id = 'videos');

-- Allow anyone to delete videos in the videos bucket  
CREATE POLICY "Anyone can delete videos in videos bucket" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'videos');