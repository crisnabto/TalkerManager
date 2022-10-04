const filterById = async (talkers, idToFind) => {
  const filtered = talkers.find((talker) => talker.id === idToFind);
  return filtered;
};

module.exports = {
  filterById,
};
