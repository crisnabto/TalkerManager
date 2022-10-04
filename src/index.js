const express = require('express');
const bodyParser = require('body-parser');

// Fs utils
const { getTalkers } = require('./utils/fsUtils');

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

app.listen(PORT, () => {
  console.log('Online');
});