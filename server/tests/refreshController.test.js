const refreshController = require('../controllers/user-controller');

//Тест наявності refreshToken в запиті:

// describe('refreshController', () => {
//     it('should return new tokens and user data when refreshToken is provided', async () => {
//         // Arrange
//         const req = {
//             cookies: {
//                 refreshToken: 'validRefreshToken'
//             }
//         };
//         const res = {
//             json: jest.fn()
//         };
//         const next = jest.fn();

//         // Act
//         await refreshController.refresh(req, res, next);

//         // Assert
//         expect(res.json).toHaveBeenCalled();
//         expect(next).not.toHaveBeenCalled();
//     });
// });

// it('should return new tokens and user data when refreshToken is provided', async () => {
//     // Arrange
//     const req = {
//         cookies: {
//             refreshToken: 'validRefreshToken'
//         }
//     };
//     const res = {
//         json: jest.fn()
//     };
//     const next = jest.fn();

//     // Act
//     await refreshController.refresh(req, res, next);

//     // Assert
//     expect(res.json).toHaveBeenCalled();
//     expect(next).not.toHaveBeenCalled();
// }, 20000); // Таймаут встановлено на 10 секунд

// Початок вашого файлу тестів
jest.setTimeout(20000); // Встановлення таймауту на 20 секунд

// Ваш тест
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
});


