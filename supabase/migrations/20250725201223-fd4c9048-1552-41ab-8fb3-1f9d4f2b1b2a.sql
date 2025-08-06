-- Remove videos with external URLs, keeping only videos from Supabase storage bucket
DELETE FROM videos 
WHERE video_url NOT LIKE '%wkfzhcszhgewkvwukzes.supabase.co/storage/v1/object/public/videos%';