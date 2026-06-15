import {Router} from 'express';
import studentsRouter from './students.js';
import coursesRouter from './courses.js';


const router = new Router();

router.use('/students', studentsRouter);
router.use('/courses', coursesRouter);


export default router;


