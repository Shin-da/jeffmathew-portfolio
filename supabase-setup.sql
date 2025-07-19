-- Supabase Database Setup for Jeff Mathew Garcia Portfolio
-- Artwork Like System

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    created_date DATE,
    base_likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create artwork_likes table
CREATE TABLE IF NOT EXISTS artwork_likes (
    id SERIAL PRIMARY KEY,
    artwork_id INTEGER NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    user_ip VARCHAR(45) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(artwork_id, user_ip)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artwork_likes_artwork_id ON artwork_likes(artwork_id);
CREATE INDEX IF NOT EXISTS idx_artwork_likes_user_ip ON artwork_likes(user_ip);
CREATE INDEX IF NOT EXISTS idx_artworks_category ON artworks(category);

-- Insert default artworks (only if table is empty)
INSERT INTO artworks (title, image_path, category, created_date, base_likes) 
SELECT * FROM (VALUES
    ('Kugisaki Nobara', 'assets/images/kugisaki-nobara.jpg', 'Traditional Art • Portraits', '2025-01-01'::DATE, 1200),
    ('Attack on Titan (Eren)', 'assets/images/eren-aot.jpg', 'Traditional Art', '2025-01-01'::DATE, 800),
    ('Solo leveling (Smiling Statue)', 'assets/images/solo-leveling.jpg', 'Traditional Art • Concept', '2025-01-01'::DATE, 950),
    ('Sukuna (Jujutsu Kaisen) - Commissioned', 'assets/images/sukuna.jpeg', 'Traditional Art • Commissioned', '2023-01-01'::DATE, 800),
    ('Random Sketch', 'assets/images/random-sketch-1.jpeg', 'Traditional Art', '2022-01-01'::DATE, 600),
    ('Random Sketch', 'assets/images/random-sketch.webp', 'Traditional Art • Concept', '2025-01-01'::DATE, 1500),
    ('Dandadan', 'assets/images/okarun-momo.jpg', 'Traditional Art', '2025-01-01'::DATE, 700),
    ('Okarun (Dandadan)', 'assets/images/okarun.jpg', 'Traditional Art', '2025-01-01'::DATE, 1500),
    ('Random Sketch', 'assets/images/random.jpg', 'Traditional Art • Concept', '2022-01-01'::DATE, 600),
    ('Kaguya (Kaguya-sama: Love is War)', 'assets/images/kaguya.jpg', 'Traditional Art', '2022-01-01'::DATE, 600)
) AS v(title, image_path, category, created_date, base_likes)
WHERE NOT EXISTS (SELECT 1 FROM artworks LIMIT 1);

-- Enable Row Level Security (RLS)
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to artworks
CREATE POLICY "Allow public read access to artworks" ON artworks
    FOR SELECT USING (true);

-- Create policies for public insert/delete on artwork_likes
CREATE POLICY "Allow public insert on artwork_likes" ON artwork_likes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete on artwork_likes" ON artwork_likes
    FOR DELETE USING (true);

CREATE POLICY "Allow public read access to artwork_likes" ON artwork_likes
    FOR SELECT USING (true);

-- Grant necessary permissions
GRANT USAGE ON SEQUENCE artworks_id_seq TO anon;
GRANT USAGE ON SEQUENCE artwork_likes_id_seq TO anon;
GRANT SELECT, INSERT, DELETE ON artworks TO anon;
GRANT SELECT, INSERT, DELETE ON artwork_likes TO anon;

-- Show tables and sample data
SELECT 'artworks' as table_name, COUNT(*) as row_count FROM artworks
UNION ALL
SELECT 'artwork_likes' as table_name, COUNT(*) as row_count FROM artwork_likes; 