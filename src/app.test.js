import React from 'react';
import renderer from 'react-test-renderer';
import ToDoApp from './app';

it('Test whole the app can be rendered', () => {
    const tree = renderer.create(
        <ToDoApp/>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
