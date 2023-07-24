import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const bearer = req.headers.authorization;
  
  if (!bearer) {
    res.status(401);
    res.json({ message: 'Unauthorized' })
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: 'Unauthorized' })
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: 'Unauthorized' })
    return;
  }
};

export default authenticateUser