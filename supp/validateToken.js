import 'dotenv/config';
import jwt from "jsonwebtoken";
export default (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, username) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.username = username;
      next();
    }
  });
};
