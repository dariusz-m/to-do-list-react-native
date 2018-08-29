import React from 'react';
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
     * @param {Event} event - Change event.
     */
    onChangeNewTaskInputValue = (event) => {
        this.props.actions.changeTheDescriptionOfTheNewTask(event.target.value);
    };

    /**
     * Render
     * @returns {string}
     */
    render() {
        return (
            <div className={'mt-5 w-50'}>
                <h2 className="text-center">To Do List</h2>
                {this.props.errorMessage
                    ? <div className="alert alert-danger">{this.props.errorMessage}</div>
                    : null
                }
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="input-new-task" placeholder="New task..."
                        value={this.props.newTask} onChange={this.onChangeNewTaskInputValue}/>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            id="add-new-task-button"
                            onClick={this.addNewTask}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {this.props.tasks.map((task) => {
                        const isTaskEditing = this.props.editingTask ? this.props.editingTask.id === task.id : false;
                        return <Task
                            key={task.id}
                            task={isTaskEditing ? this.props.editingTask : task}
                            deleteTask={this.deleteTask}
                            editTask={this.editTask}
                            isEditing={isTaskEditing}
                            updateTask={this.updateTask}
                            cancelEditingTask={this.cancelEditingTask}
                            changeEditingTask={this.changeEditingTask}
                        />;
                    })}
                </ul>
            </div>
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
