<<<<<<< HEAD
import { getUserFromToken, clearToken } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();
  const user = getUserFromToken();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/admin", label: "Admin" },
    { href: "/manager", label: "Manager" },
    { href: "/teamlead", label: "Team Lead" },
    { href: "/rep", label: "Sales Rep" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-40 bg-blue-600 text-white p-2 rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-800 shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out z-30
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          {/* Brand */}
          <div className="px-20 py-5 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight text-blue-700">
              SkyCRM
            </h1>
            {/* Toggle only for mobile */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-10">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 rounded-md text-base font-medium transition-colors
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* User + Logout (stick to bottom) */}
          <div className="px-6 py-4 border-t border-gray-200 text-sm mt-auto">
            <p className="mb-3 text-gray-600">
              {user?.name} ·{" "}
              <span className="font-medium">{user?.roleName}</span>
            </p>
            <button
              onClick={() => {
                clearToken();
                nav("/login");
                setOpen(false);
              }}
              className="w-full px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
=======
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
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
}
