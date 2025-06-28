/*
  # Add services column to existing portfolios table

  1. Changes
    - Add `services` column to existing `portfolios` table
    - Update default template to 'tech'

  2. Security
    - No changes needed - existing RLS policies will cover the new column
*/

-- Add services column to existing portfolios table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolios' AND column_name = 'services'
  ) THEN
    ALTER TABLE portfolios ADD COLUMN services jsonb DEFAULT '[]';
  END IF;
END $$;

-- Update default template if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolios' AND column_name = 'selected_template'
  ) THEN
    ALTER TABLE portfolios ALTER COLUMN selected_template SET DEFAULT 'tech';
  END IF;
END $$;