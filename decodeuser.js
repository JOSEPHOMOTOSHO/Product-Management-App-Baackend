const jwt = require('jsonwebtoken')

exports.decodeUser = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.body.token;

    if (!token) {
      return res
        .status(403)
        .json({ error: 'A token is required for authentication' });
    }

    if (token) {
      const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
      if (new Date().getTime() < decodeUser.exp) {
        return res
          .status(401)
          .json({ error: 'invalid token' });
      }
      req.user = decodeUser.id;
      req.email = decodeUser.email;
    }
    console.log(req.user, req.email)
    return next();
  } catch (e) {
    console.log(e.message)
    return res.status(500).send({ error: e });
  }
};

