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

exports.updateAddressByUserId = async (userId, addressId, data) => {
  return await prisma.address.update({
    where: {
      id: addressId,
      userId: userId,
    },
    data,
  });
};

exports.findAddressByUserId = async (userId) => {
  return await prisma.address.findMany({
    where: {
      userId: userId,
    },
  });
};
