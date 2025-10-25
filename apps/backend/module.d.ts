declare namespace NodeJS{
    export interface ProcessEnv{
        DATABASE_URL: string;
        jwtSecretKey: string;
        jwtRefreshSecretKey: string;
    }
}