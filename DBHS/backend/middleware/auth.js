import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            
            return next();
        } catch (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }

    return res.status(401).json({ error: 'Not authorized, token failed' });
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authorized' });
  const role = (req.user.role || '').toString().toLowerCase();
  if (role !== 'admin') return res.status(403).json({ error: 'Admin role required' });
  next();
};

// export const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ error: 'Not authorized, no token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     return next();
//   } catch (err) {
//     console.error('Token verification error:', err);

//     if (err.name === 'TokenExpiredError') {
//       return res.status(401).json({ error: 'Token expired, please log in again' });
//     }

//     return res.status(401).json({ error: 'Not authorized, token failed' });
//   }
// };

//Authorization: [Bearer, <token>]