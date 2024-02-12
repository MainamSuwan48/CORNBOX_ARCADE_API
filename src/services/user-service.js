const prisma = require("../models/prisma");

exports.createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

exports.findUserByEmailOrUsername = async (usernameOrEmail) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: usernameOrEmail,
        },
        {
          username: usernameOrEmail,
        },
      ],
    },
  });
};

exports.findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

exports.updateUserById = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};
