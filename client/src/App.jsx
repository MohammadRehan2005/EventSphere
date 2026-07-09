import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EventDetailsPage from './pages/EventDetailsPage'
import MyTicketsPage from './pages/MyTicketsPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminDashboard from './pages/AdminDashboard'
import CreateEventPage from './pages/CreateEventPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App