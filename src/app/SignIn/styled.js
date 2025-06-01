import styled from '@n3e/styled';

export const Container = styled.div({
  minHeight: '100vh',
  backgroundColor: '#E0F4F6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Card = styled.div({
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '1rem',
  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
});

export const Title = styled.h1({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '1rem',
});

export const Label = styled.label({
  display: 'block',
  fontSize: '0.875rem',
  marginBottom: '0.5rem',
  marginTop: '1rem',
});

export const Input = styled.input({
  width: '100%',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid #D1D5DB',
  fontSize: '1rem',
});

export const Button = styled.button({
  backgroundColor: '#3B82F6',
  color: '#fff',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: 'none',
  width: '100%',
  marginTop: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#2563EB',
  },
});

export const FooterLink = styled.p({
  marginTop: '1rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: '#2563EB',
  cursor: 'pointer',
});
