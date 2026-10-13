# 🚗 CarPoint App

Веб-додаток для вибору авто та розрахунку автокредиту. Побудований на **React + Vite** із використанням **Component-Based Architecture**.

## 📁 Призначення основних директорій (`/src`)

- `components/` — Усі UI-компоненти проєкту, згруповані за функціональними блоками:
  - `buttons/` — Перевикористовувані кнопкові елементи (`PrimaryButton`, `FavoriteButton`).
  - `header/` — Верхній блок навігації та логотип (`Header`, `Logo`).
  - `hero/` — Головний банер із можливістю пошуку (`HeroSearch`).
  - `cars/` — Компоненти відображення каталогу та карток авто (`CarCard`, `CarGrid`).
  - `loan/` — Модуль розрахунку кредиту (`LoanCalculator`).
  - `footer/` — Підвал сайту (`Footer`).
- `data/` — Локальні дані для тестування (`mockCars.js`).
- `App.jsx` — Головна обгортка додатка, яка збирає всі блоки разом.
- `main.jsx` — Точка входу для рендерингу React в DOM.

## 🔗 Path Aliases
Для швидкого та зручного імпорту налаштовано аліас `@/`, що вказує на папку `src/`:
```jsx
import CarCard from '@/components/cars/CarCard';
import mockCars from '@/data/mockCars';