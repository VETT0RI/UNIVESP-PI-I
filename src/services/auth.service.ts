import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { StaffService } from './staff.service.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SALT_ROUNDS = 10

export const AuthService = {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
  },

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  },

  generateToken(payload: { id: string; email: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
  },

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      throw new Error('Invalid token')
    }
  },
}
