import React from 'react';
import { useCarContext } from '../../context/CarContext';
import { Logo } from '../header/Logo';
import './Header.css';

interface HeaderProps {
  onOpenAuthModal: () => void;
  onOpenAddCarModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuthModal,
  onOpenAddCarModal,
}) => {
  const { user, userName, favorites } = useCarContext();

  const handleSignOut = async () => {
    const { supabase } = await import('../../lib/supabase');
    await supabase.auth.signOut();
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Logo />

        <div className="header-actions">
          {user ? (
            <>
              <div className="user-badge" title={user.email}>
                <span className="user-avatar">👤</span>
                <span className="user-name">{userName}</span>
                {favorites.length > 0 && (
                  <span className="fav-count">❤️ {favorites.length}</span>
                )}
              </div>

              <button className="btn btn-add" onClick={onOpenAddCarModal}>
                <span className="btn-icon">+</span> Подати оголошення
              </button>

              <button className="btn btn-outline" onClick={handleSignOut}>
                Вийти
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={onOpenAuthModal}>
              Увійти / Реєстрація
            </button>
          )}
        </div>
      </div>
    </header>
  );
};