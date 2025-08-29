# Annhurst Transport Service Limited - Company Website

A modern, responsive company website built with Vite, React, TypeScript, and shadcn/ui, featuring a comprehensive admin panel for content management.

## 🚀 Features

### Public Website
- **Homepage**: Hero section, services overview, company statistics
- **About Page**: Company story, mission, vision, and values
- **Services Page**: Detailed bus financing solutions and process
- **Contact Page**: Contact form, company information, and FAQ
- **Responsive Design**: Mobile-first approach with modern UI

### Admin Panel
- **Dashboard**: Overview statistics and recent activity
- **Page Management**: Create, edit, and manage website content
- **Content Editor**: Rich text editing with HTML support
- **Publishing System**: Draft/publish workflow for content
- **User Authentication**: Secure admin login system

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd annhurst-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up Supabase
1. Create a new Supabase project
2. Go to Settings > API to get your project URL and anon key
3. Create the following tables in your database:

#### Pages Table
```sql
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample pages
INSERT INTO pages (title, slug, content, meta_description, is_published) VALUES
('Home Page', 'home', '<h1>Welcome to Annhurst Global</h1><p>Your trusted partner in bus financing...</p>', 'Annhurst Transport Service Limited provides comprehensive bus financing solutions', true),
('About Us', 'about', '<h1>About Annhurst Global</h1><p>Founded in 2009...</p>', 'Learn about Annhurst Transport Service Limited and our mission', true),
('Services', 'services', '<h1>Our Services</h1><p>Bus financing and fleet management...</p>', 'Explore our bus financing and fleet management services', true),
('Contact', 'contact', '<h1>Contact Us</h1><p>Get in touch with our team...</p>', 'Contact Annhurst Transport Service Limited for bus financing', true);
```

### 5. Run the development server
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

## 🔐 Admin Access

- **URL**: `/admin/login`
- **Demo Credentials**: 
  - Email: `admin@annhurstglobal.com`
  - Password: `password123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── SupabaseContext.tsx
├── hooks/              # Custom React hooks
│   └── use-toast.ts
├── layouts/            # Layout components
│   ├── PublicLayout.tsx
│   └── AdminLayout.tsx
├── lib/                # Utility functions
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ServicesPage.tsx
│   ├── ContactPage.tsx
│   └── admin/          # Admin pages
└── App.tsx             # Main app component
```

## 🎨 Customization

### Colors and Branding
Update the color scheme in `tailwind.config.js` and `src/index.css` to match your brand colors.

### Content
- Edit page content through the admin panel
- Update company information in the components
- Modify contact details and business hours

### Logo
Replace the bus icon with your company logo in the Header and Footer components.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set environment variables in the deployment platform
4. Deploy!

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔒 Security Features

- Protected admin routes
- Secure authentication with Supabase
- Input validation and sanitization
- CSRF protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Email: info@annhurstglobal.com
- Phone: +234 123 456 7890

## 🗺️ Roadmap

- [ ] Blog system
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Email marketing integration
- [ ] Customer portal
- [ ] Payment processing
- [ ] Mobile app

---

Built with ❤️ for Annhurst Transport Service Limited 