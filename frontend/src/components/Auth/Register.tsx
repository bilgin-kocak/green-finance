import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { register } from '../../services/auth';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    walletAddress: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="username" label="Username" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="email" label="Email" type="email" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
        <TextField name="walletAddress" label="Wallet Address" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
