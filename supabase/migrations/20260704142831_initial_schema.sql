-- Create Enums
CREATE TYPE user_role AS ENUM ('student', 'volunteer', 'coordinator', 'admin', 'super_admin');
CREATE TYPE department_type AS ENUM ('it', 'cs', 'ds', 'other');
CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE position_type AS ENUM ('first', 'second', 'third', 'participation');

-- Profiles Table (Extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    roll_number TEXT UNIQUE,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    department department_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fest Settings
CREATE TABLE fest_settings (
    id SERIAL PRIMARY KEY,
    current_day INTEGER DEFAULT 1,
    results_revealed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO fest_settings (current_day, results_revealed) VALUES (1, false);

-- Events Table
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL, -- e.g., 'technical', 'online'
    is_team_event BOOLEAN DEFAULT FALSE,
    max_team_size INTEGER DEFAULT 1,
    registration_limit INTEGER,
    is_registration_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams Table (For team events)
CREATE TABLE teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registrations Table
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    status registration_status DEFAULT 'pending'::registration_status,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

-- Attendance Table
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    scanned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

-- Results Table
CREATE TABLE results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    position position_type NOT NULL,
    points_awarded INTEGER NOT NULL,
    verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Certificates Table
CREATE TABLE certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    certificate_type TEXT NOT NULL, -- 'winner', 'participation', 'coordinator'
    qr_hash TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Functions and Triggers

-- Function to automatically calculate points based on position
CREATE OR REPLACE FUNCTION calculate_points()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.position = 'first' THEN
        NEW.points_awarded := 100;
    ELSIF NEW.position = 'second' THEN
        NEW.points_awarded := 50;
    ELSIF NEW.position = 'third' THEN
        NEW.points_awarded := 20;
    ELSIF NEW.position = 'participation' THEN
        NEW.points_awarded := 10;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calculate_points
BEFORE INSERT OR UPDATE ON results
FOR EACH ROW
EXECUTE FUNCTION calculate_points();

-- Function to log result changes in audit_logs
CREATE OR REPLACE FUNCTION log_result_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (user_id, action, entity, entity_id, details)
    VALUES (
        NEW.verified_by,
        TG_OP,
        'results',
        NEW.id,
        jsonb_build_object('event_id', NEW.event_id, 'user_id', NEW.user_id, 'position', NEW.position, 'locked', NEW.is_locked)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_results
AFTER INSERT OR UPDATE ON results
FOR EACH ROW
EXECUTE FUNCTION log_result_changes();

-- RLS Policies (Row Level Security)

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fest_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read of active events
CREATE POLICY "Public can view active events" ON events FOR SELECT USING (true);

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Admins can do everything
CREATE POLICY "Admins bypass RLS" ON profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Note: We will expand RLS policies further based on application needs.
