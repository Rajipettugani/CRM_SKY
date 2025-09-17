<<<<<<< HEAD
=======
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../../services/api'
// import Card from '../../components/Card'
// import AddTeamModal from '../../components/AddTeamModal'
// import LeadTable from '../../components/LeadTable'

// export default function ManagerDashboard() {
//   const [activeTab, setActiveTab] = useState('home');
//   const [showAddTeam, setShowAddTeam] = useState(false);
//   const nav = useNavigate();
//     // Add missing state and query client
//     const qc = useQueryClient();
//     const [filter, setFilter] = useState('');
//     const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', source: '' });
//     const [successMsg, setSuccessMsg] = useState('');

//     // Fetch teams, leads, statuses
//     const teams = useQuery({ queryKey:['teams'], queryFn: async()=> (await api.get('/team')).data });
//     const leadsQuery = useQuery({ queryKey:['leads', filter], queryFn: async()=> (await api.get('/leads', { params: filter ? { status: filter } : {} })).data });
//     const statusesQuery = useQuery({ queryKey:['statuses'], queryFn: async()=> (await api.get('/statuses')).data });

//     // Lead creation mutation
//     const createLead = useMutation({
//       mutationFn: async (payload) => (await api.post('/leads', payload)).data,
//       onSuccess: () => {
//         setSuccessMsg('Lead added!');
//         setForm({ name: '', email: '', phone: '', city: '', source: '' });
//         qc.invalidateQueries({ queryKey: ['leads'] });
//         setTimeout(() => setSuccessMsg(''), 2000);
//       }
//     });

//     // Lead table actions
//     const onOpen = (lead) => nav(`/leads/${lead._id}`);
//     const handleDelete = (id) => {
//       if(window.confirm('Are you sure you want to delete this lead?')) {
//         deleteLead.mutate(id);
//       }
//     };
//     const deleteLead = useMutation({
//       mutationFn: async (id) => await api.delete(`/leads/${id}`),
//       onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] })
//     });
//     const statusMutation = useMutation({
//       mutationFn: async (payload) => (await api.post(`/leads/${payload.id}/status`, { statusName: payload.statusName })).data,
//       onSuccess: () => {
//         qc.invalidateQueries({ queryKey: ['leads'] });
//       }
//     });
//     const handleStatusChange = (id, statusName) => {
//       statusMutation.mutate({ id, statusName });
//     };
//     // Handler for when a new team is added
//     const handleTeamAdded = () => {
//       // Optionally refresh team data here
//       setShowAddTeam(false);
//     };

//   // ...existing code...

//   return (
//     <div style={{ display: 'flex', minHeight: '80vh' }}>
//       <aside style={{ width: 220, background: '#f8fafc', borderRight: '1px solid #eee', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
//         <button onClick={() => setActiveTab('home')} style={{ fontWeight: activeTab==='home'?'bold':'normal', color: '#2563eb', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Home</button>
//         <button onClick={() => setActiveTab('teams')} style={{ fontWeight: activeTab==='teams'?'bold':'normal', color: '#10b981', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Teams</button>
//         <button onClick={() => setActiveTab('data')} style={{ fontWeight: activeTab==='data'?'bold':'normal', color: '#f59e0b', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Data Table</button>
//         <button onClick={() => { nav('/login'); }} style={{ color: '#dc2626', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, marginTop: 'auto', cursor: 'pointer' }}>Logout</button>
//       </aside>
//       <main style={{ flex: 1, padding: 32 }}>
//         {activeTab === 'home' && (
//           <Card title="Analytics Overview">
//             <div style={{padding:20}}>
//               <h2 style={{fontWeight:'bold',fontSize:'1.2rem'}}>Manager Analytics</h2>
//               <p>Show charts, stats, and summary here.</p>
//             </div>
//           </Card>
//         )}
//         {activeTab === 'teams' && (
//           <Card title="My Teams" actions={<button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>setShowAddTeam(true)}>Add Team</button>}>
//             <ul className="text-sm space-y-1">
//               {teams.data?.map(t => (
//                 <li key={t._id}>
//                   <div><strong>{t.name}</strong> — Lead: {t.lead?.name||'-'} · Members: {t.members?.length||0}</div>
//                   <div style={{marginLeft:16, fontSize:13, color:'#555'}}>
//                     Members: {t.members?.map(m => m.name).join(', ') || '-'}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </Card>
//         )}
//         {activeTab === 'data' && (
//           <Card title="All Leads">
//             {/* Filter + Refresh */}
//             <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
//               <select
//                 onChange={e => setFilter(e.target.value)}
//                 defaultValue=""
//                 style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
//               >
//                 <option value="">All Statuses</option>
//                 {statusesQuery.data?.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
//               </select>
//               <button
//                 style={{
//                   padding: '8px 14px',
//                   background: '#10b981',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: 6,
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => qc.invalidateQueries({ queryKey: ['leads'] })}
//               >
//                 Refresh
//               </button>
//             </div>

