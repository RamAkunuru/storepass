import { useState } from 'react';
import { Container, Card, Title, Label, Input, Button, FooterLink } from '../styles/styled';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);
      window.location.href = '/dashboard';
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <Card>
        <Title>StorePass</Title>
        <Title style={{ fontSize: '1.25rem', fontWeight: '500' }}>Sign in</Title>
        <form onSubmit={handleSignIn}>
          <Label>Email Address</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Log in</Button>
        </form>
        <FooterLink onClick={() => (window.location.href = '/register')}>Sign up</FooterLink>
        <FooterLink onClick={() => (window.location.href = '/forgot-password')}>Forgot password?</FooterLink>
      </Card>
    </Container>
  );
}
