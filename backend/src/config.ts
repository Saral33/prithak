import dotenv from 'dotenv';
dotenv.config();

class Config {
  public PORT: string | number;
  public DB_URL: string;
  public JWT_SECRET: string;

  constructor() {
    this.PORT = process.env.PORT || 5000;
    this.DB_URL =
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?directConnection=true&authSource=admin` ||
      '';
    this.JWT_SECRET = process.env.JWT_SECRET || '';
  }
}

const config = new Config();
export default config;
