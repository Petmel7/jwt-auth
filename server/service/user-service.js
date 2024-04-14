
const UserModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

const saltRounds = 3;

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Користувач з поштовим адресом ${email} вже існує`);
        }

        const pass = password.toString();
        const hashPassword = await bcrypt.hash(pass, saltRounds);

        const activationLink = uuid.v4();

        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest('Не коректне посилання активації');
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();