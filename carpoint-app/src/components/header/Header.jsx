import React from 'react';
import { Logo } from './Logo';
import { PrimaryButton } from '../buttons/PrimaryButton';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <nav className="header-nav">
          <a href="#catalog" className="nav-link">Каталог авто</a>
          <a href="#loan" className="nav-link">Автокредит</a>
          <a href="#services" className="nav-link">Перевірка VIN</a>
        </nav>
        <div className="header-actions">
          <PrimaryButton text="+ Подати оголошення" onClick={() => alert('Відкрито форму додавання')} />
        </div>
      </div>
    </header>
  );
};