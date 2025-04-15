import { StaffService } from "../services/staff.service.js";
import { Request, Response } from 'express';

const listStaffController = async (
    request: Request, response: Response
) => {
    try {
        const staff_list = await StaffService.list();
        response.status(200).json(staff_list);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

const createStaffController = async (
    request: Request, response: Response
) => {
    try {
        if(!request.body) throw new Error('Request body is empty');
        const { email, password } = request.body;

        if(!email || !password) {
            return response.status(400).json({ error: 'Email and password are required' });
        }
        const staff = await StaffService.create({ email, password });
        response.status(201).json(staff);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

export const StaffController = {
    create: createStaffController,
    list: listStaffController
}
