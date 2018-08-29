import { INITIAL_STATE } from '../application-state/initial-state';
import {
    TASKS_HAVE_BEEN_LOADED,
    TASK_HAS_BEEN_ADDED,
    TASK_HAS_BEEN_DELETED,
    EDIT_TASK,
    TASK_HAS_BEEN_UPDATED,
    CANCEL_EDITING_TASK,
    CHANGE_EDITING_TASK,
    CHANGE_THE_DESCRIPTION_OF_THE_NEW_TASK,
    TASKS_REQUEST_FAILED,
} from './actions';

/**
 * Tasks reducer
 * @param {Object} state - To-do sate
 * @param {{type: string, payload: Object}} action - Action
 * @returns {Object}
 */
export default (state = INITIAL_STATE.todo, action) => {
    switch (action.type) {
        case TASKS_HAVE_BEEN_LOADED:
            return { ...state, tasks: action.payload.tasks };
        case TASKS_REQUEST_FAILED:
            return { ...state, errorMessage: action.payload.errorMessage };
        case CHANGE_THE_DESCRIPTION_OF_THE_NEW_TASK:
            return { ...state, newTask: action.payload.newTaskDesc };
        case TASK_HAS_BEEN_ADDED:
            return {
                ...state,
                newTask: INITIAL_STATE.todo.newTask,
                tasks: [...state.tasks, { id: action.payload.taskId, task: action.payload.task }],
            };
        case TASK_HAS_BEEN_DELETED:
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload.taskId) };

        case EDIT_TASK:
            return { ...state, editingTask: state.tasks.find(task => task.id === action.payload.taskId) };
        case TASK_HAS_BEEN_UPDATED:
            return {
                ...state,
                editingTask: INITIAL_STATE.todo.editingTask,
                tasks: state.tasks.map(
                    task => (task.id === action.payload.taskId ? { ...task, task: action.payload.newTaskDesc } : task),
                ),
            };
        case CANCEL_EDITING_TASK:
            return { ...state, editingTask: INITIAL_STATE.todo.editingTask };
        case CHANGE_EDITING_TASK:
            return { ...state, editingTask: { ...state.editingTask, task: action.payload.newTaskDesc } };

        default:
            return state;
    }
};
