-- Add date, time, and venue columns to the events table

ALTER TABLE events 
ADD COLUMN date DATE,
ADD COLUMN time TEXT,
ADD COLUMN venue TEXT;
