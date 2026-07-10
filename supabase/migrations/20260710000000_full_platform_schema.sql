-- Phase 1: Expanding the Schema for the 15 Modules

-- 1. Fest Editions
CREATE TABLE fest_editions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    edition_number INTEGER NOT NULL,
    theme TEXT,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status TEXT DEFAULT 'archived' CHECK (status IN ('active', 'archived', 'planning')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure only one active edition exists
CREATE UNIQUE INDEX one_active_edition_idx ON fest_editions (status) WHERE status = 'active';


-- 2. Expand Events Table (Module 2)
ALTER TABLE events
ADD COLUMN banner_url TEXT,
ADD COLUMN rules TEXT,
ADD COLUMN eligibility TEXT,
ADD COLUMN venue TEXT,
ADD COLUMN date DATE,
ADD COLUMN time TIME,
ADD COLUMN registration_deadline TIMESTAMPTZ,
ADD COLUMN coordinator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
ADD COLUMN faculty_coordinator TEXT,
ADD COLUMN resources JSONB,
ADD COLUMN result_status TEXT DEFAULT 'pending' CHECK (result_status IN ('pending', 'published', 'revoked')),
ADD COLUMN publication_status TEXT DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived'));


-- 3. Announcements (Module 3)
CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'info' CHECK (priority IN ('info', 'urgent', 'warning')),
    target_audience TEXT DEFAULT 'all', -- 'all', 'department:it', 'event:uuid'
    expiry_date TIMESTAMPTZ,
    is_pinned BOOLEAN DEFAULT FALSE,
    attachments JSONB,
    publication_status TEXT DEFAULT 'draft' CHECK (publication_status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 4. Committee Members (Module 4)
CREATE TABLE committee_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    department TEXT NOT NULL,
    image_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    priority INTEGER DEFAULT 0, -- For sorting
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 5. Gallery (Module 5)
CREATE TABLE gallery_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gallery_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES gallery_categories(id) ON DELETE SET NULL,
    url TEXT NOT NULL,
    type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video')),
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 6. Sponsors (Module 6)
CREATE TABLE sponsors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    description TEXT,
    category TEXT DEFAULT 'silver' CHECK (category IN ('title', 'gold', 'silver', 'bronze', 'partner')),
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 12. Notifications (Module 12)
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- NULL means global
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'urgent', 'success')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 13. PR Point Rules (Module 13)
CREATE TABLE pr_point_rules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL, -- e.g., 'technical', 'cultural', 'sports'
    position position_type NOT NULL,
    points INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_type, position)
);


-- 15. Platform Settings (Module 15)
CREATE TABLE platform_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_email TEXT,
    contact_phone TEXT,
    address TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    logo_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert a single default row for platform settings
INSERT INTO platform_settings (contact_email, contact_phone, address) 
VALUES ('contact@technologia.com', '+1234567890', 'Main Campus');


-- Setup Storage Buckets for Uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
('gallery', 'gallery', true),
('sponsors', 'sponsors', true),
('committee', 'committee', true),
('events', 'events', true),
('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for Storage Buckets (Public Read, Admin Write)
-- Allow public to read all files in these buckets
CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING ( bucket_id IN ('gallery', 'sponsors', 'committee', 'events', 'certificates') );

-- Admin Write Access policies will be handled by the backend / super_admin role checks.


-- Enable RLS on new tables
ALTER TABLE fest_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_point_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can see announcements, committee, gallery, sponsors, active editions, settings)
CREATE POLICY "Public read active editions" ON fest_editions FOR SELECT USING (true);
CREATE POLICY "Public read published announcements" ON announcements FOR SELECT USING (publication_status = 'published');
CREATE POLICY "Public read committee" ON committee_members FOR SELECT USING (true);
CREATE POLICY "Public read gallery categories" ON gallery_categories FOR SELECT USING (true);
CREATE POLICY "Public read gallery items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read sponsors" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Public read PR point rules" ON pr_point_rules FOR SELECT USING (true);
CREATE POLICY "Public read platform settings" ON platform_settings FOR SELECT USING (true);

-- Authenticated Users can read their own notifications
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Admins bypass RLS for all new tables
CREATE POLICY "Admins bypass RLS fest_editions" ON fest_editions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS announcements" ON announcements FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS committee_members" ON committee_members FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS gallery_categories" ON gallery_categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS gallery_items" ON gallery_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS sponsors" ON sponsors FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS notifications" ON notifications FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS pr_point_rules" ON pr_point_rules FOR ALL USING (public.is_admin());
CREATE POLICY "Admins bypass RLS platform_settings" ON platform_settings FOR ALL USING (public.is_admin());
