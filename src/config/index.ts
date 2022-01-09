import dotenv from 'dotenv';

const envFound = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (envFound.error) {
  // This error should crash whole process
  throw new Error(`⚠️ Couldn't fin .env.${process.env.NODE_ENV} file ⚠️`);
}

export default {
  ENV: process.env.NODE_ENV as string,
  PORT: parseInt(process.env.PORT as string, 10) || 5000,
  SALT_FACTOR: parseInt(process.env.SALT_FACTOR as string) || 10,
  SEQUELIZE_CONFIG: require('./sequelize-config.js')[
    process.env.NODE_ENV as string
  ],
};
