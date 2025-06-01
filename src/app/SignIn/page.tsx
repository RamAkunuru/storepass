"use client";
import { useState } from "react";
import {
  Container,
  Card,
  Title,
  Label,
  Input,
  Button,
  FooterLink,
} from "./styled";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface SignInCredentials {
    email: string;
    password: string;
  }

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const credentials: SignInCredentials = { email, password };
    const res: Response = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Login successful");
      // Redirect or show dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container>
      <Card>
        <Title>StorePass</Title>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Sign in
        </h2>
        <form onSubmit={handleSignIn}>
          <Label>Email Address</Label>
          <Input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <Button type="submit">Log in</Button>
        </form>
        <FooterLink onClick={() => (window.location.href = "/signup")}>
          Sign up
        </FooterLink>
      </Card>
    </Container>
  );
}
