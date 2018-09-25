// import ReactTestUtils from 'react-dom/test-utils';
// import ReactDOM from 'react-dom';
//
// /**
//  * @param {function} callback - Callback
//  * @param {string|number} firstParameter - First parameter
//  * @param {string|number} secondParameter - Second parameter
//  */
// export const expectedCallbackWasCalledOnceWith = (
//     callback, firstParameter = undefined, secondParameter = undefined,
// ) => {
//     expect(callback.mock.calls.length).toBe(1);
//     expect(callback.mock.calls[0][0]).toEqual(firstParameter);
//     expect(callback.mock.calls[0][1]).toEqual(secondParameter);
// };
//
// /**
//  * @param {React.Component} component - Component
//  * @param {string} buttonId - Button id
//  */
// export const clickButton = (component, buttonId) => {
//     const node = ReactDOM.findDOMNode(component);
//     const button = node.querySelector(`#${buttonId}`);
//     ReactTestUtils.Simulate.click(button);
// };
//
// /**
//  * Change input value
//  * @param {React.Component} component - Component
//  * @param {string} inputId - Input id
//  * @param {string|number} value - Value
//  */
// export const changeInputValue = (component, inputId, value) => {
//     const node = ReactDOM.findDOMNode(component);
//     const field = node.querySelector(`#${inputId}`);
//
//     field.value = value;
//     ReactTestUtils.Simulate.change(field);
// };
