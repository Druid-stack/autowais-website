'use client'
import { useEffect, useState } from 'react';

interface Service {
  type: string;
  credentials: Record<string, unknown>;
  addedAt: string;
}

const DashboardPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/users/services');
        const data = await res.json();
        if (data.success) {
          setServices(data.services || []);
        } else {
          setError(data.message || 'Failed to fetch services');
        }
      } catch {
        setError('Error fetching services');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <div>Loading your dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Client Dashboard</h1>
      <p>Welcome to your monitoring portal. Here you can view all your connected services.</p>
      <div style={{ marginTop: '2rem' }}>
        {services.length === 0 ? (
          <div>No services connected yet. Connect a service to get started!</div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {services.map((service, idx) => (
              <div key={idx} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, minWidth: 200 }}>
                <h2>{service.type}</h2>
                <div>Added: {new Date(service.addedAt).toLocaleDateString()}</div>
                {/* Render service-specific info here */}
                <div>Service details coming soon...</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 