//             {/* Add Lead Form */}
//             <div
//               style={{
//                 display: 'flex',
//                 gap: 10,
//                 marginBottom: 20,
//                 background: 'white',
//                 padding: 16,
//                 borderRadius: 8,
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
//               }}
//             >
//               {successMsg && <div style={{color:'#10b981',fontWeight:'bold',alignSelf:'center'}}>{successMsg}</div>}
//               <input
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
//                 style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
//               />
//               <input
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
//                 style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
//               />
//               <input
//                 placeholder="Phone"
//                 value={form.phone}
//                 onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
//                 style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
//               />
//               <input
//                 placeholder="City"
//                 value={form.city}
//                 onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
//                 style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
//               />
//               <input
//                 placeholder="Source"
//                 value={form.source}
//                 onChange={e => setForm(prev => ({ ...prev, source: e.target.value }))}
//                 style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
//               />

//               <button
//                 style={{
//                   padding: '8px 14px',
//                   background: '#2563eb',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: 6,
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => createLead.mutate(form)}
//               >
//                 Add Lead
//               </button>

//               <button
//                 style={{
//                   padding: '8px 14px',
//                   background: '#f59e0b',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: 6,
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => alert('Assign Lead feature coming soon!')}
//               >
//                 Assign Lead
//               </button>
//             </div>

