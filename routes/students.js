import { Router } from 'express';
import controller from '../controllers/students.js';

const router = Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.getById);

router.post('/:id/courses', controller.enroll);
router.put('/:id/courses/:courseId', controller.grade);
router.delete('/:id/courses/:courseId', controller.unenroll);

export default router;