import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'
import AddTeamModal from '../../components/AddTeamModal'
import LeadTable from '../../components/LeadTable'

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddTeam, setShowAddTeam] = useState(false);
  const nav = useNavigate();
    // Add missing state and query client
    const qc = useQueryClient();
    const [filter, setFilter] = useState('');
    const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', source: '' });
    const [successMsg, setSuccessMsg] = useState('');

    // Fetch teams, leads, statuses
    const teams = useQuery({ queryKey:['teams'], queryFn: async()=> (await api.get('/team')).data });
    const leadsQuery = useQuery({ queryKey:['leads', filter], queryFn: async()=> (await api.get('/leads', { params: filter ? { status: filter } : {} })).data });
    const statusesQuery = useQuery({ queryKey:['statuses'], queryFn: async()=> (await api.get('/statuses')).data });

    // Lead creation mutation
    const createLead = useMutation({
      mutationFn: async (payload) => (await api.post('/leads', payload)).data,
      onSuccess: () => {
        setSuccessMsg('Lead added!');
        setForm({ name: '', email: '', phone: '', city: '', source: '' });
        qc.invalidateQueries({ queryKey: ['leads'] });
        setTimeout(() => setSuccessMsg(''), 2000);
      }
    });

    // Lead table actions
    const onOpen = (lead) => nav(`/leads/${lead._id}`);
    const handleDelete = (id) => {
      if(window.confirm('Are you sure you want to delete this lead?')) {
        deleteLead.mutate(id);
      }
    };
    const deleteLead = useMutation({
      mutationFn: async (id) => await api.delete(`/leads/${id}`),
      onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] })
    });
    const statusMutation = useMutation({
      mutationFn: async (payload) => (await api.post(`/leads/${payload.id}/status`, { statusName: payload.statusName })).data,
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['leads'] });
      }
    });
    const handleStatusChange = (id, statusName) => {
      statusMutation.mutate({ id, statusName });
    };
    // Handler for when a new team is added
    const handleTeamAdded = () => {
      // Optionally refresh team data here
      setShowAddTeam(false);
    };

  // ...existing code...

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <aside style={{ width: 220, background: '#f8fafc', borderRight: '1px solid #eee', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <button onClick={() => setActiveTab('home')} style={{ fontWeight: activeTab==='home'?'bold':'normal', color: '#2563eb', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Home</button>
        <button onClick={() => setActiveTab('teams')} style={{ fontWeight: activeTab==='teams'?'bold':'normal', color: '#10b981', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Teams</button>
        <button onClick={() => setActiveTab('data')} style={{ fontWeight: activeTab==='data'?'bold':'normal', color: '#f59e0b', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Data Table</button>
        <button onClick={() => { nav('/login'); }} style={{ color: '#dc2626', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, marginTop: 'auto', cursor: 'pointer' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
        {activeTab === 'home' && (
          <Card title="Analytics Overview">
            <div style={{padding:20}}>
              <h2 style={{fontWeight:'bold',fontSize:'1.2rem'}}>Manager Analytics</h2>
              <p>Show charts, stats, and summary here.</p>
            </div>
          </Card>
        )}
        {activeTab === 'teams' && (
          <Card title="My Teams" actions={<button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>setShowAddTeam(true)}>Add Team</button>}>
            <ul className="text-sm space-y-1">
              {teams.data?.map(t => (
                <li key={t._id}>
                  <div><strong>{t.name}</strong> — Lead: {t.lead?.name||'-'} · Members: {t.members?.length||0}</div>
                  <div style={{marginLeft:16, fontSize:13, color:'#555'}}>
                    Members: {t.members?.map(m => m.name).join(', ') || '-'}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}
        {activeTab === 'data' && (
          <Card title="All Leads">
            {/* Filter + Refresh */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <select
                onChange={e => setFilter(e.target.value)}
                defaultValue=""
                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              >
                <option value="">All Statuses</option>
                {statusesQuery.data?.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <button
                style={{
                  padding: '8px 14px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
                onClick={() => qc.invalidateQueries({ queryKey: ['leads'] })}
              >
                Refresh
              </button>
            </div>

            {/* Add Lead Form */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 20,
                background: 'white',
                padding: 16,
                borderRadius: 8,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {successMsg && <div style={{color:'#10b981',fontWeight:'bold',alignSelf:'center'}}>{successMsg}</div>}
              <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
              />
              <input
                placeholder="Source"
                value={form.source}
                onChange={e => setForm(prev => ({ ...prev, source: e.target.value }))}
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
              />

              <button
                style={{
                  padding: '8px 14px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
                onClick={() => createLead.mutate(form)}
              >
                Add Lead
              </button>

              <button
                style={{
                  padding: '8px 14px',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
                onClick={() => alert('Assign Lead feature coming soon!')}
              >
                Assign Lead
              </button>
            </div>

            {/* Table */}
            <div
              style={{
                background: 'white',
                borderRadius: 8,
                padding: 16,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {leadsQuery.isLoading
                ? <p>Loading...</p>
                : <LeadTable leads={leadsQuery.data} onOpen={onOpen} onDelete={handleDelete} statuses={statusesQuery.data} onStatusChange={handleStatusChange} />}
            </div>
          </Card>
        )}
        <AddTeamModal open={showAddTeam} onClose={()=>setShowAddTeam(false)} onTeamAdded={handleTeamAdded} />
      </main>
    </div>
  );
}