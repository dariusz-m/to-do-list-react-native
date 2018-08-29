import config from '../config';
import configureStore from '../application-state';
import { INITIAL_STATE } from '../application-state/initial-state';
import {
    addTaskToDo, deleteTask, getTasks, updateTask,
} from './actions';

describe('Tasks sagas tests', () => {
    let store;

    beforeEach(() => {
        fetch.resetMocks();
        store = configureStore();
    });

    afterAll(() => {
        fetch.resetMocks();
    });

    it('Test get all of the tasks', (done) => {
        expect.hasAssertions();
        const tasks = [{ id: 1, task: 'Task 1' }, { id: 2, task: 'Task 2' }, { id: 3, task: 'Task 3' }];
        const expectedState = { ...INITIAL_STATE, todo: { ...INITIAL_STATE.todo, tasks: [...tasks] } };
        fetch.mockResponse(JSON.stringify({ tasks }));

        store.dispatch(getTasks());

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}tasks`);
            done();
        });
    });

    it('Test adding new task', (done) => {
        expect.hasAssertions();
        const task = 'Go running!';
        const taskId = 1;
        const expectedState = { ...INITIAL_STATE, todo: { ...INITIAL_STATE.todo, tasks: [{ id: taskId, task }] } };
        fetch.mockResponse(JSON.stringify({ taskId }));

        store.dispatch(addTaskToDo(task));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}tasks`);
            done();
        });
    });

    it('Test editing task', (done) => {
        expect.hasAssertions();
        const oldTask = 'Go running!';
        const taskId = 1;
        const newDescriptionForThisTask = 'Task was edited';
        const expectedState = {
            ...INITIAL_STATE,
            todo: { ...INITIAL_STATE.todo, tasks: [{ id: taskId, task: newDescriptionForThisTask }] },
        };
        fetch.mockResponse(JSON.stringify({ taskId }));
        store = configureStore({
            ...INITIAL_STATE,
            todo: { ...INITIAL_STATE.todo, tasks: [{ id: taskId, task: oldTask }] },
        });

        store.dispatch(updateTask(taskId, newDescriptionForThisTask));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}tasks`);
            done();
        });
    });

    it('Test task can be deleted', (done) => {
        expect.hasAssertions();
        const task = 'Go running!';
        const taskId = 1;
        const expectedState = {
            ...INITIAL_STATE,
            todo: { ...INITIAL_STATE.todo, tasks: [] },
        };
        fetch.mockResponse(JSON.stringify({ taskId }));
        store = configureStore({ ...INITIAL_STATE, todo: { ...INITIAL_STATE.todo, tasks: [{ id: taskId, task }] } });

        store.dispatch(deleteTask(taskId));

        store.subscribe(() => {
            expect(store.getState()).toEqual(expectedState);
            expect(fetch.mock.calls[0][0]).toEqual(`${config.API_URL}tasks`);
            done();
        });
    });
});
