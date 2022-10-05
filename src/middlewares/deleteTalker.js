const { getTalkers, saveTalker } = require('../utils/fsUtils');

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const findTalkerToDelete = talkers.filter((talker) => talker.id !== Number(id));
    await saveTalker(JSON.stringify(findTalkerToDelete));
    // console.log(findTalkerToDelete);
    return res.status(204).json().end();
};

module.exports = {
    deleteTalker,
};