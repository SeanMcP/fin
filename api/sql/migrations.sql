-- ALTER TABLE classes
-- RENAME TO sections;

ALTER TABLE seats
RENAME COLUMN class_id TO section_id;