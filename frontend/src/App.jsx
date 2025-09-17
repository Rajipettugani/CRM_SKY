import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import AllLogin from './pages/AllLogin.jsx'
import HomeRouter from './pages/HomeRouter.jsx'
import LeadDetailPage from './pages/LeadDetailPage.jsx'

export default function App(){
  return (
    <Routes>
      <Route path="/login/select" element={<AllLogin/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/leads/:id" element={<Protected><LeadDetailPage/></Protected>} />
      <Route path="/*" element={<Protected><HomeRouter/></Protected>} />
    </Routes>
  )
}

function Protected({ children }){
  const token = localStorage.getItem('token')
  if(!token) return <Navigate to="/login/select" replace />
  return children
}
