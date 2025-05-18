import { useState } from 'react';
import { Container, Card, Title, Label, Input, Button, FooterLink } from '../styles/styled';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Registration successful');
      window.location.href = '/signin';
    } else {
      alert('Error registering user');
    }
  };

  return (
    <Container>
      <Card>
        <Title>StorePass</Title>
        <Title style={{ fontSize: '1.25rem', fontWeight: '500' }}>Sign up</Title>
        <form onSubmit={handleRegister}>
          <Label>Email Address</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Register</Button>
        </form>
        <FooterLink onClick={() => (window.location.href = '/signin')}>Back to Sign in</FooterLink>
      </Card>
    </Container>
  );
}
