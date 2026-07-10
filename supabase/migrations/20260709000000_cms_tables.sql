-- Homepage Config
CREATE TABLE homepage_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    edition_id UUID REFERENCES editions(id) ON DELETE CASCADE UNIQUE NOT NULL,
    hero_title TEXT DEFAULT 'The Future of Technology is Here',
    hero_subtitle TEXT DEFAULT 'Join the ultimate technical fest. Experience cutting-edge competitions, workshops, and prove your department''s supremacy.',
    about_text TEXT DEFAULT 'Technologia is the premier technical and cultural festival.',
    contact_email TEXT DEFAULT 'contact@technologia.edu',
    contact_phone TEXT DEFAULT '+1 234 567 8900',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default homepage config for the 2026 edition
INSERT INTO homepage_config (edition_id)
SELECT id FROM editions WHERE year = 2026;

-- Sponsors
CREATE TABLE sponsors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    edition_id UUID REFERENCES editions(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    tier TEXT DEFAULT 'gold', -- e.g. gold, silver, bronze, title
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Committee Members
CREATE TABLE committee_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    edition_id UUID REFERENCES editions(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    image_url TEXT,
    department TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE gallery_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    edition_id UUID REFERENCES editions(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE homepage_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view homepage config for published editions" ON homepage_config FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = homepage_config.edition_id AND status IN ('active', 'archived'))
);

CREATE POLICY "Public can view sponsors for published editions" ON sponsors FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = sponsors.edition_id AND status IN ('active', 'archived'))
);

CREATE POLICY "Public can view committee members for published editions" ON committee_members FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = committee_members.edition_id AND status IN ('active', 'archived'))
);

CREATE POLICY "Public can view gallery images for published editions" ON gallery_images FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = gallery_images.edition_id AND status IN ('active', 'archived'))
);

-- Admin manage policies
CREATE POLICY "Admins can manage homepage config" ON homepage_config FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage sponsors" ON sponsors FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage committee members" ON committee_members FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage gallery images" ON gallery_images FOR ALL USING (public.is_admin());
