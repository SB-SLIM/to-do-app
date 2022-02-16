const Task = require("../models/Tasks");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskID}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskID}`);
  }
  res.status(StatusCodes.OK).json({ task });
};
const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
console.log(req.body);
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskID}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
