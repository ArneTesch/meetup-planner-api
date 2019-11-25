const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  // Bearer [token]
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    docedToken = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  if (decodedToken.isAdmin) {
    req.userId = decodedToken.userId;
  } else {
    req.vistorId = docedToken.vistorId;
  }

  next();
};
