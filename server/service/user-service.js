
// const UserModel = require("../models/user-model");
// const bcrypt = require('bcrypt');
// const uuid = require('uuid');
// const mailService = require('./mail-service');
// const tokenService = require('./token-service');
// const UserDto = require('../dtos/user-dto');

// class UserService {
//     async registration(email, password) {
//         const candidate = await UserModel.findOne({ email });
//         if (candidate) {
//             throw new Error(`Користувач з поштовим адресом ${email} вже існує`);
//         }

//         const hashPassword = await bcrypt.hash(password, saltRounds);

//         const activationLink = uuid.v4();

//         const user = await UserModel.create({ email, password: hashPassword, activationLink });
//         await mailService.mailService();

//         const userDto = new UserDto(user);
//         const tokens = tokenService.generateToken({ ...userDto });
//         await tokenService.saveToken(userDto.id, tokens.refreshToken);
//         return { ...tokens, user: userDto };
//     }
// }

// module.exports = new UserService();

const UserModel = "../models/user-model";
const bcrypt = 'bcrypt';
const uuid = 'uuid';
const mailService = './mail-service';
const tokenService = './token-service';
const UserDto = '../dtos/user-dto';

const saltRounds = 10; // Define the number of salt rounds for bcrypt

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`Користувач з поштовим адресом ${email} вже існує`);
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const activationLink = uuid.v4(); // Generate a unique activation link

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink); // Corrected method call

        const userDto = new UserDto(user); // Create a new UserDto
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }; // Return the tokens and user data
    }
}

module.exports = new UserService();

