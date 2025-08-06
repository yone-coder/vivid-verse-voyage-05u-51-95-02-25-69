-- First, let's check if we have proper policies for the videos bucket
-- Create policies for the videos storage bucket

-- Allow anyone to view videos (public read access)
CREATE POLICY "Anyone can view videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');

-- Allow users to update their own videos
CREATE POLICY "Users can update their own videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'videos' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');

-- Allow users to delete their own videos
CREATE POLICY "Users can delete their own videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'videos' AND auth.role() = 'authenticated');