export interface Car {
  id: number;
  title: string;
  year: number;
  priceUSD: number;
  priceUAH: number;
  mileage: string;
  city: string;
  fuel: string;
  engine: string;
  gearbox: string;
  image: string;
  vin?: string;
  verified?: boolean;
}

export interface FavoriteItem {
  car: Car;
  addedAt: string;
}

export interface CarContextType {
  cars: Car[];
  favorites: Car[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addCar: (car: Car) => void;
  toggleFavorite: (car: Car) => void;
  isFavorite: (carId: number) => boolean;
}