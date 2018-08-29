import React from 'react';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import { Task } from './task';
import { clickButton, expectedCallbackWasCalledOnceWith } from './support-test';

describe('Task tests', () => {
    it('Task component renders correctly without editing mode', () => {
        const task = { id: 6, task: 'Go running!' };
        const isEditing = false;
        const tree = renderer.create(
            <Task
                task={task}
                editTask={jest.fn()}
                cancelEditingTask={jest.fn()}
                deleteTask={jest.fn()}
                changeEditingTask={jest.fn()}
                updateTask={jest.fn()}
                isEditing={isEditing}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Task component renders correctly with editing mode', () => {
        const task = { id: 6, task: 'Go running!' };
        const isEditing = true;
        const tree = renderer.create(
            <Task
                task={task}
                editTask={jest.fn()}
                cancelEditingTask={jest.fn()}
                deleteTask={jest.fn()}
                changeEditingTask={jest.fn()}
                updateTask={jest.fn()}
                isEditing={isEditing}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('After clicking the button to delete a task, callback(deleteTask) is called out once', () => {
        const task = { id: 3, task: 'Go running!' };
        const deleteTask = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <Task
                task={task}
                editTask={jest.fn()}
                cancelEditingTask={jest.fn()}
                deleteTask={deleteTask}
                changeEditingTask={jest.fn()}
                updateTask={jest.fn()}
                isEditing={false}
            />,
        );

        clickButton(component, 'delete-task-button');

        expectedCallbackWasCalledOnceWith(deleteTask, task.id);
    });

    it('After clicking the button to update a task, callback(updateTask) is called out once', () => {
        const task = { id: 2, task: 'Go running! Update' };
        const updateTask = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <Task
                task={task}
                editTask={jest.fn()}
                cancelEditingTask={jest.fn()}
                deleteTask={jest.fn()}
                changeEditingTask={jest.fn()}
                updateTask={updateTask}
                isEditing={true}
            />,
        );

        clickButton(component, 'update-task-button');

        expectedCallbackWasCalledOnceWith(updateTask, task.id, task.task);
    });
});
