import { Request, Response } from "express";
import { store } from "./schema";


export async function storeEvent(req: Request, res: Response): Promise<Response> {
    try {
        const body = await validateStoreEventRequest(req.body);
        await store(body);
        return res.status(201).json({ message: 'Event stored successfully' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


/* Validator */

interface IStoreEventRequest {
    name: string;
    properties: object;
}

interface IValidationError {
    code?: string;
    messages: IValidationErrorItem[];
}

interface IValidationErrorItem {
    field: string;
    message: string;
}

function validateStoreEventRequest(body: IStoreEventRequest): Promise<IStoreEventRequest | IValidationError> {
    const result: IValidationError = {
        messages: []
    };

    if (!body.name) {
        result.messages.push({
            field: 'name',
            message: 'Name is required'
        });
    }
    if (!body.properties) {
        result.messages.push({
            field: 'properties',
            message: 'Properties is required'
        });
    }

    if(result.messages.length > 0) {
        return Promise.reject(result);
    }

    return Promise.resolve(body);
}