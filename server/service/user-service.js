
const UserModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

const saltRounds = 3;
console.log(typeof saltRounds);

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw new Error(`Користувач з поштовим адресом ${email} вже існує`);
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();



// const UserModel = require("../models/user-model");
// const bcrypt = require('bcrypt');
// const uuid = require('uuid');
// const mailService = require('./mail-service');
// const tokenService = require('./token-service');
// const UserDto = require('../dtos/user-dto');

// const saltRounds = 3;
// console.log(typeof saltRounds);

// class UserService {
//     async registration(email, password) {
//         const candidate = await UserModel.findOne({ email });
//         if (candidate) {
//             throw new Error(`Користувач з поштовим адресом ${email} вже існує`);
//         }

//         const user = await UserModel.create({ email, password: password });
//         await mailService.sendActivationMail(email);

//         const userDto = new UserDto(user);
//         const tokens = tokenService.generateToken({ ...userDto });
//         await tokenService.saveToken(userDto.id, tokens.refreshToken);

//         return { ...tokens, user: userDto };
//     }
// }

// module.exports = new UserService();

