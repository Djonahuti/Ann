import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { SupabaseProvider } from '@/contexts/SupabaseContext'
import PublicLayout from '@/layouts/PublicLayout'
import AdminLayout from '@/layouts/AdminLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import ContactPage from '@/pages/ContactPage'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminPages from '@/pages/admin/Pages'
import AdminLogin from '@/pages/admin/Login'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Toaster } from 'sonner'
import PageEdit from './pages/admin/PageEdit'

function App() {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
              <Route path="/admin/pages/new" element={<ProtectedRoute><PageEdit /></ProtectedRoute>} />
              <Route path="/admin/pages/edit/:id" element={<ProtectedRoute><PageEdit /></ProtectedRoute>} />              
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </SupabaseProvider>
  )
}

export default App 