<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import Card from "../../components/Card";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get("/auth/users")).data,
  });
  const leads = useQuery({
    queryKey: ["leads"],
    queryFn: async () => (await api.get("/leads")).data,
  });
  const teams = useQuery({
    queryKey: ["teams"],
    queryFn: async () => (await api.get("/team")).data,
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Users">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.data?.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.roleName}</td>
                </tr>
              ))}
            </tbody>
=======

import { useQuery } from '@tanstack/react-query'
import api from '../../services/api'
import Card from '../../components/Card'
import StatusBadge from '../../components/StatusBadge'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  const users = useQuery({ queryKey:['users'], queryFn: async()=> (await api.get('/auth/users')).data })
  const leads = useQuery({ queryKey:['leads'], queryFn: async()=> (await api.get('/leads')).data })
  const teams = useQuery({ queryKey:['teams'], queryFn: async()=> (await api.get('/team')).data })

  return (
    <div>
      {/* Top Navbar */}
      <nav style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: '1px solid #eee', marginBottom: 24 }}>
        <Link to="/rep" style={{ fontWeight: 'bold', color: '#2563eb' }}>Sales Rep Dashboard</Link>
        <Link to="/manager" style={{ fontWeight: 'bold', color: '#10b981' }}>Manager Dashboard</Link>
        <Link to="/teamlead" style={{ fontWeight: 'bold', color: '#f59e0b' }}>Team Lead Dashboard</Link>
      </nav>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Users">
          <table className="w-full text-sm">
            <thead><tr className="text-left"><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>{users.data?.map(u => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.roleName}</td></tr>)}</tbody>
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
          </table>
        </Card>
        <Card title="Teams">
          <ul className="text-sm space-y-1">
<<<<<<< HEAD
            {teams.data?.map((t) => (
              <li key={t._id}>
                {t.name} — Lead: {t.lead?.name || "-"} · Members:{" "}
                {t.members?.length || 0}
              </li>
            ))}
=======
            {teams.data?.map(t => <li key={t._id}>{t.name} — Lead: {t.lead?.name||'-'} · Members: {t.members?.length||0}</li>)}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
          </ul>
        </Card>
        <Card title="All Leads">
          <table className="w-full text-sm">
<<<<<<< HEAD
            <thead>
              <tr className="text-left">
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.data?.map((l) => (
                <tr key={l._id}>
                  <td>
                    <Link className="text-blue-600" to={`/leads/${l._id}`}>
                      {l.name}
                    </Link>
                  </td>
                  <td>{l.phone}</td>
                  <td>
                    <StatusBadge name={l.status?.name} />
                  </td>
=======
            <thead><tr className="text-left"><th>Name</th><th>Phone</th><th>Status</th></tr></thead>
            <tbody>
              {leads.data?.map(l => (
                <tr key={l._id}>
                  <td><Link className="text-blue-600" to={`/leads/${l._id}`}>{l.name}</Link></td>
                  <td>{l.phone}</td>
                  <td><StatusBadge name={l.status?.name}/></td>
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
}
