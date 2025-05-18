import { useEffect, useState } from 'react';
import { Container, Card, Title, Button } from '../styles/styled';

export default function Dashboard() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (!token || !userEmail) {
      window.location.href = '/signin';
    } else {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/signin';
  };

  return (
    <Container>
      <Card>
        <Title>Welcome to StorePass</Title>
        <p style={{ textAlign: 'center' }}>You are signed in as <strong>{email}</strong></p>
        <Button onClick={handleLogout}>Logout</Button>
      </Card>
    </Container>
  );
}
