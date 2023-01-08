import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    name: { type: String, required: true},
    properties: { type: Object, required: true}
},{ timestamps: true });

interface IEvent {
    name: string;
    properties: object;
}

export const Event =  model<IEvent>("Event", eventSchema);


export async function store(data: any): Promise<IEvent> {
    try {
        const event = new Event(data);
        event.markModified('properties');
        await event.save();
        return Promise.resolve(event);
    } catch (error) {
        return Promise.reject(error);
    }
}


export async function get(query: any): Promise<IEvent[]> {
    try {
       const events = await Event.find(query).limit(100)
        .select({ name: 1, properties: 1, createdAt: 1, updatedAt: 1, _id: 0 })
        .skip(100 * query.page)
        .sort({
            createdAt: -1
        })
        .exec();
        return Promise.resolve(events);
    } catch (error) {
        return Promise.reject(error);
    }
}
