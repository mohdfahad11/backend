import prisma from '../Services/db.js'
import jwt from "jsonwebtoken";
import { createUser, updateUserById } from '../Models/user.model.js'
import { comparePasswords, createJWT } from '../modules/auth.js';

export const createNewUser = async (req, res) => {
  const createdUser = await createUser(req.body, req.user);
  return res.json({ user: createdUser });
};

export const updateUser = async (req, res) => {
  const updatedUser = await updateUserById(req.params.id, req.body, req.user);
  return res.json({ user: updatedUser, message: "User is updated successfully!" })
}

export const login = async (req, res) => {
  if (!req.body.username || req.body.username == '') {
    res.status(400).send({ message: 'Please provide valid username!' });
    return;
  }
  const user = await prisma.users.findUnique({
    where: { username: req.body.username ?? undefined },
  });
  if (user == null) {
    res.status(401).send({ message: 'Invalid username!' });
    return;
  }
  if (!user.password || user.password == undefined) {
    res.status(401).send({ message: 'Provide password!' })
    return;
  }
  if (user.status == 0) {
    res.status(400).send({ message: 'User is inactive! Contact admin!' })
    return;
  }
  const isValidPassword = await comparePasswords(req.body.password, user.password);

  if (!isValidPassword) {
    res.status(401).send({ message: 'Invalid password!' });
    return;
  }

  const token = createJWT(user);
  const { id, employer_id, role_id, name, phone_no, email } = user

  res.json({
    token, user: {
      id, employer_id, role_id, name, phone_no, email
    }
  });
}

export const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: 'You have been Logged Out' });
    } else {
      res.send({ msg: 'Error' });
    }
  });
}

export const getMyProfile = async (req, res) => {
  const user = req.user;
  const { id, employer_id, role_id, name, phone_no, email } = user
  res.json({
    user: {
      id, employer_id, role_id, name, phone_no, email
    }
  });
}

export const getUserList = async (req, res) => {
  const perPage = req.query.per_page ?? 10
  const page = req.query.page ?? 1

  const whereCondition = {
    role_id: req.query.role ? parseInt(req.query.role) : undefined,
    name: {
      contains: req.query.name
    },
    phone_no: {
      contains: req.query.phone_no
    },
    email: {
      contains: req.query.email
    }
  };

  const users = await prisma.users.findMany({
    skip: parseInt(perPage) * (parseInt(page) - 1),
    take: parseInt(perPage),
    where: { ...whereCondition },
    select: {
      id: true,
      name: true,
      role_id: true,
      username: true,
      email: true,
      phone_no: true,
      status: true,
    }
  })
  const totalUsers = await prisma.users.count({
    where: { ...whereCondition }
  })
  return res.json({ users: users, total: totalUsers })
}

export const getUserRoles = async (req, res) => {
  const roles = await prisma.roles.findMany()
  return res.json({ user_roles: roles })
}

export const showUser = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })

  return res.json({ user })
}