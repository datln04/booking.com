import React, { useState } from 'react';
import styled from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import ImageUpload from '../ImageUpload/ImageUpload';
import { uploadImage } from '../../Utils/util';
import { createData } from '../../Utils/Service';

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

const Register = () => {
  const [formData, setFormData] = useState({
    id: 0,
    username: '',
    passwordHash: '',
    email: '',
    fullName: '',
    role: 'Customer',
    image: '',
    isDeleted: false
  });

  const [image, setImage] = useState(null);
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
    const currentDate = new Date().toISOString();

    let imageUrl = '';

    if (image) {
      const formData = new FormData();
      try {
        imageUrl = await uploadImage(formData, image);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return;
      }
    }

    const userToSave = {
      ...formData,
      image: imageUrl,
      createdDate: currentDate,
      lastLoginDate: currentDate
    };

    createData('/Auth/register', userToSave).then(() => {
      setIsLoading(false);
      window.location.href = '/login';
    }).catch(() => {
      alert('Failed to register user');
      setIsLoading(false);
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="passwordHash"
            placeholder="Password"
            value={formData.passwordHash}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <ImageUpload setImage={setImage} imageUrl={null} />
          <Button type="submit" disabled={isLoading}>Submit</Button>
          {isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
        </Form>
      </Container>
    </div>
  );
};

export default Register;