-- Create the pages table for the website content management
CREATE TABLE public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
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