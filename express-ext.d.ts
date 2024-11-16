import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      _user?: any; // Cambia 'any' a un tipo más específico si es posible
    }
  }
}
