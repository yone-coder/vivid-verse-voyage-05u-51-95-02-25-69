-- Fix the double-encoded video filename in hero_banners table
UPDATE hero_banners 
SET image = 'Cillian Murphy_ _I love sleeping_ and I need sleep._(720P_HD).mp4'
WHERE image = 'Cillian%20Murphy_%20_I%20love%20sleeping_%20and%20I%20need%20sleep._(720P_HD).mp4';