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
import ProtectedRoute from '@/components/ProtectedRoute'
import { Toaster } from 'sonner'
import PageEdit from './pages/admin/PageEdit'
import DriverRegister from './pages/driver/DriverRegister'
import DriverProfile from './pages/driver/DriverProfile'
import UserProfile from './pages/coordinator/CoProfile'
import PaymentForm from './pages/coordinator/PaymentForm'
import LoginPage from './pages/Login'
import AddBusPage from './pages/admin/AddBuses'
import ViewPayments from './pages/admin/ViewPayments'
import PaymentHistory from './pages/coordinator/PaymentHistory'
import AdminDrivers from './pages/admin/AdminDrivers'

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
              <Route path="payment/:busId" element={<PaymentForm />} />
              <Route path="payment/:busId/history" element={<PaymentHistory />} />
              <Route path="user" element={<UserProfile />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<DriverRegister />} />
              <Route path="profile" element={<DriverProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/add-bus" element={<ProtectedRoute><AddBusPage /></ProtectedRoute>} />
              <Route path="/admin/drivers" element={<ProtectedRoute><AdminDrivers /></ProtectedRoute>} />
              <Route path="/admin/payments" element={<ProtectedRoute><ViewPayments /></ProtectedRoute>} />
              <Route path="pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
              <Route path="/admin/pages/new" element={<ProtectedRoute><PageEdit /></ProtectedRoute>} />
              <Route path="/admin/pages/edit/:id" element={<ProtectedRoute><PageEdit /></ProtectedRoute>} />              
            </Route>
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </SupabaseProvider>
  )
}

export default App 