import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput, View, Text, StyleSheet,
} from 'react-native';

/** *
 * Input
 *
 * @param {Object} props  - Props object
 * @param {string} props.label - Label text
 * @param {string} props.placeholder - Placeholder
 * @param {boolean} props.autoCorrect  - Auto correct
 * @param {string|number} props.value  - Input value
 * @param {boolean} props.secureTextEntry  - Secure text
 * @param {function} props.onChange  - On change
 * @returns {JSXElement}
 */
const Input = props => (
    <View>
        <Text style={{ fontWeight: 'bold' }}>{props.label}</Text>
        <TextInput
            placeholder={props.placeholder}
            autoCorrect={props.autoCorrect}
            style={styles.inputStyle}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChange}
        />
    </View>
);

Input.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    autoCorrect: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    secureTextEntry: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    inputStyle: {
        borderColor: 'black',
        borderWidth: 0.2,
        height: 40,
    },
});

export default Input;
