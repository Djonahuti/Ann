-- Create the pages table for the website content management
CREATE TABLE public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  text TEXT NOT NULL,
  meta_description TEXT,
  hero_big_black TEXT null,
  hero_big_primary TEXT null,
  hero_text TEXT null,
  hero_primary_button TEXT null,
  hero_secondary_button TEXT null,
  hero_year TEXT null,
  hero_year_span TEXT null,
  hero_100 TEXT null,
  hero_100_span TEXT null,
  hero_24 TEXT null,
  hero_24_span TEXT null,
  body_heading TEXT null,
  body_sub_heading TEXT null,
  body_first_text TEXT null,
  body_second_text TEXT null,
  body_heading2 TEXT null,
  body_sub_heading2 TEXT null,
  body_heading3 TEXT null,
  body_sub_heading3 TEXT null,
  body_heading4 TEXT null,
  body_sub_heading4 TEXT null,
  box_text TEXT null,
  box_head TEXT null,
  box_text2 TEXT null,
  box_head2 TEXT null,
  box_text3 TEXT null,
  box_head3 TEXT null,
  box_text4 TEXT null,
  box_head4 TEXT null,
  box_text5 TEXT null,
  box_head5 TEXT null,
  box_text6 TEXT null,
  box_head6 TEXT null,
  box_text7 TEXT null,
  box_head7 TEXT null,
  box_text8 TEXT null,
  box_head8 TEXT null,
  box_text9 TEXT null,
  box_head9 TEXT null,
  team_img TEXT null,
  team_text TEXT null,
  team_role TEXT null,
  team_img2 TEXT null,
  team_text2 TEXT null,
  team_role2 TEXT null,
  team_img3 TEXT null,
  team_text3 TEXT null,
  team_role3 TEXT null,
  section_head TEXT null,
  section_text TEXT null,
  section_primary_btn TEXT null,
  section_secondary_btn TEXT null,
  hp text[] null,
  fm text[] null,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the users table for admin authentication
CREATE TABLE public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for the pages table
INSERT INTO public.pages (title, slug, content, meta_description, is_published) VALUES
('Home', 'home', '<h1>Welcome to Annhurst Transport Service Limited</h1><p>Your trusted partner for bus higher purchase solutions.</p>', 'Leading provider of bus financing and fleet management services', true),
('About Us', 'about', '<h1>About Annhurst Transport Service Limited</h1><p>We specialize in providing buses for higher purchase with flexible financing options.</p>', 'Learn about our company mission and values', true),
('Services', 'services', '<h1>Our Services</h1><p>Higher Purchase Solutions and Fleet Management Services</p>', 'Comprehensive bus financing and management services', true),
('Contact', 'contact', '<h1>Contact Us</h1><p>Get in touch for your bus financing needs.</p>', 'Contact information and inquiry form', true);

-- Insert a sample admin user (you can change the email and password)
INSERT INTO public.users (email, role) VALUES
('admin@annhurst.com', 'admin');

-- Create an index on the slug for faster page lookups
CREATE INDEX idx_pages_slug ON public.pages(slug);

-- Create an index on the is_published flag for filtering published pages
CREATE INDEX idx_pages_published ON public.pages(is_published);

-- Enable Row Level Security (RLS)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for the pages table
CREATE POLICY "Public pages are viewable by everyone" ON public.pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can insert pages" ON public.pages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update pages" ON public.pages
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete pages" ON public.pages
  FOR DELETE USING (true);

-- Create policies for the users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);