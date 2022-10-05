const tokenNotNull = (token) => {
  if (!token) return true;
};

const tokenValid = (token) => {
  if (token.length < 16) return true;
};

const nameNotEmpty = (nome) => {
  if (!nome) return true;
};

const nameValid = (nome) => {
  if (nome.length < 3) return true;
};

const ageValid = (age) => {
  if (!age) return true;
};

const ageMinimum = (age) => {
  if (age < 18) return true;
};

const talkNotEmpty = (talk) => {
  if (!talk) return true;
};

const watchedAtNotEmpty = (watchedAt) => {
  if (!watchedAt) return true;
};

const watchedAtValid = (talk) => {
  const pattern = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (!pattern.test(talk)) return true;
};

const rateNotEmpty = (rate) => {
  if (!Number.isInteger(rate)) return true;
};

const rateValid = (rate) => {
  if (rate <= 5 && rate > 0) return true;
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  try {
    if (tokenNotNull(token)) throw new Error('Token não encontrado');
    if (tokenValid(token)) throw new Error('Token inválido');
  } catch (error) {
    return res.status(401).json({ message: `${error.message}` });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  try {
    if (nameNotEmpty(name)) throw new Error('O campo "name" é obrigatório');
    if (nameValid(name)) throw new Error('O "name" deve ter pelo menos 3 caracteres');
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  try {
    if (ageValid(age)) throw new Error('O campo "age" é obrigatório');
    if (ageMinimum(age)) throw new Error('A pessoa palestrante deve ser maior de idade');
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  try {
    if (talkNotEmpty(talk)) throw new Error('O campo "talk" é obrigatório');
    if (watchedAtNotEmpty(talk.watchedAt)) {
      throw new Error('O campo "watchedAt" é obrigatório');
    }
    if (watchedAtValid(talk.watchedAt)) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  try {
    if (rateNotEmpty(talk.rate)) throw new Error('O campo "rate" é obrigatório');
    if (!rateValid(talk.rate)) throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
  next();
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
};