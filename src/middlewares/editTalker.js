const { getTalkers, saveTalker } = require('../utils/fsUtils');

const editTalker = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const talkers = await getTalkers();

    const findTalker = talkers.findIndex((talker) => talker.id === Number(id));
    
    talkers[findTalker].name = newData.name;
    talkers[findTalker].age = newData.age;
    talkers[findTalker].talk.watchedAt = newData.talk.watchedAt;
    talkers[findTalker].talk.rate = newData.talk.rate;

    await saveTalker(JSON.stringify(talkers));
    return res.status(200).json(talkers[findTalker]).end();
};

module.exports = {
    editTalker,
};