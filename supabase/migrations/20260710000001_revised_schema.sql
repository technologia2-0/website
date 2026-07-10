-- Phase 1.5: Revised Schema for Homepage Content & History

-- 1. Drop fest_editions (Since we are pivoting away from Edition Management)
DROP TABLE IF EXISTS fest_editions CASCADE;

-- 2. Create Homepage Content (Module 1)
-- This table should only ever have ONE row.
CREATE TABLE homepage_content (
    id SERIAL PRIMARY KEY, -- Enforce single row by hardcoding ID=1
    hero_title TEXT DEFAULT 'THE FUTURE OF INNOVATION',
    hero_subtitle TEXT DEFAULT 'Technologia Edition',
    hero_description TEXT DEFAULT 'Join the ultimate technical fest. Experience cutting-edge competitions, hands-on workshops, and prove your department''s supremacy.',
    countdown_date TIMESTAMPTZ DEFAULT (NOW() + interval '30 days'),
    about_title TEXT DEFAULT 'About Technologia',
    about_description TEXT DEFAULT 'Technologia is the premier annual technical festival...',
    vision_text TEXT DEFAULT 'To foster a culture of technical excellence and innovation among students.',
    mission_text TEXT DEFAULT 'To provide a platform for students to showcase their skills, learn from experts, and collaborate on real-world problems.',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES profiles(id)
);

-- Ensure only one row exists
ALTER TABLE homepage_content ADD CONSTRAINT single_row_check CHECK (id = 1);

-- Insert the default row
INSERT INTO homepage_content (id) VALUES (1) ON CONFLICT (id) DO NOTHING;


-- 3. Create Technologia History (Module 3)
CREATE TABLE technologia_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    theme TEXT,
    short_description TEXT,
    highlights JSONB, -- Array of strings/objects
    chief_guests JSONB, -- Array of strings/objects
    participants_count INTEGER DEFAULT 0,
    events_count INTEGER DEFAULT 0,
    winning_department TEXT,
    best_student TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 4. Expand Events Table (Module 2 specific fields requested)
ALTER TABLE events
ADD COLUMN IF NOT EXISTS event_logo_url TEXT,
ADD COLUMN IF NOT EXISTS building TEXT,
ADD COLUMN IF NOT EXISTS room_number TEXT,
ADD COLUMN IF NOT EXISTS prize_details JSONB, -- e.g. {"first": "1000", "second": "500"}
ADD COLUMN IF NOT EXISTS certificate_eligibility TEXT DEFAULT 'participants_and_winners',
ADD COLUMN IF NOT EXISTS faqs JSONB; -- Array of {question, answer}


-- 5. RLS Policies
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologia_history ENABLE ROW LEVEL SECURITY;

-- Public can read homepage content and history
CREATE POLICY "Public read homepage_content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Public read technologia_history" ON technologia_history FOR SELECT USING (true);

-- Admins can manage them
CREATE POLICY "Admins manage homepage_content" ON homepage_content FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage technologia_history" ON technologia_history FOR ALL USING (public.is_admin());
