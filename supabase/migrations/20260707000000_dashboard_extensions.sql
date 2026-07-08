-- New Types
CREATE TYPE announcement_type AS ENUM ('info', 'urgent', 'success', 'event');

-- Announcements Table
CREATE TABLE announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type announcement_type DEFAULT 'info'::announcement_type,
    target_role user_role, -- If null, visible to all
    target_department department_type, -- If null, visible to all
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Treasure Hunt Clues
CREATE TABLE th_clues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    level INTEGER NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    hint TEXT,
    answer_hash TEXT NOT NULL,
    points INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Treasure Hunt Progress
CREATE TABLE th_progress (
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    current_level INTEGER DEFAULT 1,
    points_earned INTEGER DEFAULT 0,
    last_solved_at TIMESTAMPTZ DEFAULT NOW(),
    completed BOOLEAN DEFAULT FALSE
);

-- Achievements
CREATE TABLE achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    points_bonus INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Achievements (Mapping)
CREATE TABLE user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- RLS Policies

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE th_clues ENABLE ROW LEVEL SECURITY;
ALTER TABLE th_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Announcements: Everyone can read
CREATE POLICY "Public can view announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (public.is_admin());

-- Treasure Hunt Clues: Users can only see clues up to their current level
CREATE POLICY "Users can view clues for their level" ON th_clues FOR SELECT USING (
    level <= (SELECT current_level FROM th_progress WHERE user_id = auth.uid()) OR (SELECT current_level FROM th_progress WHERE user_id = auth.uid()) IS NULL
);

-- Treasure Hunt Progress: Users can only view/update their own
CREATE POLICY "Users manage own TH progress" ON th_progress FOR ALL USING (auth.uid() = user_id);

-- Achievements: Public can view, only admins can manage
CREATE POLICY "Public can view achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public can view user achievements" ON user_achievements FOR SELECT USING (true);
CREATE POLICY "System manages user achievements" ON user_achievements FOR ALL USING (auth.uid() = user_id);
