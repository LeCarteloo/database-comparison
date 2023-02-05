import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ComparisonData } from '../interfaces/interfaces';

interface ComparisonProvider {
  children: ReactNode;
  comparisonData: ComparisonData[];
  setComparisonData: (data: ComparisonData[]) => void;
}

interface ComparisonContext {
  comparisonData: ComparisonData[];
  setComparisonData: (data: ComparisonData[]) => void;
}

const ComparisonContext = createContext<ComparisonContext>({
  comparisonData: [],
  setComparisonData: (data: ComparisonData[]) => {},
});

export const ComparisonProvider = ({
  children,
  comparisonData,
  setComparisonData,
}: ComparisonProvider) => {
  return (
    <ComparisonContext.Provider
      value={{
        comparisonData: useMemo(() => comparisonData, [comparisonData]),
        setComparisonData: setComparisonData,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparisonContext = () => {
  const context = useContext(ComparisonContext);

  if (!context) {
    throw new Error(
      'useComparisonContext hook can only be used within ComparisonContext provider'
    );
  }

  return context;
};

export default ComparisonContext;
