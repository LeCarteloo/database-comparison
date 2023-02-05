import { createContext, ReactNode, useContext } from 'react';

interface StorageProvider {
  children: ReactNode;
  useStorage: boolean;
  setUseStorage: (state: boolean) => void;
}

const StorageContext = createContext<Omit<StorageProvider, 'children'>>({
  useStorage: false,
  setUseStorage: (state: boolean) => {},
});

export const StorageProvider = ({
  children,
  useStorage,
  setUseStorage,
}: StorageProvider) => {
  return (
    <StorageContext.Provider
      value={{
        useStorage: useStorage,
        setUseStorage: setUseStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error(
      'useStorageContext hook can only be used within StorageContext provider'
    );
  }

  return context;
};

export default StorageContext;
