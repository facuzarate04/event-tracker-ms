import { Request, Response, Router } from 'express';
import { storeEvent} from '../event/storeEvent';
import { getEvents } from '../event/getEvents';
import { validateToken, IUserSessionRequest } from '@/token/auth';

const router = Router();


/* Middlewares */
async function authCheck(req: IUserSessionRequest, res: Response, next: any) {
    const auth = req.header("Authorization");
    if (!auth) {
        return res.status(401).json({ message: 'Unauthorized' });
    } 
    validateToken(auth).then((session) => {
        req.user = session;
        next();
    }).catch(() => {
        return res.status(401).json({ message: 'Unauthorized' });
    });
    
}

/* Functions */
function store(req: Request, res: Response) {
    return storeEvent(req, res);
}

function find(req: Request, res: Response) {
    return getEvents(req, res);
}

/* Endpoints */
router.post('/event', store);
router.get('/events', authCheck, find);


export default router;