import { Router } from 'express';
import controller from '../controllers/courses.js';

const router = Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.getById);

export default router;