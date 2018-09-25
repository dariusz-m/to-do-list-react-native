import React from 'react';
import {
    Text, View, Button, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    addTaskToDo,
    cancelEditingTask,
    changeEditingTask,
    changeTheDescriptionOfTheNewTask,
    deleteTask,
    editTask,
    getTasks,
    updateTask,
} from './actions';
import { Task } from './task';
import Input from '../shared-components/input';

/**
 * Tasks component
 */
export class Tasks extends React.Component {
    static propTypes = {
        tasks: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                task: PropTypes.string.isRequired,
            }),
        ).isRequired,
        editingTask: PropTypes.shape({
            id: PropTypes.number.isRequired,
            task: PropTypes.string.isRequired,
        }),
        newTask: PropTypes.string.isRequired,
        errorMessage: PropTypes.string,
        actions: PropTypes.shape({
            getTasks: PropTypes.func.isRequired,
            addTaskToDo: PropTypes.func.isRequired,
            deleteTask: PropTypes.func.isRequired,
            editTask: PropTypes.func.isRequired,
            updateTask: PropTypes.func.isRequired,
            cancelEditingTask: PropTypes.func.isRequired,
            changeEditingTask: PropTypes.func.isRequired,
            changeTheDescriptionOfTheNewTask: PropTypes.func.isRequired,
        }).isRequired,
    };

    /**
     * Run when component just have mounted.
     */
    componentDidMount() {
        this.props.actions.getTasks();
    }

    /**
     * Add new task.
     */
    addNewTask = () => {
        this.props.actions.addTaskToDo(this.props.newTask);
    };

    /**
     * Delete task
     * @param {number} taskId - Task id
     */
    deleteTask = (taskId) => {
        this.props.actions.deleteTask(taskId);
    };

    /**
     * Edit task
     * @param {number} taskId - Task id
     */
    editTask = (taskId) => {
        this.props.actions.editTask(taskId);
    };

    /**
     * Update task
     */
    updateTask = () => {
        this.props.actions.updateTask(this.props.editingTask.id, this.props.editingTask.task);
    };

    /**
     * Cancel editing task
     */
    cancelEditingTask = () => {
        this.props.actions.cancelEditingTask();
    };

    /**
     * Change editing task
     * @param {string} newTaskDesc - New task description for editing task.
     */
    changeEditingTask = (newTaskDesc) => {
        this.props.actions.changeEditingTask(newTaskDesc);
    };

    /**
     * Change new task value
     * @param {string} value - Input value.
     */
    onChangeNewTaskInputValue = (value) => {
        this.props.actions.changeTheDescriptionOfTheNewTask(value);
    };

    /**
     * Render
     * @returns {string}
     */
    render() {
        return (
            <View>
                <Text style={{ fontWeight: 'bold' }}>To Do List</Text>
                {this.props.errorMessage
                    ? <Text style={{ color: 'red' }}>{this.props.errorMessage}</Text>
                    : null
                }
                <View style={{ paddingBottom: 30 }}>
                    <Input
                        placeholder={'task...'}
                        onChange={this.onChangeNewTaskInputValue}
                        label={'Add new Task: '}
                        autoCorrect={true}
                        secureTextEntry={false}
                        value={this.props.newTask}
                    />
                    <Button onPress={this.addNewTask} title={'Add'} color={'blue'}/>
                </View>
                <FlatList
                    data={[...this.props.tasks]}
                    keyExtractor={task => task.id.toString()}
                    renderItem={({ item: task }) => {
                        const isTaskEditing = this.props.editingTask ? this.props.editingTask.id === task.id : false;
                        return <Task
                            task={isTaskEditing ? this.props.editingTask : task}
                            deleteTask={this.deleteTask}
                            editTask={this.editTask}
                            isEditing={isTaskEditing}
                            updateTask={this.updateTask}
                            cancelEditingTask={this.cancelEditingTask}
                            changeEditingTask={this.changeEditingTask}
                        />;
                    }}
                />
            </View>
        );
    }
}

/**
 * Map state to props.
 * @param {Object} state - Application state
 * @returns {Object}
 */
const mapStateToProps = state => ({
    tasks: state.todo.tasks,
    editingTask: state.todo.editingTask,
    newTask: state.todo.newTask,
    errorMessage: state.todo.errorMessage,
});

/**
 * Map dispatch to props.
 *
 * @param {Object} dispatch: Redux dispatch
 *
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getTasks,
            addTaskToDo,
            deleteTask,
            editTask,
            updateTask,
            cancelEditingTask,
            changeEditingTask,
            changeTheDescriptionOfTheNewTask,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
