import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { roles } = res.locals.user;

    if (!roles.some((role: string) => allowedRoles.includes(role))) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
  };
};
