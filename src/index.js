const express = require('express');
const bodyParser = require('body-parser');

// Fs utils
const { getTalkers } = require('./utils/fsUtils');
const { filterById } = require('./utils/filterById');

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
    res.status(200).json(talkerById);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});