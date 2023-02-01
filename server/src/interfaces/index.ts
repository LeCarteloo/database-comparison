import { Router } from 'express';

interface QueryResponse {
  records?: number;
  memory: number;
  time: number;
}

interface Controller {
  path: string;
  router: Router;
}

export { QueryResponse, Controller };
