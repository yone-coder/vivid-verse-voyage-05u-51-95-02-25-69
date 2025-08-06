-- Create storage bucket for seller logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('seller-logos', 'seller-logos', true);

-- Create storage policies for seller logos
CREATE POLICY "Anyone can view seller logos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'seller-logos');

CREATE POLICY "Authenticated users can upload seller logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'seller-logos');

CREATE POLICY "Authenticated users can update seller logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'seller-logos');