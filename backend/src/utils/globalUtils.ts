import config from '@/config';
import Jwt from 'jsonwebtoken';

class Utils {
  static generateRefreshToken() {
    const refreshToken = crypto.randomUUID();
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + 24 * 60 * 60 * 7);
    return { refreshToken, expiryDate };
  }
  static checkRefreshTokenExpiry(time: Date) {
    return new Date(`${time}`).getTime() < new Date().getTime();
  }
  static async generateAccessToken(user: { id: string }) {
    const jwtToken = await Jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: '10m',
    });

    return jwtToken;
  }
}

export default Utils;
