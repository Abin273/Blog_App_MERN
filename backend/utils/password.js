import bcrypt from "bcrypt";

export const generateHastedPassword = async (password) => {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return password
};

export const checkPasswordIsCorrect = async (password, hashedPassword) => {
    return  await bcrypt.compare(password, hashedPassword);

};