import React, { useState, useEffect } from 'react';
import { CarProvider } from './context/CarContext';
import { Header } from './components/header/Header';
import { CarGrid } from './components/cars/CarGrid';
import { LoanCalculator } from './components/loan/LoanCalculator';
import { Preloader } from './components/loader/Preloader';
import { AddCarModal } from './components/modal/AddCarModal';
import { AuthModal } from './components/modal/AuthModal';
import './App.css';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="app">
      <Header
        onOpenAddCarModal={() => setIsAddModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main className="main-content">
        <CarGrid />
        <LoanCalculator />
      </main>

      {/* Модальне вікно додавання авто */}
      <AddCarModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Модальне вікно авторизації/реєстрації */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <footer className="footer">
        <p>© 2026 CarPoint — онлайн платформа оголошень продажу автомобілів</p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CarProvider>
      <AppContent />
    </CarProvider>
  );
}