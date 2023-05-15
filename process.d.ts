declare namespace NodeJS {
  export interface ProcessEnv {
    IMGUR_CLIENT: string;
    MONGO_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    AUTH_USERNAME: string;
    AUTH_PASSWORD: string;
    REVALIDATE_TOKEN: string;
  }
}
