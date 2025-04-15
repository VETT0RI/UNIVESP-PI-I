import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/prisma/index.js';

type Staff = {
    id: string;
    email: string;
    password: string;
};

const createStaff = async (data: {email: string, password: string}) => {
    const new_staff = await prisma.staffs.create({
        data: {
            id: uuidv4(),
            email: data.email,
            password: await bcrypt.hash(data.password, 10)
        }
    });

    const { password, ...staffWithoutPassword } = new_staff;
    
    return staffWithoutPassword;
}

const listStaff = async () => {
    const staff_list = await prisma.staffs.findMany({
        select: {
            id: true,
            email: true
        }
    });

    return staff_list;
}

const findByEmail = async (email: string) => {
    const staff = await prisma.staffs.findUnique({
        where: {
            email
        }
    });

    return staff;
}

export const StaffService = {
  create: createStaff,
  list: listStaff,
  findByEmail,
}

