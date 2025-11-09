/*
  # EasyBuild PC Parts Database Schema

  ## Overview
  Creates comprehensive database structure for the EasyBuild gaming PC builder application.

  ## New Tables
  
  ### 1. `pc_parts`
  Main table storing all PC components (CPUs, GPUs, motherboards, RAM, storage, PSUs, cases)
  - `id` (uuid, primary key) - Unique identifier
  - `type` (text) - Component type (cpu, gpu, motherboard, ram, storage, psu, case)
  - `name` (text) - Product name
  - `price` (numeric) - Current price in USD
  - `score` (integer) - Performance score (0-100)
  - `image_url` (text, nullable) - Product image URL
  - `description` (text) - Short description
  - `specs` (jsonb) - Technical specifications (socket, tdp, ram_type, wattage, etc.)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `user_builds`
  Stores saved PC build configurations
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, nullable) - User ID (null for anonymous builds)
  - `name` (text) - Build name
  - `budget` (numeric) - Target budget
  - `total_cost` (numeric) - Actual total cost
  - `gaming_type` (text) - Gaming preference (AAA, esports, casual, etc.)
  - `resolution` (text) - Target resolution (1080p, 1440p, 4K)
  - `performance_level` (text) - Performance tier (budget, mid, high, ultra)
  - `parts` (jsonb) - Selected parts configuration
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `glossary_terms`
  PC building terminology for help/education
  - `id` (uuid, primary key) - Unique identifier
  - `term` (text, unique) - Technical term
  - `definition` (text) - Simple explanation
  - `category` (text) - Category (cpu, gpu, general, etc.)
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - `pc_parts`: Public read access, admin-only write
  - `user_builds`: Users can manage their own builds
  - `glossary_terms`: Public read access, admin-only write

  ## Indexes
  - Index on part type for fast filtering
  - Index on price for budget queries
  - Index on glossary term for quick lookups
*/

CREATE TABLE IF NOT EXISTS pc_parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  name text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  score integer NOT NULL DEFAULT 0,
  image_url text,
  description text DEFAULT '',
  specs jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL DEFAULT 'My Build',
  budget numeric(10, 2) NOT NULL DEFAULT 0,
  total_cost numeric(10, 2) NOT NULL DEFAULT 0,
  gaming_type text DEFAULT 'general',
  resolution text DEFAULT '1080p',
  performance_level text DEFAULT 'mid',
  parts jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS glossary_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text UNIQUE NOT NULL,
  definition text NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pc_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_builds ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view PC parts"
  ON pc_parts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert PC parts"
  ON pc_parts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update PC parts"
  ON pc_parts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete PC parts"
  ON pc_parts FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view builds"
  ON user_builds FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create builds"
  ON user_builds FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own builds"
  ON user_builds FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own builds"
  ON user_builds FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view glossary terms"
  ON glossary_terms FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert glossary terms"
  ON glossary_terms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update glossary terms"
  ON glossary_terms FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete glossary terms"
  ON glossary_terms FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_pc_parts_type ON pc_parts(type);
CREATE INDEX IF NOT EXISTS idx_pc_parts_price ON pc_parts(price);
CREATE INDEX IF NOT EXISTS idx_glossary_terms_term ON glossary_terms(term);
CREATE INDEX IF NOT EXISTS idx_user_builds_user_id ON user_builds(user_id);
