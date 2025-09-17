import React from 'react'
import { useNavigate } from 'react-router-dom'

const roles = [
  { key: 'Admin', label: 'Admin' },
  { key: 'Sales Head', label: 'Sales Manager' },
  { key: 'Sales Team Lead', label: 'Team Lead' },
  { key: 'Sales Representative', label: 'Sales Representator' }
]

const AllLogin = () => {
  const navigate = useNavigate()

  const handleSelect = (roleKey) => {
    navigate('/login', { state: { role: roleKey } })
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow w-[360px] space-y-4">
        <h1 className="text-xl font-semibold text-center">Select Role to Continue</h1>
        <div className="grid gap-3">
          {roles.map(r => (
            <button
              key={r.key}
              className="w-full py-2 border rounded-lg hover:bg-gray-100"
              onClick={() => handleSelect(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllLogin
