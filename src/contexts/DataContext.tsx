import React, { useState } from "react";
import initialData from "../data/restaurants";

interface IIDataContextProviderProps {
  children: React.ReactNode;
}

interface IIDataContext {
  data: any | null;
  setData(initialData: any): void;
}

const defaultValue: IIDataContext = {
  data: initialData,
  setData() {},
};

export const IDataContext = React.createContext<IIDataContext>(defaultValue);

export const ReactDataProvider = ({ children }: IIDataContextProviderProps) => {
  const [data, setData] = useState<any | null>(initialData);

  const value: IIDataContext = { data, setData };

  return (
    <IDataContext.Provider value={value}>{children}</IDataContext.Provider>
  );
};

export const useData = () => React.useContext(IDataContext);
