const { getTalkers, saveTalker } = require('../utils/fsUtils');

const updateTalkers = async (req, res) => {
  const newTalkerData = req.body;
  const talkers = await getTalkers();
  const newId = talkers.length + 1;
  const newTalker = { id: newId, ...newTalkerData };
  // console.log(newTalker);
  talkers.push(newTalker);
  const updatedTalkers = JSON.stringify(talkers);
  // console.log(updatedTalkers);

  await saveTalker(updatedTalkers);
  // const talkers = await getTalkers();
  // console.log(req.headers.authorization);
  // const { name, age, talk } = req.body;
  return res.status(201).json(newTalker).end();
};

module.exports = {
  updateTalkers,
};