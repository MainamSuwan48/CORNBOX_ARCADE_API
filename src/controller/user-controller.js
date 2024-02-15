
const userService = require("../services/user-service");
const catchError = require("../utilities/catch-error");
const createError = require("../utilities/create-error");

exports.updateUserById = catchError(async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.findUserById(userId);
    if (!user) {
        createError("User not found", 404);
    }
    const updatedUser = await userService.updateUserById(userId, req.body);
    res.status(200).json(updatedUser);
});

