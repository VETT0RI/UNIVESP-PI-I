import { Request, Response } from 'express';
import { StaffService } from '../services/staff.service.js';
import { AuthService } from '../services/auth.service.js';

export const AuthController = {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            const staff = await StaffService.findByEmail(email);
            if (!staff) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const isValidPassword = await AuthService.comparePasswords(password, staff.password);
            if (!isValidPassword) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const { password: _, ...staffWithoutPassword } = staff;
            const token = AuthService.generateToken({
                id: staff.id,
                email: staff.email
            });

            res.json({
                staff: staffWithoutPassword,
                token
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    },

    async me(req: Request, res: Response) {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Not authenticated' });
                return;
            }

            const staff = await StaffService.findByEmail(req.user.email);
            if (!staff) {
                res.status(404).json({ message: 'Staff not found' });
                return;
            }

            const { password, ...staffWithoutPassword } = staff;
            res.json(staffWithoutPassword);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Internal server error' });
        }
    }
}; 