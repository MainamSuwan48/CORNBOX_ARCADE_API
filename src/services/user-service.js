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
  const newId = parseInt(id);
  return await prisma.user.findUnique({
    where: {
      id: newId,
    },
  });
};

exports.updateUserById = async (id, data) => {
  const newId = parseInt(id);
  return await prisma.user.update({
    where: {
      id: newId,
    },
    data,
  });
};

exports.createAddressByUserId = async (userId, address) => {
  return await prisma.address.create({
    data: {
      ...address,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
