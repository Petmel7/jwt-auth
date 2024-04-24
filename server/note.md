refreshController.test.js

const refreshController = require('../controllers/user-controller');

describe('refreshController', () => {
    it('should return new tokens and user data when refreshToken is provided', async () => {
        // Arrange
        const req = {
            cookies: {
                refreshToken: 'validRefreshToken'
            }
        };
        const res = {
            json: jest.fn()
        };
        const next = jest.fn();

        // Act
        await refreshController.refresh(req, res, next);

        // Assert
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    }, 20000);
});