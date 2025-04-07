import { v4 as uuidv4 } from 'uuid';

type Staff = {
    id: string;
    email: string;
    password: string;
};

let staff_list: Staff[] = []

const createStaff = (data: {email: string, password: string}) => {
    const new_staff = { id: uuidv4(), ...data }
    staff_list.push(new_staff);

    const { password, ...staffWithoutPassword } = new_staff;
    
    return staffWithoutPassword;
}

const listStaff = () => {
    return staff_list.map(({ password, ...rest }) => rest);
}

export const StaffService = {
    create: createStaff,
    list: listStaff,
}

