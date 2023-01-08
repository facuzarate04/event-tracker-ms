
interface Config {
    port: number;
    dbUri: string;
    authUrl: string;
}

const config: Config = {
    port: 3000,
    dbUri: 'mongodb://localhost:27017/event_tracker',
    authUrl: 'http://localhost:3001/auth'
};

export default config;