import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

export const isOwner = (req, res, next) => {
  const userId = req.params.id;
  
  if (!userId) {
    return res.status(400).json({ 
      success: false,
      message: 'User ID is required' 
    });
  }
  
  if (parseInt(userId) !== parseInt(req.user.id)) {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. You can only edit your own profile.' 
    });
  }
  
  next();
};
