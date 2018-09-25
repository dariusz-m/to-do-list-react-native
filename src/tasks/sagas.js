import { call, put } from 'redux-saga/effects';

import config from '../config';
import {
    taskHasBeenAdded, taskHasBeenDeleted, taskHasBeenUpdated, tasksHaveBeenLoaded, tasksRequestFailed,
} from './actions';
import { getAccessToken } from '../authentication/access-token';


const DEFAULT_ERROR_MESSAGE = 'Something went wrong, try again.';

/**
 * Get all of the tasks.
 */
export function* getTasks() {
    try {
        const accessToken = yield call(getAccessToken);
        const response = yield call(
            fetch,
            `${config.API_URL}tasks`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        const data = yield call([response, response.json]);
        if (response.status === 200) {
            yield put(tasksHaveBeenLoaded(data.tasks));
        } else {
            yield put(tasksRequestFailed(data.errorMessage));
        }
    } catch (error) {
        yield put(tasksRequestFailed(DEFAULT_ERROR_MESSAGE));
    }
}

/**
 * Add task to do.
 * @param {{type: string, payload: {task: string}}} action - Action
 */
export function* addTaskToDo(action) {
    try {
        const accessToken = yield call(getAccessToken);
        const response = yield call(
            fetch,
            `${config.API_URL}tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ task: action.payload.task }),
            },
        );
        const data = yield call([response, response.json]);
        if (response.status === 200) {
            yield put(taskHasBeenAdded(data.taskId, action.payload.task));
        } else {
            yield put(tasksRequestFailed(data.errorMessage));
        }
    } catch (error) {
        yield put(tasksRequestFailed(DEFAULT_ERROR_MESSAGE));
    }
}

/**
 * Delete task
 * @param {{type: string, payload: {taskId: number}}} action - Action
 */
export function* deleteTask(action) {
    try {
        const accessToken = yield call(getAccessToken);
        const response = yield call(
            fetch,
            `${config.API_URL}tasks`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ taskId: action.payload.taskId }),
            },
        );
        if (response.status === 200) {
            yield put(taskHasBeenDeleted(action.payload.taskId));
        } else {
            const data = yield call([response, response.json]);
            yield put(tasksRequestFailed(data.errorMessage));
        }
    } catch (error) {
        yield put(tasksRequestFailed(DEFAULT_ERROR_MESSAGE));
    }
}


/**
 * Update task
 * @param {{type: string, payload: {taskId: number, newTaskDesc: string}}} action - Action
 */
export function* updateTask(action) {
    try {
        const accessToken = yield call(getAccessToken);
        const response = yield call(
            fetch,
            `${config.API_URL}tasks`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ taskId: action.payload.taskId, newTaskDesc: action.payload.newTaskDesc }),
            },
        );
        if (response.status === 200) {
            yield put(taskHasBeenUpdated(action.payload.taskId, action.payload.newTaskDesc));
        } else {
            const data = yield call([response, response.json]);
            yield put(tasksRequestFailed(data.errorMessage));
        }
    } catch (error) {
        yield put(tasksRequestFailed(DEFAULT_ERROR_MESSAGE));
    }
}
