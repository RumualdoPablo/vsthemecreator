export const javascriptSample = {
    filename: 'TaskManager.js',
    code: `import React, { useState, useEffect } from 'react';

// Component for managing a list of tasks
const TaskManager = ({ tasks, onTaskUpdate }) => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filter tasks based on current filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed === true;
        } else if (filter === 'pending') {
            return task.completed === false;
        }
        return true;
    });
    
    // Search functionality
    const searchResults = filteredTasks.filter(task => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    // Calculate statistics
    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length
    };
    
    const handleTaskToggle = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        onTaskUpdate(updatedTasks);
    };
    
    const handleBulkAction = (action) => {
        let updatedTasks = [...tasks];
        
        switch (action) {
            case 'completeAll':
                updatedTasks = tasks.map(task => ({ ...task, completed: true }));
                break;
            case 'clearCompleted':
                updatedTasks = tasks.filter(task => !task.completed);
                break;
            default:
                return;
        }
        
        onTaskUpdate(updatedTasks);
    };
    
    return (
        <div className="task-manager">
            <h2>Task Manager ({stats.total} tasks)</h2>
            
            {/* Search and Filter Controls */}
            <div className="controls">
                <input 
                    type="text" 
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            
            {/* Task List */}
            <ul className="task-list">
                {searchResults.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={() => handleTaskToggle(task.id)}
                        />
                        <span>{task.title}</span>
                    </li>
                ))}
            </ul>
            
            {/* Statistics */}
            <div className="stats">
                <p>Completed: {stats.completed} | Pending: {stats.pending}</p>
            </div>
        </div>
    );
};

export default TaskManager;`
}; 