import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
<<<<<<< HEAD
=======
import AllLogin from './pages/AllLogin.jsx'
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
import HomeRouter from './pages/HomeRouter.jsx'
import LeadDetailPage from './pages/LeadDetailPage.jsx'

export default function App(){
  return (
    <Routes>
<<<<<<< HEAD
=======
      <Route path="/login/select" element={<AllLogin/>} />
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/leads/:id" element={<Protected><LeadDetailPage/></Protected>} />
      <Route path="/*" element={<Protected><HomeRouter/></Protected>} />
    </Routes>
  )
}

function Protected({ children }){
  const token = localStorage.getItem('token')
<<<<<<< HEAD
  if(!token) return <Navigate to="/login" replace />
=======
  if(!token) return <Navigate to="/login/select" replace />
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
  return children
}
