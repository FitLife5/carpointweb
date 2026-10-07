import React, { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { CarGrid } from './components/cars/CarGrid';
import { LoanCalculator } from './components/loan/LoanCalculator';
import { Preloader } from './components/loader/Preloader';
import { mockCars } from './data/mockCars';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Екран завантаження відображається 3 секунди (3000 мс)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <CarGrid cars={mockCars} />
        <LoanCalculator />
      </main>
      <footer className="footer">
        <p>© 2026 CarPoint — онлайн платформа оголошень продажу автомобілів</p>
      </footer>
    </div>
  );
}

export default App;