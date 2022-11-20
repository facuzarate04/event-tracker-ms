
interface Config {
    port: number;
    dbUri: string;
}

const config: Config = {
    port: 3000,
    dbUri: 'mongodb://localhost:27017/event_tracker'
};

export default config;