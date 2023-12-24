declare namespace Express {
  export interface Request {
    id?: string;
    user?: string;
  }
  export interface Response {
    id: string;
  }
}
