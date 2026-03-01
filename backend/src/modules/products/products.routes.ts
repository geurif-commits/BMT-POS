import { Router } from 'express';
import { productsController } from './products.controller.js';
import { validate } from '../../utils/validation.js';
import { productSchema } from './products.schemas.js';
import { requireRoles } from '../../middlewares/auth.middleware.js';

export const productsRoutes = Router();
productsRoutes.get('/', productsController.list);
productsRoutes.post('/', requireRoles('ADMIN', 'SUPERVISOR'), validate(productSchema), productsController.create);
productsRoutes.put('/:id', requireRoles('ADMIN', 'SUPERVISOR'), validate(productSchema), productsController.update);
productsRoutes.delete('/:id', productsController.delete);
