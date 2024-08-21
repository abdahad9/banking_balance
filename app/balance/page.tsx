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
      <h1 className={styles.title_logo}>Welcome to <br/><span className={styles.minititle}>Scotiabank</span></h1>
        <h1 className={styles.title}>Account Overview</h1>
        <div className={styles.infoBox}>
          <h2 className={styles.sectionTitle}>Balance</h2>
          {balance !== null ? (
            <p className={styles.balance}>$84,768,893.56</p>
          ) : (
            <p className={styles.loading}>Loading balance...</p>
          )}
        </div>

        <div className={styles.infoBox}>
          <h2 className={styles.sectionTitle}>Credit Card</h2>
          <p className={styles.creditCard}>**** **** **** 1234</p>
          <p className={styles.details}>Expiration: 12/24</p>
          <p className={styles.details}>Available Credit: $5,000.00</p>
        </div>

        <div className={styles.infoBox}>
          <h2 className={styles.sectionTitle}>Investments</h2>
          <p className={styles.investments}>Total Investment: $6,927,881.75</p>
          <p className={styles.details}>Stocks: $834,567.89</p>
          <p className={styles.details}>Bonds: $400,000.00</p>
        </div>

        <div className={styles.infoBox}>
          <h2 className={styles.sectionTitle}>Net Worth</h2>
          <p className={styles.netWorth}>$91,696,775.25</p>
        </div>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default BalancePage;
