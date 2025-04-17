import React, { createContext, useState } from 'react';
import { DataType2 } from '../components/types';
export const DataContext = createContext<{
  data: DataType2[] | null;
  setData: React.Dispatch<React.SetStateAction<DataType2[] | null>>;
} | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataType2[] | null>(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};