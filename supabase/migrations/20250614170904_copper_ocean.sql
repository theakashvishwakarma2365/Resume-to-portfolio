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

-- Add additional columns for enhanced portfolio data
DO $$
BEGIN
  -- Add testimonials column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolios' AND column_name = 'testimonials'
  ) THEN
    ALTER TABLE portfolios ADD COLUMN testimonials jsonb DEFAULT '[]';
  END IF;

  -- Add contact_form_submissions column for storing contact form data
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolios' AND column_name = 'contact_form_submissions'
  ) THEN
    ALTER TABLE portfolios ADD COLUMN contact_form_submissions jsonb DEFAULT '[]';
  END IF;

  -- Add portfolio_settings column for storing additional settings
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'portfolios' AND column_name = 'portfolio_settings'
  ) THEN
    ALTER TABLE portfolios ADD COLUMN portfolio_settings jsonb DEFAULT '{}';
  END IF;
END $$;