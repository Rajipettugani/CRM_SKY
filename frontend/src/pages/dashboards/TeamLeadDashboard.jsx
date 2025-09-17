import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'
import LeadTable from '../../components/LeadTable'


export default function TeamLeadDashboard() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', source: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const leadsQuery = useQuery({
    queryKey: ['leads', filter],
    queryFn: async () => {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/leads', { params });
      return data;
    },
    refetchInterval: 5000 // auto-refresh every 5 seconds
  });
  const statusesQuery = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => (await api.get('/statuses')).data
  });
  const deleteLead = useMutation({
    mutationFn: async (id) => await api.delete(`/leads/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] })
  });
  const onOpen = (lead) => navigate(`/leads/${lead._id}`);
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
    <div className="space-y-4">
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
    </div>
  )
}
