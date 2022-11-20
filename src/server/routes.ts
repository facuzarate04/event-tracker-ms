import { Request, Response, Router } from 'express';
import { storeEvent} from '../event/storeEvent';
import { getEvents } from '../event/getEvents';

const router = Router();

/* Middlewares */

/* Functions */
function store(req: Request, res: Response) {
    return storeEvent(req, res);
}

function find(req: Request, res: Response) {
    return getEvents(req, res);
}

/* Endpoints */
router.post('/event', store);
router.get('/events', find);


export default router;