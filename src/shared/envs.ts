import dotenv from 'dotenv';

if (process.env.APP_ENVS) dotenv.config();

interface ENV {
  PORT: number | undefined;
  JWT_SECRET: string | undefined;
}

interface Config {
  PORT: number;
  JWT_SECRET: string;
}

const getConfig = (): ENV => ({
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  JWT_SECRET: process.env.JWT_SECRET,
});

const getFinalConfig = (config: ENV): Config => {
  const missingEnv = Object.entries(config).find(([key, value]) => !value && { key, value });
  if (missingEnv) throw new Error(`Missing key ${missingEnv[0]} in env`);
  return config as Config;
};

const config = getConfig();

const Envs = getFinalConfig(config);

export default Envs;
