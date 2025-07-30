export const typescriptSample = {
    filename: 'TaskManager.tsx',
    code: `import React, { useState, useEffect } from 'react';

// Type definitions
interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
}

interface TaskManagerProps {
    tasks: Task[];
    onTaskUpdate: (tasks: Task[]) => void;
}

type FilterType = 'all' | 'pending' | 'completed';
type BulkAction = 'completeAll' | 'clearCompleted';

// Component for managing a list of tasks
const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onTaskUpdate }) => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    // Filter tasks based on current filter
    const filteredTasks: Task[] = tasks.filter((task: Task) => {
        if (filter === 'completed') {
            return task.completed === true;
        } else if (filter === 'pending') {
            return task.completed === false;
        }
        return true;
    });
    
    // Search functionality
    const searchResults: Task[] = filteredTasks.filter((task: Task) => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    // Calculate statistics
    const stats = {
        total: tasks.length,
        completed: tasks.filter((t: Task) => t.completed).length,
        pending: tasks.filter((t: Task) => !t.completed).length
    };
    
    const handleTaskToggle = (taskId: string): void => {
        const updatedTasks: Task[] = tasks.map((task: Task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        onTaskUpdate(updatedTasks);
    };
    
    const handleBulkAction = (action: BulkAction): void => {
        let updatedTasks: Task[] = [...tasks];
        
        switch (action) {
            case 'completeAll':
                updatedTasks = tasks.map((task: Task) => ({ ...task, completed: true }));
                break;
            case 'clearCompleted':
                updatedTasks = tasks.filter((task: Task) => !task.completed);
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                        setSearchTerm(e.target.value)
                    }
                />
                
                <select 
                    value={filter} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                        setFilter(e.target.value as FilterType)
                    }
                >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            
            {/* Task List */}
            <ul className="task-list">
                {searchResults.map((task: Task) => (
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