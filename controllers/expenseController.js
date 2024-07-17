const expenseModel = require("../models/expenseModel")

const createExpenseController = async(req, res) => {
    res.status(201).send({message: "Expense is Created", success: false })
}

const getExpenseController = async(req, res) => {
    res.status(201).send({message: "Expense is Getting", success: false })
}

const updateExpenseController = async(req, res) => {
    res.status(201).send({message: "Expense is Updated", success: false })
}

const deleteExpenseController = async(req, res) => {
    res.status(201).send({message: "Expense is Deleted", success: false })
}


module.exports = { createExpenseController, getExpenseController, updateExpenseController, deleteExpenseController }