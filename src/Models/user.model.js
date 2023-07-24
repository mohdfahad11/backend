import prisma from '../Services/db.js'
import { hashPassword } from '../modules/auth.js'

export const findEmail = async (email, ExternalHelpers) => {
  if (!email) return false;

  const emailExists = await prisma.users.findFirst({
    where: {
      email: email
    }
  })
  return emailExists
}


export const createUser = async (user, createdByUser) => {
  const count = await prisma.users.count()
  let number = count < 10 ? '00' + count : (count < 100 ? '0' + count : count)
  let username = user.name.substring(0, 3).toLowerCase() + number
  const passwordHash = await hashPassword(user.password);

  const createdUser = await prisma.users.create({
    data: {
      name: user.name,
      email: user.email ? user.email : null,
      phone_no: user.phone_no,
      password: passwordHash,
      status: user.status,
      role_id: user.role_id,
      username: username,
      gender: user.gender,
      note: user.note,
      postcode: user.postcode,
      dob: user.dob ? new Date(user.dob) : null,
      users_usersTousers_created_by: { connect: { id: parseInt(createdByUser.id) } }
    },
  });

  return createdUser;
}

export const updateUserById = async (userId, user, createdByUser) => {
  const passwordHash = user.password ? await hashPassword(user.password) : undefined;
  const updatedUser = await prisma.users.update({
    where: { id: parseInt(userId) },
    data: {
      name: user.name,
      phone_no: user.phone_no,
      status: user.status,
      role_id: user.role_id,
      password: passwordHash,
      gender: user.gender,
      note: user.note,
      postcode: user.postcode,
      dob: user.dob ? new Date(user.dob) : undefined,
      users_usersTousers_updated_by: { connect: { id: parseInt(createdByUser.id) } }
    }
  })

  return updatedUser;
}