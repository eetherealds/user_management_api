const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false,
      message: 'Email is required' 
    });
  }
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid email format. Please use format: user@example.com' 
    });
  }
  
  next();
};

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ 
      success: false,
      message: 'Password is required' 
    });
  }
  
  if (password.length < 8) {
    return res.status(400).json({ 
      success: false,
      message: 'Password must be at least 8 characters long' 
    });
  }
  
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      success: false,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)' 
    });
  }
  
  next();
};

export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];
  
  if (!username) {
    errors.push('Username is required');
  } else if (!usernameRegex.test(username)) {
    errors.push('Username must be 3-30 characters and can only contain letters, numbers, and underscores');
  }
  
  if (!email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
  }
  
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!passwordRegex.test(password)) {
    errors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed',
      errors 
    });
  }
  
  next();
};

export const validateProfileUpdate = (req, res, next) => {
  const { username, email } = req.body;
  const errors = [];
  
  if (username && !usernameRegex.test(username)) {
    errors.push('Username must be 3-30 characters and can only contain letters, numbers, and underscores');
  }
  
  if (email && !emailRegex.test(email)) {
    errors.push('Invalid email format');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false,
      message: 'Validation failed',
      errors 
    });
  }
  
  next();
};
