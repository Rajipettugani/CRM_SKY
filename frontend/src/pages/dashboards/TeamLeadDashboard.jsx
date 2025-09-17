// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../../services/api'
// import Card from '../../components/Card'
// import LeadTable from '../../components/LeadTable'


// export default function TeamLeadDashboard() {
//   const qc = useQueryClient();
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState('');
//   const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', source: '' });
//   const [successMsg, setSuccessMsg] = useState('');

//   const leadsQuery = useQuery({
//     queryKey: ['leads', filter],
//     queryFn: async () => {
//       const params = filter ? { status: filter } : {};
//       const { data } = await api.get('/leads', { params });
//       return data;
//     },
//     refetchInterval: 5000 // auto-refresh every 5 seconds
//   });
//   const statusesQuery = useQuery({
//     queryKey: ['statuses'],
//     queryFn: async () => (await api.get('/statuses')).data
//   });
//   const deleteLead = useMutation({
//     mutationFn: async (id) => await api.delete(`/leads/${id}`),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] })
//   });
//   const onOpen = (lead) => navigate(`/leads/${lead._id}`);
//   const handleDelete = (id) => {
//     if(window.confirm('Are you sure you want to delete this lead?')) {
//       deleteLead.mutate(id);
//     }
//   };
//   const statusMutation = useMutation({
//     mutationFn: async (payload) => (await api.post(`/leads/${payload.id}/status`, { statusName: payload.statusName })).data,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['leads'] });
//     }
//   });
//   const handleStatusChange = (id, statusName) => {
//     statusMutation.mutate({ id, statusName });
//   };

//   return (
//     <div className="space-y-4">
//       <Card title="All Leads">
//         {/* Filter + Refresh */}
//         <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
//           <select
//             onChange={e => setFilter(e.target.value)}
//             defaultValue=""
//             style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
//           >
//             <option value="">All Statuses</option>
//             {statusesQuery.data?.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
//           </select>
//           <button
//             style={{
//               padding: '8px 14px',
//               background: '#10b981',
//               color: 'white',
//               border: 'none',
//               borderRadius: 6,
//               cursor: 'pointer'
//             }}
//             onClick={() => qc.invalidateQueries({ queryKey: ['leads'] })}
//           >
//             Refresh
//           </button>
//         </div>

//         {/* Table */}
//         <div
//           style={{
//             background: 'white',
//             borderRadius: 8,
//             padding: 16,
//             boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
//           }}
//         >
//           {leadsQuery.isLoading
//             ? <p>Loading...</p>
//             : <LeadTable leads={leadsQuery.data} onOpen={onOpen} onDelete={handleDelete} statuses={statusesQuery.data} onStatusChange={handleStatusChange} />}
//         </div>
//       </Card>
//     </div>
//   )
// }
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'
import LeadTable from '../../components/LeadTable'


export default function TeamLeadDashboard() {
  const qc = useQueryClient();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', source: '' });
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch team info for Team Members tab
  const teams = useQuery({ queryKey:['teams'], queryFn: async()=> (await api.get('/team')).data });
  // Fetch leads and statuses for Data tab
  const leadsQuery = useQuery({
    queryKey: ['leads', filter],
    queryFn: async () => {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/leads', { params });
      return data;
    },
    refetchInterval: 5000
  });
  const statusesQuery = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => (await api.get('/statuses')).data
  });
  const deleteLead = useMutation({
    mutationFn: async (id) => await api.delete(`/leads/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] })
  });
  const onOpen = (lead) => nav(`/leads/${lead._id}`);
  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead.mutate(id);
    }
  };
  const statusMutation = useMutation({
    mutationFn: async (payload) => (await api.post(`/leads/${payload.id}/status`, { statusName: payload.statusName })).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
    }
  });
  const handleStatusChange = (id, statusName) => {
    statusMutation.mutate({ id, statusName });
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <aside style={{ width: 140, background: '#f8fafc', borderRight: '1px solid #eee', padding: 16, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center', height: '100%' }}>
        {[{tab:'home',label:'Home',color:'#2563eb'},{tab:'team',label:'Team Members',color:'#10b981'},{tab:'data',label:'Data Table',color:'#f59e0b'},{tab:'logout',label:'Logout',color:'#dc2626'}].map(btn => (
          <button
            key={btn.tab}
            onClick={() => btn.tab==='logout'?nav('/login'):setActiveTab(btn.tab)}
            style={{
              fontWeight: activeTab===btn.tab?'bold':'normal',
              color: btn.color,
              background: activeTab===btn.tab?'#e0e7ef':'none',
              border: 'none',
              textAlign: 'left',
              fontSize: 16,
              cursor: 'pointer',
              borderRadius: 8,
              padding: '8px 20px 8px 18px',
              marginBottom: 4,
              transition: 'background 0.2s',
              boxShadow: activeTab===btn.tab?'0 2px 8px rgba(0,0,0,0.04)':'none'
            }}
            onMouseOver={e=>e.currentTarget.style.background='#e0e7ef'}
            onMouseOut={e=>e.currentTarget.style.background=activeTab===btn.tab?'#e0e7ef':'none'}
          >{btn.label}</button>
        ))}
      </aside>
      <main style={{ flex: 1, padding: 0 }}>
        {activeTab === 'home' && (
          <Card title="Team Lead Analytics">
            <div style={{padding:20}}>
              <h2 style={{fontWeight:'bold',fontSize:'1.2rem'}}>Team Lead Dashboard</h2>
              <p>Show charts, stats, and summary here.</p>
            </div>
          </Card>
        )}
        {activeTab === 'team' && (
          <Card title="Team Members">
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
          <Card title="All Leads" style={{marginLeft:0, paddingLeft:0}}>
            {/* Filter + Refresh */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <select
                onChange={e => setFilter(e.target.value)}
                defaultValue=""
                style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc', minWidth: 140, fontSize: 15 }}
              >
                <option value="">All Statuses</option>
                {statusesQuery.data?.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <button
                style={{
                  padding: '10px 18px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(16,185,129,0.08)'
                }}
                onClick={() => qc.invalidateQueries({ queryKey: ['leads'] })}
              >
                Refresh
              </button>
            </div>

            {/* Table */}
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: 18,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  width: '100%',
                  border: '1px solid #eee'
                }}
              >
                {leadsQuery.isLoading
                  ? <p>Loading...</p>
                  : <LeadTable leads={leadsQuery.data} onOpen={onOpen} onDelete={handleDelete} statuses={statusesQuery.data} onStatusChange={handleStatusChange} />}
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
