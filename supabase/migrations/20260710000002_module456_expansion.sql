-- Phase 3.1: Expanding Schema for Committee & Gallery

-- Expand committee_members
ALTER TABLE committee_members
ADD COLUMN IF NOT EXISTS year TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'published' CHECK (visibility IN ('published', 'hidden'));

-- Expand gallery_items
ALTER TABLE gallery_items
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS event_name TEXT,
ADD COLUMN IF NOT EXISTS photographer TEXT,
ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'published' CHECK (visibility IN ('published', 'hidden'));
