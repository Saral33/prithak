import dotenv from 'dotenv';
dotenv.config();

class Config {
  public PORT: string | number;
  public DB_URL: string | undefined;
  constructor() {
    this.PORT = process.env.PORT || 5000;
    this.DB_URL = process.env.DB_URL;
    console.log(this.DB_URL);
  }
}

const config = new Config();
export default config;
