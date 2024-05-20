const fsPromises = require('fs').promises
const path = require('path')

const workDB = {
    work: require('../database/work.json'),
    setWork: function (data) { this.work = data }
}

const getWork = (req, res) => {
    res.send(workDB.work)
}

const createWork = async (req, res) => {
    const { question, choice1, choice2, choice3, correctAnswer } = req.body

    if (!question || !choice1 || !choice2 || !choice3 || !correctAnswer) return res.status(400).json({ "error": "question, choice1, choice2, choice3, correctAnswer are required!" })

    const newForm = {
        "question": question,
        "choice1": choice1,
        "choice2": choice2,
        "choice3": choice3,
        "correctAns": correctAnswer
    }


    workDB.setWork([...workDB.work, newForm])
    await fsPromises.writeFile(path.join(__dirname, '..', 'database', 'work.json'), JSON.stringify(workDB.work))
    res.sendStatus(200)
}

const resetWork = async(req, res) => {

    workDB.setWork([])

    await fsPromises.writeFile(path.join(__dirname, '..', 'database', 'work.json'), JSON.stringify(workDB.work))
    res.sendStatus(200)
}



module.exports = {
    getWork,
    createWork,
    resetWork
}

