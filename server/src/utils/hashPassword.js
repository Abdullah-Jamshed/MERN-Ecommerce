import bycrypt from "bcryptjs";


const hashPassword = async (password) => {
  return await bycrypt.hash(password, 10);
};

export default hashPassword;
