import { getUserFromToken, clearToken } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function Header(){
  const nav = useNavigate()
  const user = getUserFromToken()
  return (
    <div className="w-full bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-lg">SkyCRM</div>
        <div className="flex items-center gap-6">
          {/* Dashboard Navigation Links */}
          <nav className="flex gap-4">
            <a href="/admin" className="font-semibold text-blue-600 hover:underline">Admin</a>
            <a href="/manager" className="font-semibold text-green-600 hover:underline">Manager</a>
            <a href="/teamlead" className="font-semibold text-yellow-600 hover:underline">Team Lead</a>
            <a href="/rep" className="font-semibold text-purple-600 hover:underline">Sales Rep</a>
          </nav>
          <span className="text-sm text-gray-600">{user?.name} · <span className="font-medium">{user?.roleName}</span></span>
          <button
            onClick={() => { clearToken(); nav('/login'); }}
            className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm"
          >Logout</button>
        </div>
      </div>
    </div>
  )
}
