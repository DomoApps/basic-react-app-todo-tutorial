import { AppDBClient } from '@domoinc/toolkit';

const TaskTableClient = new AppDBClient.DocumentsClient('TasksCollection');

const fetchTasks = async (
    status,
) => {
    const queryParams = {};

    if (status !== undefined) {
        queryParams['content.status'] = { $eq: status };
    }
    const response = await TaskTableClient.get(queryParams);
    const data = Array.isArray(response.data)
        ? response.data.map((document) => ({
            ...document.content,
            id: document.id,
        }))
        : [{ ...data.content }];;

    return data
};

const createTask = async (task) => {
    const response = await TaskTableClient.create(task);
    return {id: response.data.id, ...response.data.content};
};

const deleteTasks = async (tasksIds) =>
    await TaskTableClient.delete(tasksIds);

const updateTask = async (id, content) => {
    const response = await TaskTableClient.update({ id, content });
    return response.data.content;
};

export const TaskService = {
    fetchTasks,
    createTask,
    deleteTasks,
    updateTask,
};
