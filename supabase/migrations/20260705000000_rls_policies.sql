-- Expand RLS Policies for full application security

-- Secure function to check roles efficiently
CREATE OR REPLACE FUNCTION public.has_role(allowed_roles public.user_role[])
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = ANY(allowed_roles)
  );
END;
$$;

-- EVENTS Policies
CREATE POLICY "Organizers can insert events" ON events FOR INSERT WITH CHECK (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator']::public.user_role[])
);

CREATE POLICY "Organizers can update events" ON events FOR UPDATE USING (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator']::public.user_role[])
);

CREATE POLICY "Organizers can delete events" ON events FOR DELETE USING (
    public.has_role(ARRAY['admin', 'super_admin']::public.user_role[])
);

-- REGISTRATIONS Policies
CREATE POLICY "Users can view own registrations" ON registrations FOR SELECT USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can create own registrations" ON registrations FOR INSERT WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Organizers can view all registrations" ON registrations FOR SELECT USING (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator', 'volunteer']::public.user_role[])
);

CREATE POLICY "Organizers can update registrations" ON registrations FOR UPDATE USING (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator']::public.user_role[])
);

-- TEAMS Policies
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view teams" ON teams FOR SELECT USING (true);

CREATE POLICY "Users can create teams" ON teams FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
);

-- ATTENDANCE Policies
CREATE POLICY "Users can view own attendance" ON attendance FOR SELECT USING (
    auth.uid() = user_id
);

CREATE POLICY "Volunteers and Organizers can view attendance" ON attendance FOR SELECT USING (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator', 'volunteer']::public.user_role[])
);

CREATE POLICY "Volunteers and Organizers can mark attendance" ON attendance FOR INSERT WITH CHECK (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator', 'volunteer']::public.user_role[])
);

-- RESULTS Policies
CREATE POLICY "Public can view verified results" ON results FOR SELECT USING (
    is_locked = true
);

CREATE POLICY "Users can view own results" ON results FOR SELECT USING (
    auth.uid() = user_id
);

CREATE POLICY "Organizers can manage results" ON results FOR ALL USING (
    public.has_role(ARRAY['admin', 'super_admin', 'coordinator']::public.user_role[])
);

-- CERTIFICATES Policies
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (
    auth.uid() = user_id
);

CREATE POLICY "Public can verify certificates" ON certificates FOR SELECT USING (
    true
);

CREATE POLICY "Admins can issue certificates" ON certificates FOR INSERT WITH CHECK (
    public.has_role(ARRAY['admin', 'super_admin']::public.user_role[])
);

-- FEST SETTINGS Policies
CREATE POLICY "Public can view fest settings" ON fest_settings FOR SELECT USING (true);

CREATE POLICY "Admins can update fest settings" ON fest_settings FOR UPDATE USING (
    public.has_role(ARRAY['admin', 'super_admin']::public.user_role[])
);
