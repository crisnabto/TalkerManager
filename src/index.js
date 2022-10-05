const express = require('express');
const bodyParser = require('body-parser');

// Fs utils
const { getTalkers } = require('./utils/fsUtils');
const { filterById } = require('./utils/filterById');
const { generateToken } = require('./utils/generateToken');
const { emailValidation, passwordValidation } = require('./middlewares/loginValidation');
const { tokenValidation, 
  nameValidation, 
  ageValidation, 
  talkValidation, 
  rateValidation } = require('./middlewares/newTalkerValidation');
const { updateTalkers } = require('./middlewares/updateTalkers');
const { editTalker } = require('./middlewares/editTalker');
const { deleteTalker } = require('./middlewares/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// GET /talker retorna todas as pessoas cadastradas
app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  return res.status(200).json(talkers);
});

// GET /talker/:id retorna pesquisa por id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talkerById = await filterById(talkers, Number(id));
  if (talkerById) {
    return res.status(200).json(talkerById);
  } 
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// POST /login cadastra novo e-mail e senha e retorna token
app.post('/login', emailValidation, passwordValidation, async (req, res) => {
  const token = await generateToken();
  // console.log(token);
  // console.log(token);
  return res.status(200).json({ token: `${token}` });
});

// POST /talker cadastra nova pessoa palestrante
app.post('/talker',
tokenValidation,
nameValidation, 
ageValidation, 
talkValidation,
rateValidation,
updateTalkers,
async (_req, _res) => {
});

app.put('/talker/:id',
nameValidation,
ageValidation,
talkValidation,
tokenValidation,
rateValidation,
editTalker,
async (_req, _res) => {
});

app.delete('/talker/:id',
tokenValidation,
deleteTalker,
async (_req, _res) => {
});

app.listen(PORT, () => {
  console.log('Online');
});
