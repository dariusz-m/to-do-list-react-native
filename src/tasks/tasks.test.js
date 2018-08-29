import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import { Tasks } from './tasks';
import { changeInputValue, clickButton, expectedCallbackWasCalledOnceWith } from './support-test';

describe('Tasks tests', () => {
    let actions;

    beforeEach(() => {
        actions = {
            getTasks: jest.fn(),
            addTaskToDo: jest.fn(),
            deleteTask: jest.fn(),
            editTask: jest.fn(),
            updateTask: jest.fn(),
            cancelEditingTask: jest.fn(),
            changeEditingTask: jest.fn(),
            changeTheDescriptionOfTheNewTask: jest.fn(),
        };
    });

    afterAll(() => {
        fetch.resetMocks();
    });

    it('Tasks component renders correctly', () => {
        const tasks = [{ id: 1, task: 'Just do it!' }, { id: 2, task: 'Go running!' }];
        const tree = renderer.create(<Tasks tasks={tasks} newTask={''} actions={actions}/>).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Load tasks when component just have mounted', () => {
        ReactTestUtils.renderIntoDocument(
            <Tasks actions={actions} newTask={''} tasks={[]}/>,
        );

        expectedCallbackWasCalledOnceWith(actions.getTasks);
    });

    it('After clicking the button to add new task, callback(addNewTask) is called out once', () => {
        const newTask = 'New task to do!';
        const component = ReactTestUtils.renderIntoDocument(
            <Tasks actions={actions} newTask={newTask} tasks={[]}/>,
        );

        clickButton(component, 'add-new-task-button');

        expectedCallbackWasCalledOnceWith(actions.addTaskToDo, newTask);
    });

    it('Input value is properly updated(onChange value) for new task', () => {
        const newTask = 'Update input value';
        const component = ReactTestUtils.renderIntoDocument(
            <Tasks actions={actions} newTask={''} tasks={[]}/>,
        );

        changeInputValue(component, 'input-new-task', newTask);

        expectedCallbackWasCalledOnceWith(actions.changeTheDescriptionOfTheNewTask, newTask);
    });
});
