import 'dotenv/config';
import jwt from "jsonwebtoken";
export default (req, res, next) => {
  const { token } = req.body;
  console.log('token vt', token);
  jwt.verify(token, process.env.JWT_SECRET, (err, username) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      console.log('valid', token)
      req.username = username;
      next();
    }
  });
};
