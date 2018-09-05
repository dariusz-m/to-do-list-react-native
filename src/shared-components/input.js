import React from 'react';
import PropTypes from 'prop-types';
import {
    TextInput, View, Text, StyleSheet,
} from 'react-native';

/** *
 * Input component
 *
 * @param props {Object} - Props object
 * @returns {string}
 */

const Input = props => (
    <View>
        <Text>{props.label}</Text>
        <TextInput
            placeholder={props.placeholder}
            autoCorrect={props.autoCorrect}
            style={styles.inputStyle}
            value={props.value}
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
    onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    inputStyle: {},
});

export default Input;
