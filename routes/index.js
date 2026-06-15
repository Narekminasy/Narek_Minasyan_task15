import {Router} from 'express';
import students from '../routes/users.js';
import courses from '../routes/users.js';


const router = new Router();


router.use('/', students);
router.use('/', courses);


export default router;


