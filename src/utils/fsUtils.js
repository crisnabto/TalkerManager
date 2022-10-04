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

module.exports = {
  getTalkers,
};