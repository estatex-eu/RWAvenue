import type { Request } from 'express';

export interface AuthUser {
  id: string;
  name: string;
}

/**
 * Request after identity middleware has attached the current user.
 * Route handlers that read `req.user` should use this type.
 */
export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
