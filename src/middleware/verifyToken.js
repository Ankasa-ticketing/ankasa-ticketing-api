const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.get("authorization");
  const token = authHeader.split(" ")[1];

  console.log(authHeader);
  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.id = decoded.id;

    next();
  });
};

// exports.isAdmin = (req, res, next) => {
//   const token = req.headers["authorization"].split(" ")[1];

//   jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     req.email = decoded.email;

//     if (decoded.role !== "admin") return res.sendStatus(403);
//     next();
//   });
// };

exports.isUser = (req, res, next) => {
  const token = req.get("authorization").split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.id = decoded.id;

    if (decoded.role !== "user") return res.sendStatus(403);
    next();
  });
};
