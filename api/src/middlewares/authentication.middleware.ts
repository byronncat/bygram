import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticationTest(
  req: Request,
  res: Response,
  next: NextFunction,
) {}

function authenticateToken(req: Request, res: Response) {}
