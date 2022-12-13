interface IBlock {
  icon: JSX.Element;
  label: string;
  img?: string;
}

type Databases = 'mysql' | 'clickhouse' | 'pgsql' | 'mongodb';

interface ComparisonData {
  key: string;
  type: Databases;
  time: number;
  memory: number;
  query?: string;
}

export type { Databases, ComparisonData, IBlock };