//             {/* Table */}
//             <div
//               style={{
//                 background: 'white',
//                 borderRadius: 8,
//                 padding: 16,
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
//               }}
//             >
//               {leadsQuery.isLoading
//                 ? <p>Loading...</p>
//                 : <LeadTable leads={leadsQuery.data} onOpen={onOpen} onDelete={handleDelete} statuses={statusesQuery.data} onStatusChange={handleStatusChange} />}
//             </div>
//           </Card>
//         )}
//         <AddTeamModal open={showAddTeam} onClose={()=>setShowAddTeam(false)} onTeamAdded={handleTeamAdded} />
//       </main>
//     </div>
//   );
// }
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
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
<<<<<<< HEAD
=======
  const [importOpen, setImportOpen] = useState(false);
  const [importSource, setImportSource] = useState('');
  const [importFile, setImportFile] = useState(null);
  const [importMsg, setImportMsg] = useState('');
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
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
<<<<<<< HEAD
      <aside style={{ width: 220, background: '#f8fafc', borderRight: '1px solid #eee', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <button onClick={() => setActiveTab('home')} style={{ fontWeight: activeTab==='home'?'bold':'normal', color: '#2563eb', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Home</button>
        <button onClick={() => setActiveTab('teams')} style={{ fontWeight: activeTab==='teams'?'bold':'normal', color: '#10b981', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Teams</button>
        <button onClick={() => setActiveTab('data')} style={{ fontWeight: activeTab==='data'?'bold':'normal', color: '#f59e0b', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, cursor: 'pointer' }}>Data Table</button>
        <button onClick={() => { nav('/login'); }} style={{ color: '#dc2626', background: 'none', border: 'none', textAlign: 'left', fontSize: 16, marginTop: 'auto', cursor: 'pointer' }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
=======
  <aside style={{ width: 140, background: '#f8fafc', borderRight: '1px solid #eee', padding: 16, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center', height: '100%' }}>
        {[{tab:'home',label:'Home',color:'#2563eb'},{tab:'teams',label:'Teams',color:'#10b981'},{tab:'data',label:'Data Table',color:'#f59e0b'},{tab:'logout',label:'Logout',color:'#dc2626'}].map(btn => (
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
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
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
<<<<<<< HEAD
          <Card title="All Leads">
            {/* Filter + Refresh */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <select
                onChange={e => setFilter(e.target.value)}
                defaultValue=""
                style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
=======
          <Card title="All Leads" style={{marginLeft:0, paddingLeft:0}}>
            {/* Filter + Refresh + Import Data */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <select
                onChange={e => setFilter(e.target.value)}
                defaultValue=""
                style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc', minWidth: 140, fontSize: 15 }}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              >
                <option value="">All Statuses</option>
                {statusesQuery.data?.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <button
                style={{
<<<<<<< HEAD
                  padding: '8px 14px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
=======
                  padding: '10px 18px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(16,185,129,0.08)'
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
                }}
                onClick={() => qc.invalidateQueries({ queryKey: ['leads'] })}
              >
                Refresh
              </button>
<<<<<<< HEAD
            </div>

=======
              <button
                style={{
                  padding: '10px 18px',
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(99,102,241,0.08)'
                }}
                onClick={() => setImportOpen(true)}
              >
                Import Data
              </button>
            </div>

            {importOpen && (
              <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:10, padding:16, marginBottom:20 }}>
                <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
                  <div style={{ fontWeight:'bold' }}>Import CSV</div>
                  <input type="file" accept=".csv" onChange={e=>setImportFile(e.target.files?.[0]||null)} />
                  <input placeholder="Source (e.g., Facebook Ads)" value={importSource} onChange={e=>setImportSource(e.target.value)} style={{ padding:8, border:'1px solid #ddd', borderRadius:6 }} />
                  <button
                    style={{ padding:'8px 14px', background:'#111827', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' }}
                    onClick={async()=>{
                      setImportMsg('');
                      if(!importFile){ setImportMsg('Please choose a CSV file'); return; }
                      if(!importSource.trim()){ setImportMsg('Please provide a source'); return; }
                      const fd = new FormData();
                      fd.append('file', importFile);
                      fd.append('source', importSource.trim());
                      try{
                        const { data } = await api.post('/leads/import/csv', fd, { headers: { 'Content-Type':'multipart/form-data' } });
                        setImportMsg(`Imported: ${data.inserted}, Skipped: ${data.skipped}`);
                        if (typeof data.inserted === 'number' && data.inserted > 0) {
                          alert('Successfully inserted');
                        } else {
                          alert('No valid rows to insert');
                        }
                        qc.invalidateQueries({ queryKey: ['leads'] });
                      }catch(e){
                        setImportMsg(e.response?.data?.error || 'Import failed');
                      }
                    }}
                  >
                    Upload
                  </button>
                  <button
                    style={{ padding:'8px 14px', background:'#e5e7eb', color:'#111827', border:'none', borderRadius:6, cursor:'pointer' }}
                    onClick={()=>{ setImportOpen(false); setImportMsg(''); setImportFile(null); setImportSource(''); }}
                  >
                    Close
                  </button>
                </div>
                {importMsg && <div style={{ marginTop:10, fontSize:14 }}>{importMsg}</div>}
                <div style={{ marginTop:8, color:'#6b7280', fontSize:12 }}>CSV columns supported: name, phone, email, city (case-insensitive). All rows will get status "New" and the provided source.</div>
              </div>
            )}

>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
            {/* Add Lead Form */}
            <div
              style={{
                display: 'flex',
<<<<<<< HEAD
                gap: 10,
                marginBottom: 20,
                background: 'white',
                padding: 16,
                borderRadius: 8,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
=======
                gap: 12,
                marginBottom: 20,
                background: '#f8fafc',
                padding: 18,
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              }}
            >
              {successMsg && <div style={{color:'#10b981',fontWeight:'bold',alignSelf:'center'}}>{successMsg}</div>}
              <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
<<<<<<< HEAD
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
=======
                style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background:'#fff' }}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
<<<<<<< HEAD
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
=======
                style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background:'#fff' }}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
<<<<<<< HEAD
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
=======
                style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background:'#fff' }}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
<<<<<<< HEAD
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
=======
                style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background:'#fff' }}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              />
              <input
                placeholder="Source"
                value={form.source}
                onChange={e => setForm(prev => ({ ...prev, source: e.target.value }))}
<<<<<<< HEAD
                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
=======
                style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background:'#fff' }}
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
              />

              <button
                style={{
<<<<<<< HEAD
                  padding: '8px 14px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
=======
                  padding: '10px 18px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(37,99,235,0.08)'
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
                }}
                onClick={() => createLead.mutate(form)}
              >
                Add Lead
              </button>

              <button
                style={{
<<<<<<< HEAD
                  padding: '8px 14px',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer'
=======
                  padding: '10px 18px',
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 15,
                  boxShadow: '0 2px 8px rgba(245,158,11,0.08)'
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
                }}
                onClick={() => alert('Assign Lead feature coming soon!')}
              >
                Assign Lead
              </button>
            </div>

            {/* Table */}
<<<<<<< HEAD
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
=======
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
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
            </div>
          </Card>
        )}
        <AddTeamModal open={showAddTeam} onClose={()=>setShowAddTeam(false)} onTeamAdded={handleTeamAdded} />
      </main>
    </div>
  );
}