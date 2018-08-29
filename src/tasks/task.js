import React from 'react';
import PropTypes from 'prop-types';

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
            <li className="list-group-item">
                <button
                    className="btn btn-danger float-right"
                    onClick={() => this.props.deleteTask(this.props.task.id)}
                    id="delete-task-button"
                >
                    Delete
                </button>
                {
                    this.props.isEditing
                        ? <React.Fragment>
                            <input
                                className="pr-3"
                                value={this.props.task.task}
                                onChange={event => this.props.changeEditingTask(event.target.value)}
                            />
                            <button
                                className="btn btn-primary float-right mr-2"
                                onClick={() => this.props.cancelEditingTask()}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-warning float-right mr-2"
                                id="update-task-button"
                                onClick={() => this.props.updateTask(this.props.task.id, this.props.task.task)}>
                                Update
                            </button>
                        </React.Fragment>
                        : <React.Fragment>
                            <p className="pr-3">{this.props.task.task}</p>
                            <button
                                className="btn btn-info float-right mr-2"
                                onClick={() => this.props.editTask(this.props.task.id)}>
                                Edit
                            </button>
                        </React.Fragment>
                }
            </li>
        );
    }
}
