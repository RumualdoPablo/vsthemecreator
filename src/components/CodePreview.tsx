import { ThemeFormData } from '../types/theme'

interface CodePreviewProps {
    themeData: ThemeFormData
}

const CodePreview = ({ themeData }: CodePreviewProps) => {
    const sampleCode = `import React, { useState, useEffect } from 'react';

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

    const renderHighlightedCode = () => {
        const lines = sampleCode.split('\n')

        return lines.map((line, index) => {
            let highlightedLine = line

            // Process highlighting in order of specificity to avoid conflicts

            // Highlight comments first (they shouldn't be processed further)
            highlightedLine = highlightedLine.replace(
                /(\/\/.*)/g,
                `<span style="color: ${themeData.comments}">$1</span>`
            )

            // Highlight strings (but not inside comments)
            highlightedLine = highlightedLine.replace(
                /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g,
                (match, quote, content) => {
                    // Don't highlight if this is inside a comment
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`)) {
                        return match;
                    }
                    return `<span style="color: ${themeData.strings}">${quote}${content}${quote}</span>`;
                }
            )

            // Highlight numbers (but not inside strings or comments)
            highlightedLine = highlightedLine.replace(
                /\b(\d+)\b/g,
                (match) => {
                    // Don't highlight if this is inside a comment or string
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`) ||
                        highlightedLine.includes(`<span style="color: ${themeData.strings}">`)) {
                        return match;
                    }
                    return `<span style="color: ${themeData.numbers}">${match}</span>`;
                }
            )

            // Highlight keywords (but not inside strings or comments)
            highlightedLine = highlightedLine.replace(
                /\b(import|export|from|const|let|var|if|else|try|catch|finally|return|default|function|useState|useEffect|switch|case|break|continue|for|while|do|in|of|new|class|extends|super|this|static|async|await|true|false|null|undefined)\b/g,
                (match) => {
                    // Don't highlight if this is inside a comment or string
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`) ||
                        highlightedLine.includes(`<span style="color: ${themeData.strings}">`)) {
                        return match;
                    }
                    return `<span style="color: ${themeData.keywords}">${match}</span>`;
                }
            )

            // Highlight function names (but not inside strings or comments)
            highlightedLine = highlightedLine.replace(
                /\b(\w+)\s*\(/g,
                (match, funcName) => {
                    // Don't highlight if this is inside a comment or string
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`) ||
                        highlightedLine.includes(`<span style="color: ${themeData.strings}">`)) {
                        return match;
                    }

                    // Don't highlight keywords that are already highlighted
                    const keywords = ['if', 'for', 'while', 'switch', 'catch', 'function'];
                    if (keywords.includes(funcName)) {
                        return match;
                    }

                    return `<span style="color: ${themeData.functions}">${funcName}</span>(`;
                }
            )

            // Highlight types/interfaces (but not inside strings or comments)
            highlightedLine = highlightedLine.replace(
                /\b(React|TaskManager|useState|useEffect)\b/g,
                (match) => {
                    // Don't highlight if this is inside a comment or string
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`) ||
                        highlightedLine.includes(`<span style="color: ${themeData.strings}">`)) {
                        return match;
                    }
                    return `<span style="color: ${themeData.types}">${match}</span>`;
                }
            )

            // Highlight variables (but not inside strings or comments)
            highlightedLine = highlightedLine.replace(
                /\b(tasks|onTaskUpdate|filter|setFilter|searchTerm|setSearchTerm|filteredTasks|searchResults|stats|taskId|updatedTasks|action|task|completed|title|id)\b/g,
                (match) => {
                    // Don't highlight if this is inside a comment or string
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`) ||
                        highlightedLine.includes(`<span style="color: ${themeData.strings}">`)) {
                        return match;
                    }
                    return `<span style="color: ${themeData.variables}">${match}</span>`;
                }
            )

            return (
                <div key={index} className="relative z-10">
                    <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                </div>
            )
        })
    }

    return (
        <div className="space-y-4">
            {/* VS Code Interface */}
            <div
                className="flex h-96 border border-gray-300 rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundColor: themeData.editorBackground }}
            >
                {/* Activity Bar */}
                <div
                    className="w-12 flex flex-col items-center pt-5 border-r border-gray-300"
                    style={{ backgroundColor: themeData.activityBarBackground, color: themeData.activityBarForeground }}
                >
                    <div className="mb-5 text-lg">📁</div>
                    <div className="mb-5 text-lg">🔍</div>
                    <div className="mb-5 text-lg">🔧</div>
                    <div className="mb-5 text-lg">▶️</div>
                    <div className="mb-5 text-lg">📦</div>
                </div>

                {/* Sidebar */}
                <div
                    className="w-64 flex flex-col"
                    style={{ backgroundColor: themeData.sidebarBackground, color: themeData.sidebarForeground }}
                >
                    <div className="p-3 border-b border-gray-300">
                        <strong>EXPLORER</strong>
                    </div>
                    <div className="p-3 flex-1">
                        <div className="mb-1">📁 src</div>
                        <div className="ml-4 mb-1">📁 utils</div>
                        <div className="ml-8 mb-1">📄 taskHelpers.js</div>
                        <div className="ml-4 mb-1">📄 App.js</div>
                        <div
                            className="ml-4 mb-1 px-2 py-1 rounded"
                            style={{ backgroundColor: themeData.selectionBackground }}
                        >
                            📄 index.js
                        </div>
                    </div>
                    <div className="p-3 border-t border-gray-300">
                        <div className="mb-1">📋 OUTLINE</div>
                        <div className="mb-1">📅 TIMELINE</div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Tab Bar */}
                    <div
                        className="h-9 flex items-center px-3 border-b border-gray-300"
                        style={{ backgroundColor: themeData.titleBarBackground, color: themeData.titleBarForeground }}
                    >
                        <div
                            className="px-4 py-1 rounded-t"
                            style={{ backgroundColor: themeData.editorBackground }}
                        >
                            index.js
                        </div>
                    </div>

                    {/* Editor */}
                    <div
                        className="flex-1 p-5 font-mono text-sm leading-relaxed overflow-auto relative"
                        style={{
                            backgroundColor: themeData.editorBackground,
                            color: themeData.editorForeground
                        }}
                    >
                        {/* Line Highlight */}
                        <div
                            className="absolute left-0 right-0 h-6 opacity-20"
                            style={{
                                backgroundColor: themeData.lineHighlight,
                                top: '20px'
                            }}
                        />
                        <div className="relative z-10">
                            {renderHighlightedCode()}
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div
                        className="h-6 flex items-center px-3 text-xs border-t border-gray-300"
                        style={{ backgroundColor: themeData.statusBarBackground, color: themeData.statusBarForeground }}
                    >
                        <span className="mr-5">Ln 1, Col 1</span>
                        <span className="mr-5">Spaces: 2</span>
                        <span className="mr-5">UTF-8</span>
                        <span className="mr-5">CRLF</span>
                        <span className="mr-5">JavaScript</span>
                        <span className="ml-auto">Prettier</span>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm text-blue-800">
                    This preview shows how your theme will look in VS Code with a realistic interface.
                </p>
                <p className="text-sm text-blue-700 mt-1">
                    The highlighted line represents the current cursor position.
                </p>
            </div>
        </div>
    )
}

export default CodePreview 