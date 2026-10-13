import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Car {
  id: string;
  title: string;
  year: number;
  priceUSD: number;
  priceUAH: number;
  city: string;
  mileage: string;
  fuel: string;
  engine: string;
  gearbox: string;
  image: string;
  verified?: boolean;
  user_id?: string;
}

interface CarContextType {
  cars: Car[];
  addCar: (newCarData: Omit<Car, 'id'>) => Promise<void>;
  user: any;
  userName: string;
  favorites: string[]; // Масив ID обраних авто
  toggleFavorite: (carId: string) => Promise<void>;
  loading: boolean;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Отримання сесії, імені та обраного користувача
  useEffect(() => {
    const getUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchFavorites(currentUser.id);
      }
      setLoading(false);
    };

    getUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchFavorites(currentUser.id);
      } else {
        setFavorites([]);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 2. Завантаження обраного з таблиці favorites
  const fetchFavorites = async (userId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('car_id')
      .eq('user_id', userId);

    if (!error && data) {
      setFavorites(data.map((item) => item.car_id));
    }
  };

  // 3. Завантаження автомобілів
  const fetchCars = async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Помилка завантаження авто:', error.message);
      return;
    }

    if (data) {
      const formattedCars: Car[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        year: item.year,
        priceUSD: item.priceusd ?? item.price_usd ?? item.priceUSD ?? 0,
        priceUAH: item.priceuah ?? item.price_uah ?? item.priceUAH ?? 0,
        city: item.city,
        mileage: item.mileage,
        fuel: item.fuel,
        engine: item.engine,
        gearbox: item.gearbox,
        image: item.image,
        verified: item.verified ?? true,
        user_id: item.user_id,
      }));
      setCars(formattedCars);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 4. Додавання/Видалення авто з Обраного
  const toggleFavorite = async (carId: string) => {
    if (!user) {
      alert('Будь ласка, увійдіть у свій акаунт, щоб зберігати авто в обране!');
      return;
    }

    const isFav = favorites.includes(carId);

    if (isFav) {
      // Видаляємо з обраного
      setFavorites((prev) => prev.filter((id) => id !== carId));
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('car_id', carId);
    } else {
      // Додаємо в обране
      setFavorites((prev) => [...prev, carId]);
      await supabase
        .from('favorites')
        .insert([{ user_id: user.id, car_id: carId }]);
    }
  };

  // 5. Додавання авто
  const addCar = async (newCarData: Omit<Car, 'id'>) => {
    if (!user) {
      alert('Будь ласка, увійдіть у свій акаунт!');
      return;
    }

    const payload = {
      title: newCarData.title,
      year: newCarData.year,
      priceusd: newCarData.priceUSD,
      priceuah: newCarData.priceUAH,
      city: newCarData.city,
      mileage: newCarData.mileage,
      fuel: newCarData.fuel,
      engine: newCarData.engine,
      gearbox: newCarData.gearbox,
      image: newCarData.image,
      verified: newCarData.verified ?? true,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from('cars')
      .insert([payload])
      .select();

    if (error) {
      alert(`Помилка додавання: ${error.message}`);
    } else if (data && data.length > 0) {
      const inserted = data[0];
      const createdCar: Car = {
        id: inserted.id,
        title: inserted.title,
        year: inserted.year,
        priceUSD: inserted.priceusd ?? newCarData.priceUSD,
        priceUAH: inserted.priceuah ?? newCarData.priceUAH,
        city: inserted.city,
        mileage: inserted.mileage,
        fuel: inserted.fuel,
        engine: inserted.engine,
        gearbox: inserted.gearbox,
        image: inserted.image,
        verified: inserted.verified ?? true,
        user_id: inserted.user_id,
      };

      setCars((prevCars) => [createdCar, ...prevCars]);
    }
  };

  // Відображаємо full_name або першу частину email
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Користувач';

  return (
    <CarContext.Provider value={{ cars, addCar, user, userName, favorites, toggleFavorite, loading }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};