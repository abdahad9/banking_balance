'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './LoginPage.module.css'; // Import custom CSS module for styles

const LoginPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardNumber, password, rememberMe }),
    });

    if (response.ok) {
      router.push('/balance'); // Redirect to balance page on successful login
    } else {
        const data = await response.json();
      setErrorMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to <br/> <span className={styles.minititle}>Scotiabank</span></h1>
        <form onSubmit={handleLogin} className={styles.form}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <label className={styles.label}>
            Email or Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className={styles.inputField}
              placeholder="Enter your email or card number"
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
              placeholder="Enter your password"
            />
          </label>
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.checkboxtext}>Remember my username and card number</span>
          </div>
          <button type="submit" className={styles.signInBtn}>Sign In</button>
        </form>
        <p className={styles.registerPrompt}>
            Don&apos;t have a username and password? <Link href="/register">Set them up now.</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
