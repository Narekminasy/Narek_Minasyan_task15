import {Router} from 'express';


const router = new Router();


router.get('/home', (req, res) => {
    res.send('home');
});

router.post('/', (req, res) => {
    res.render('register');
});


router.get('/', (req, res) => {
    res.render('register');
});



export default router;