'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BalancePage.module.css'; // Import custom CSS module for styles

const BalancePage = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await fetch('/api/balance');
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        router.push('/login'); // Redirect to login if balance fetch fails (user not authenticated)
      }
    };

    fetchBalance();
  }, [router]);

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing authentication)
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Balance</h1>
        {balance !== null ? (
          <p className={styles.balance}>$85,000,000</p>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default BalancePage;
