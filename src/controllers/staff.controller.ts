import { StaffService } from "../services/staff.service.js";
import { Request, Response } from 'express';

const listStaffController = (
    request: Request, response: Response
) => {
    response.status(200).json(StaffService.list());
}

const createStaffController = (
    request: Request, response: Response
) => {
    const staff = request.body;
    const res = StaffService.create(staff);
    response.status(201).json(res);
}

export const StaffController = {
    create: createStaffController,
    list: listStaffController
}
