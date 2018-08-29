import { takeEvery } from 'redux-saga/effects';

import {
    GET_TASKS, ADD_TASK_TO_DO, DELETE_TASK, UPDATE_TASK,
} from '../tasks/actions';
import {
    getTasks, addTaskToDo, deleteTask, updateTask,
} from '../tasks/sagas';
import { LOGIN } from '../authentication/actions';
import { login } from '../authentication/sagas';

/**
 * Root saga
 * */
export default function* rootSaga() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(GET_TASKS, getTasks);
    yield takeEvery(ADD_TASK_TO_DO, addTaskToDo);
    yield takeEvery(DELETE_TASK, deleteTask);
    yield takeEvery(UPDATE_TASK, updateTask);
}
