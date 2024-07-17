const categoryModel = require("../models/categoryModel")

const createCategoryController = async(req, res) => {
    res.status(201).send({message: "Categories is Created", success: false })
}

const getCategoriesController = async(req, res) => {
    res.status(201).send({message: "Categories is Getting", success: false })
}

const updateCategoryController = async(req, res) => {
    res.status(201).send({message: "Categories is Updated", success: false })
}

const deleteCategoryController = async(req, res) => {
    res.status(201).send({message: "Categories is Deleted", success: false })
}


module.exports = { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController }