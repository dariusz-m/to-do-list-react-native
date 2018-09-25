import React from 'react';
import PropTypes from 'prop-types';
import {
    Text, View, Button, StyleSheet,
} from 'react-native';

import Input from '../shared-components/input';

/**
 * Task component
 */
export class Task extends React.PureComponent {
    static propTypes = {
        task: PropTypes.shape({
            id: PropTypes.number.isRequired,
            task: PropTypes.string.isRequired,
        }).isRequired,
        deleteTask: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired,
        cancelEditingTask: PropTypes.func.isRequired,
        changeEditingTask: PropTypes.func.isRequired,
        isEditing: PropTypes.bool.isRequired,
    };

    /**
     * Render
     * @returns {string}
     */
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.isEditing
                        ? <View>
                            <Input
                                placeholder={''}
                                onChange={value => this.props.changeEditingTask(value)}
                                label={''}
                                autoCorrect={true}
                                secureTextEntry={false}
                                value={this.props.task.task}
                            />
                            <Button onPress={this.props.cancelEditingTask} title={'Cancel'} color={'grey'}/>
                            <Button
                                onPress={() => this.props.updateTask(this.props.task.id, this.props.task.task)}
                                title={'Update'}
                                color={'yellow'}
                            />
                        </View>
                        : <View>
                            <Text>{this.props.task.task}</Text>
                            <Button
                                onPress={() => this.props.editTask(this.props.task.id)}
                                title={'Edit'}
                                color={'blue'}
                            />
                            <Button
                                onPress={() => this.props.deleteTask(this.props.task.id)}
                                title={'Delete'}
                                color={'red'}
                            />
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
