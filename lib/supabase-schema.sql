-- HomeGuard Pro Database Schema
-- Run this in your Supabase SQL Editor

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Home Profiles
CREATE TABLE IF NOT EXISTS home_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  address TEXT,
  sq_ft TEXT,
  year_built TEXT,
  systems JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own home profile" ON home_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own home profile" ON home_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own home profile" ON home_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own home profile" ON home_profiles FOR DELETE USING (auth.uid() = user_id);

-- Maintenance Tasks
CREATE TABLE IF NOT EXISTS maintenance_tasks (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  system TEXT,
  task TEXT,
  frequency TEXT,
  urgency TEXT,
  season TEXT,
  due_date TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE maintenance_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tasks" ON maintenance_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON maintenance_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON maintenance_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON maintenance_tasks FOR DELETE USING (auth.uid() = user_id);

-- Warranties
CREATE TABLE IF NOT EXISTS warranties (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  item_name TEXT,
  purchase_date TEXT,
  warranty_months INTEGER,
  expiry_date TEXT,
  warranty_years TEXT,
  provider TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE warranties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own warranties" ON warranties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own warranties" ON warranties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own warranties" ON warranties FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own warranties" ON warranties FOR DELETE USING (auth.uid() = user_id);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT,
  description TEXT,
  amount TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own expenses" ON expenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own expenses" ON expenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own expenses" ON expenses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own expenses" ON expenses FOR DELETE USING (auth.uid() = user_id);

-- Saved Contractors
CREATE TABLE IF NOT EXISTS saved_contractors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  contractor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, contractor_id)
);

ALTER TABLE saved_contractors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own saved contractors" ON saved_contractors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved contractors" ON saved_contractors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved contractors" ON saved_contractors FOR DELETE USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
