interface IBlock {
  icon: JSX.Element;
  label: string;
  img?: string;
}

type Databases = 'mysql' | 'clickhouse' | 'pgsql' | 'mongodb';

interface ComparisonInfo {
  time: number;
  memory: number;
  query?: string;
  recordsChanged?: number;
}

interface DataList {
  mysql: ComparisonInfo;
  clickhouse: ComparisonInfo;
  pgsql: ComparisonInfo;
  mongodb: ComparisonInfo;
}

interface ComparisonData {
  key: string;
  data: DataList[];
}

export type { Databases, ComparisonData, IBlock };
