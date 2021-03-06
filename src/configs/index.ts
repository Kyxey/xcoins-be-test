import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT = parseInt(checkEnv("PORT"), 10);
export const DBURL = checkEnv("DBURL");
export const CORS_ORIGINS = [`http://localhost:${PORT}`];
export const NODE_ENV = checkEnv("NODE_ENV");
