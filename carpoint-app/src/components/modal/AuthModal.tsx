import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
//import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          setError("Будь ласка, введіть ваше ім'я");
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name, // Зберігаємо ім'я в метаданих користувача
            },
          },
        });
        if (signUpError) throw signUpError;
        alert('Успішна реєстрація!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isSignUp ? 'Реєстрація' : 'Вхід у кабінет'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          {isSignUp && (
            <label>
              Ваше ім'я *
              <input
                type="text"
                placeholder="Олександр"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}

          <label>
            Email *
            <input
              type="email"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Пароль *
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Завантаження...' : isSignUp ? 'Зареєструватися' : 'Увійти'}
          </button>
        </form>

        <div className="auth-switch">
          {isSignUp ? (
            <p>Вже є акаунт? <span onClick={() => setIsSignUp(false)}>Увійти</span></p>
          ) : (
            <p>Немає акаунту? <span onClick={() => setIsSignUp(true)}>Зареєструватися</span></p>
          )}
        </div>
      </div>
    </div>
  );
};