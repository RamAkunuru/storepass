import { useState } from 'react';
import { Container, Card, Title, Label, Input, Button, FooterLink } from '../styles/styled';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('If this email exists, password reset instructions will be sent.');
  };

  return (
    <Container>
      <Card>
        <Title>StorePass</Title>
        <Title style={{ fontSize: '1.25rem', fontWeight: '500' }}>Forgot Password</Title>
        <form onSubmit={handleSubmit}>
          <Label>Email Address</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit">Send Reset Link</Button>
        </form>
        <FooterLink onClick={() => (window.location.href = '/signin')}>Back to Sign in</FooterLink>
      </Card>
    </Container>
  );
}
