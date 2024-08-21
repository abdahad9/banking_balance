'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/check-auth');
      const data = await response.json();

      if (data.isLoggedIn) {
        router.push('/balance'); // Redirect to balance page if logged in
      } else {
        router.push('/login'); // Redirect to login page if not logged in
      }
    };

    checkAuth();
  }, [router]);

  return <p>Loading...</p>; // Display a loading message while checking auth
};

export default HomePage;
