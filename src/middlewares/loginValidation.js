const emailPattern = (email) => {
  const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (pattern.test(email)) {
    return true;
  }
  return false;
};

const emailNotEmpty = (email) => {
  if (!email) {
    return true;
  }
  return false;
};

const passwordPattern = (password) => {
  if (password.length < 6) {
    return true;
  }
  return false;
};

const passwordNotEmpty = (password) => {
  if (!password) {
    return true;
  }
  return false;
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  try {
    if (emailNotEmpty(email)) throw new Error('O campo "email" é obrigatório');
    if (!emailPattern(email)) throw new Error('O "email" deve ter o formato "email@email.com"');
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  try {
    if (passwordNotEmpty(password)) throw new Error('O campo "password" é obrigatório');
    if (passwordPattern(password)) throw new Error('O "password" deve ter pelo menos 6 caracteres');
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};
