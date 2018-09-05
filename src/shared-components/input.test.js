import renderer from 'react-test-renderer';
import React from 'react';
import Input from './input';

it('Input component renders correctly', () => {
    const tree = renderer.create(
        <Input autoCorrect={true} label={'Label'} onChange={jest.fn()} placeholder={'Placeholder...'} value={'value'}/>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
