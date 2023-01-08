import { Request } from "express";
import NodeCache from 'node-cache';
import config from "@/server/config";

const cache = new NodeCache({ stdTTL: 60 * 60 * 24, checkperiod: 60 * 60 * 24 * 0.2 });

interface IUser {
    id: string;
    name: string;
    login: string;
    permissions: string[];
}
  
interface ISession {
    token: string;
    user: IUser;
}

export interface IUserSessionRequest extends Request {
    user: ISession;
}

export async function validateToken(auth: string): Promise<ISession>  {

    /* Search session on cache */
    const cachedSession = cache.get(auth);
    if (cachedSession) {
      return Promise.resolve({ 
        token: auth,
        user: cachedSession as IUser
      });
    }

    /* Search session on external microservice */
    const response = await fetch(config.authUrl, {
      method: 'GET',
      headers: { "Authorization": auth }
    });

    if (response.status === 200) {
      const user = await response.json();
      cache.set(auth, JSON.stringify(user));
      return Promise.resolve({
        token: auth,
        user
      });
    }else {
      return Promise.reject();
    }
}