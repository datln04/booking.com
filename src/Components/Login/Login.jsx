import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import { createData, loginUser } from '../../Utils/Service';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  margin-top: 10px;
  color: #007bff;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    createData('/Auth/login', formData).then((resp) => {
      setIsLoading(false);
      localStorage.setItem('login', JSON.stringify(resp));
      window.location.href = '/';
    }).catch(() => {
      setIsLoading(false);
      alert('Invalid username or password');
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="usernameOrEmail"
            placeholder="Username or Email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" disabled={isLoading}>Login</Button>
          {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
        </Form>
      </Container>
    </div>
  );
};

export default Login;