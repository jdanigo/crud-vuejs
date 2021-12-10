import jwt from 'jsonwebtoken';
import appConfig from "../config/env";

const tokenMiddleware = {};

tokenMiddleware.verify = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
      jwt.verify(token, appConfig.jwt_key, (err, decoded) => {
        if (err) {
          return res.status(401).json({ mensaje: 'Token inválida' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).json({mensaje: 'Se necesita el token para esta petición.'});
    }
}

export default tokenMiddleware;
