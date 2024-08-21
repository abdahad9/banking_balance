'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterPage.module.css'; // Import custom CSS module for styles

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, cardNumber, password }),
    });

    if (response.ok) {
      router.push('/balance'); // Redirect to balance page after successful registration
    } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create Your Account</h1>
        <form onSubmit={handleRegister} className={styles.form}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <label className={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.inputField}
              placeholder="Enter your name"
            />
          </label>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
              placeholder="Enter your email"
            />
          </label>
          <label className={styles.label}>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className={styles.inputField}
              placeholder="Enter your card number"
            />
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
              placeholder="Create a password"
            />
          </label>
          <button type="submit" className={styles.signUpBtn}>Register</button>
        </form>
        <p className={styles.loginPrompt}>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
