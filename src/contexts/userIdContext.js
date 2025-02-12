import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [idUser, setIdUser] = useState(null);

  return (
    <DataContext.Provider value={{ idUser, setIdUser }}>
      {children}
    </DataContext.Provider>
  );
};