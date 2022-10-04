const fs = require('fs').promises;

async function getTalkers() {
  try {
    const data = await fs.readFile('src/talker.json', 'utf-8');
    const talkersData = JSON.parse(data);
    return talkersData;
  } catch (error) {
    return ({ message: error.message });
  }
}

async function saveTalker(updatedTalkers) {
  try {
    await fs.writeFile('src/talker.json', updatedTalkers);
  } catch (error) {
    return ({ message: error });
  }
}

module.exports = {
  getTalkers,
  saveTalker,
};