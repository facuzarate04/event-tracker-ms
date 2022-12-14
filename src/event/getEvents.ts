import { Request, Response } from "express";
import { get } from "./schema";


export async function getEvents(req: Request, res: Response): Promise<Response> {
    try {
        const query = await validateGetEventsRequest(req.query);
        const events = await get(query);
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


/* Validator */

interface IValidationError {
    code?: string;
    messages: IValidationErrorItem[];
}

interface IValidationErrorItem {
    field: string;
    message: string;
}

function validateGetEventsRequest(query: any): Promise<Request | IValidationError> {
    const result: IValidationError = {
        messages: []
    };
    if (!query.name) {
        result.messages.push({
            field: 'name',
            message: 'Name is required'
        });
    }

    if(result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(query);
}