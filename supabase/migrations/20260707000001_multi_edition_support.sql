-- New Types
CREATE TYPE edition_status AS ENUM ('draft', 'active', 'archived');

-- Editions Table
CREATE TABLE editions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    theme_data JSONB DEFAULT '{}'::jsonb,
    status edition_status DEFAULT 'draft'::edition_status,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert an initial 'active' edition so existing data has a home
INSERT INTO editions (year, name, status) VALUES (2026, 'Technologia 2026', 'active');

-- Get the ID of the edition we just created to link existing data
DO $$ 
DECLARE 
    default_edition_id UUID;
BEGIN
    SELECT id INTO default_edition_id FROM editions WHERE year = 2026 LIMIT 1;

    -- Add edition_id to Events
    ALTER TABLE events ADD COLUMN edition_id UUID REFERENCES editions(id) ON DELETE CASCADE;
    UPDATE events SET edition_id = default_edition_id WHERE edition_id IS NULL;
    ALTER TABLE events ALTER COLUMN edition_id SET NOT NULL;

    -- Add edition_id to Announcements
    ALTER TABLE announcements ADD COLUMN edition_id UUID REFERENCES editions(id) ON DELETE CASCADE;
    UPDATE announcements SET edition_id = default_edition_id WHERE edition_id IS NULL;
    ALTER TABLE announcements ALTER COLUMN edition_id SET NOT NULL;

    -- Add edition_id to Achievements
    ALTER TABLE achievements ADD COLUMN edition_id UUID REFERENCES editions(id) ON DELETE CASCADE;
    UPDATE achievements SET edition_id = default_edition_id WHERE edition_id IS NULL;
    ALTER TABLE achievements ALTER COLUMN edition_id SET NOT NULL;
END $$;

-- Create Edition Settings to replace Fest Settings
CREATE TABLE edition_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    edition_id UUID REFERENCES editions(id) ON DELETE CASCADE UNIQUE NOT NULL,
    current_day INTEGER DEFAULT 1,
    results_revealed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings for the 2026 edition
INSERT INTO edition_settings (edition_id, current_day, results_revealed)
SELECT id, 1, false FROM editions WHERE year = 2026;

-- We can drop fest_settings now since edition_settings replaces it
DROP TABLE fest_settings;

-- Update RLS Policies for new tables

ALTER TABLE editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edition_settings ENABLE ROW LEVEL SECURITY;

-- Editions: Public can view active and archived editions. Only admins can view drafts or manage them.
CREATE POLICY "Public can view non-draft editions" ON editions FOR SELECT USING (status IN ('active', 'archived'));
CREATE POLICY "Admins can manage editions" ON editions FOR ALL USING (public.is_admin());

-- Edition Settings: Public can view active/archived settings. Admins can manage.
CREATE POLICY "Public can view edition settings" ON edition_settings FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = edition_settings.edition_id AND status IN ('active', 'archived'))
);
CREATE POLICY "Admins can manage edition settings" ON edition_settings FOR ALL USING (public.is_admin());

-- Modify Events public policy to only show events for active/archived editions
DROP POLICY IF EXISTS "Public can view active events" ON events;
CREATE POLICY "Public can view events for published editions" ON events FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = events.edition_id AND status IN ('active', 'archived'))
);
CREATE POLICY "Admins can manage events" ON events FOR ALL USING (public.is_admin());

-- Announcements public policy update
DROP POLICY IF EXISTS "Public can view announcements" ON announcements;
CREATE POLICY "Public can view announcements for published editions" ON announcements FOR SELECT USING (
    EXISTS (SELECT 1 FROM editions WHERE id = announcements.edition_id AND status IN ('active', 'archived'))
);

