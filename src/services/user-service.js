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
  userId = parseInt(id);
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

exports.updateUserById = async (id, data) => {
  userId = parseInt(id);
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

exports.createAddressByUserId = async (userId, address) => {
  userId = parseInt(userId);
  return await prisma.userAddress.create({
    data: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      postalCode: address.postalCode,
      userId: userId, // use the passed userId here
    },
  });
};

exports.updateAddressById = async (addressId, data) => {
  id = parseInt(addressId);
  return await prisma.userAddress.update({
    where: {
      id: id,
    },
    data: {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      postalCode: data.postalCode,
    },
  });
};

exports.findAddressByUserId = async (userId) => {
  userId = parseInt(userId);
  return await prisma.userAddress.findMany({
    where: {
      userId: userId,
    },
  });
};

exports.findAddressById = async (addressId) => {
  addressId = parseInt(addressId);
  return await prisma.userAddress.findUnique({
    where: {
      id: addressId,
    },
  });
};

const findAddressById = async (addressId) => {
  addressId = parseInt(addressId);
  return await prisma.userAddress.findUnique({
    where: {
      id: addressId,
    },
  });
};

findAddressById(5).then((address) => {
  console.log(address);
});
