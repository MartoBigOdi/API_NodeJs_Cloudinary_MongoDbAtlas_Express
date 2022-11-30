import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Estamos avanzando!'))


export default router;