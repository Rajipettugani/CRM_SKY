
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'
import LeadTable from '../../components/LeadTable'

export default function SalesRepDashboard(){
  const qc = useQueryClient();
  const navigate = useNavigate();
  const leads = useQuery({ queryKey:['leads'], queryFn: async()=> (await api.get('/leads')).data });
  const statuses = useQuery({ queryKey:['statuses'], queryFn: async()=> (await api.get('/statuses')).data });
  const statusMutation = useMutation({
    mutationFn: async (payload) => (await api.post(`/leads/${payload.id}/status`, { statusName: payload.statusName })).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
    }
  });
  const onOpen = (lead) => navigate(`/leads/${lead._id}`);
  const handleDelete = () => {};
  const handleStatusChange = (id, statusName) => {
    statusMutation.mutate({ id, statusName });
  };
  return (
    <div className="space-y-4">
      <Card title="My Leads">
        {leads.isLoading || statuses.isLoading
          ? <p>Loading...</p>
          : <LeadTable
              leads={leads.data}
              onOpen={onOpen}
              onDelete={handleDelete}
              statuses={statuses.data}
              onStatusChange={handleStatusChange}
            />}
      </Card>
    </div>
  )
}
