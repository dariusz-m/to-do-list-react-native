export const GET_TASKS = 'GET_TASKS';
export const TASKS_HAVE_BEEN_LOADED = 'TASKS_HAVE_BEEN_LOADED';
export const ADD_TASK_TO_DO = 'ADD_TASK_TO_DO';
export const CHANGE_THE_DESCRIPTION_OF_THE_NEW_TASK = 'CHANGE_THE_DESCRIPTION_OF_THE_NEW_TASK';
export const TASK_HAS_BEEN_ADDED = 'TASK_HAS_BEEN_ADDED';
export const DELETE_TASK = 'DELETE_TASK';
export const TASK_HAS_BEEN_DELETED = 'TASK_HAS_BEEN_DELETED';
export const TASK_HAS_BEEN_UPDATED = 'TASK_HAS_BEEN_UPDATED';
export const UPDATE_TASK = 'UPDATE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const CANCEL_EDITING_TASK = 'CANCEL_EDITING_TASK';
export const CHANGE_EDITING_TASK = 'CHANGE_EDITING_TASK';
export const TASKS_REQUEST_FAILED = 'TASKS_REQUEST_FAILED';

/**
 * Get all of the tasks.
 * @returns {{type: string}}
 */
export const getTasks = () => ({
    type: GET_TASKS,
});

/**
 * Tasks request failed.
 * @param {string} errorMessage - Error message
 * @returns {{type: string, payload: {errorMessage: string}}}
 */
export const tasksRequestFailed = errorMessage => ({
    type: TASKS_REQUEST_FAILED,
    payload: {
        errorMessage,
    },
});

/**
 * Tasks have been loaded
 * @param {Array<string>} tasks - Tasks
 * @returns {{type: string, payload: {tasks: Array<string>}}}
 */
export const tasksHaveBeenLoaded = tasks => ({
    type: TASKS_HAVE_BEEN_LOADED,
    payload: {
        tasks,
    },
});


/**
 * Add new task to do
 * @param {string} task - New task
 * @returns {{type: string, payload: {tasks: string}}}
 */
export const addTaskToDo = task => ({
    type: ADD_TASK_TO_DO,
    payload: {
        task,
    },
});


/**
 * Change the description of the new task.
 * @param {string} newTaskDesc - New description of the task
 * @returns {{type: string, payload: {taskId: number, task: string}}}
 */
export const changeTheDescriptionOfTheNewTask = newTaskDesc => ({
    type: CHANGE_THE_DESCRIPTION_OF_THE_NEW_TASK,
    payload: {
        newTaskDesc,
    },
});

/**
 * Task has been added
 * @param {number} taskId - Task id
 * @param {string} task - Task to do
 * @returns {{type: string, payload: {taskId: number, task: string}}}
 */
export const taskHasBeenAdded = (taskId, task) => ({
    type: TASK_HAS_BEEN_ADDED,
    payload: {
        taskId,
        task,
    },
});


/**
 * Delete task
 * @param {number} taskId - Task id
 * @returns {{type: string, payload: {taskId: number}}}
 */
export const deleteTask = taskId => ({
    type: DELETE_TASK,
    payload: {
        taskId,
    },
});

/**
 * Task has been deleted
 * @param {number} taskId - Task id
 * @returns {{type: string, payload: {taskId: number}}}
 */
export const taskHasBeenDeleted = taskId => ({
    type: TASK_HAS_BEEN_DELETED,
    payload: {
        taskId,
    },
});

/**
 * Update task
 * @param {number} taskId - Task id
 * @param {string} newTaskDesc - New task description
 * @returns {{type: string, payload: {taskId: number, newTaskDesc: string}}}
 */
export const updateTask = (taskId, newTaskDesc) => ({
    type: UPDATE_TASK,
    payload: {
        taskId,
        newTaskDesc,
    },
});

/**
 * Task has been updated.
 * @param {number} taskId - Task id
 * @param {string} newTaskDesc - New task description
 * @returns {{type: string, payload: {taskId: number, newTaskDesc: string}}}
 */
export const taskHasBeenUpdated = (taskId, newTaskDesc) => ({
    type: TASK_HAS_BEEN_UPDATED,
    payload: {
        taskId,
        newTaskDesc,
    },
});

/**
 * Edit task
 * @param {number} taskId - Task id
 * @returns {{type: string, payload: {taskId: number}}}
 */
export const editTask = taskId => ({
    type: EDIT_TASK,
    payload: {
        taskId,
    },
});

/**
 * Cancel process of editing task
 * @returns {{type: string}}
 */
export const cancelEditingTask = () => ({
    type: CANCEL_EDITING_TASK,
});

/**
 * Change editing task
 * @param {string} newTaskDesc - New task description
 * @returns {{type: string, payload: {newTaskDesc: string}}}
 */
export const changeEditingTask = newTaskDesc => ({
    type: CHANGE_EDITING_TASK,
    payload: {
        newTaskDesc,
    },
});
