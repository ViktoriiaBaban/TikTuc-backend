const UserDto = require("../dtos/user");
const tokenService = require("../service/token/token-service");

module.exports = async function generateTokens(user) {
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
        ...tokens,
        user: userDto
    }
}