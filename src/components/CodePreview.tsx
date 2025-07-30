import { ThemeFormData } from '../types/theme'

interface CodePreviewProps {
    themeData: ThemeFormData
}

const CodePreview = ({ themeData }: CodePreviewProps) => {
    const sampleCode = `import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit, faSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Componente Tarea genera elementos individuales de tarea/actividad
// Task component generates individual task/activity elements
const Tarea = ({ tarea, toggleCompletada, editarTarea, eliminarTarea }) => {
    const [editandoTarea, cambiarEditandoTarea] = useState(false);
    const [nuevaTarea, cambiarNuevaTarea] = useState(tarea.texto);

    const handleSubmit = (e) => {
        e.preventDefault();
        editarTarea(tarea.id, nuevaTarea);
        cambiarEditandoTarea(false);
    };

    return (
        <li className='lista-tareas__tarea'>
            <FontAwesomeIcon 
                icon={tarea.completada ? faCheckSquare : faSquare}
                className='lista-tareas__icono lista-tareas__icono-check'
                onClick={() => toggleCompletada(tarea.id)}
            />
            <div className='lista-tareas__texto'>
                {editandoTarea ? (
                    <form className='lista-tareas__formulario' onSubmit={handleSubmit}>
                        <input 
                            type='text' 
                            className='lista-tareas__input'
                            value={nuevaTarea}
                            onChange={(e) => cambiarNuevaTarea(e.target.value)}
                        />
                    </form>
                ) : (
                    tarea.texto
                )}
            </div>
            <div className='lista-tareas__contenedor-botones'>
                <FontAwesomeIcon 
                    icon={faEdit}
                    className='lista-tareas__icono lista-tareas__icono-accion'
                    onClick={() => cambiarEditandoTarea(!editandoTarea)}
                />
                <FontAwesomeIcon 
                    icon={faTimesCircle}
                    className='lista-tareas__icono lista-tareas__icono-accion'
                    onClick={() => eliminarTarea(tarea.id)}
                />
            </div>
        </li>
    );
};

export default Tarea;`

    const renderHighlightedCode = () => {
        const lines = sampleCode.split('\n')

        return lines.map((line, index) => {
            let highlightedLine = line

            // Highlight keywords
            highlightedLine = highlightedLine.replace(
                /\b(import|export|from|const|let|var|if|else|try|catch|finally|return|default|function|useState|useEffect)\b/g,
                `<span style="color: ${themeData.keywords}">$1</span>`
            )

            // Highlight strings
            highlightedLine = highlightedLine.replace(
                /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g,
                `<span style="color: ${themeData.strings}">$1$2$1</span>`
            )

            // Highlight numbers
            highlightedLine = highlightedLine.replace(
                /\b(\d+)\b/g,
                `<span style="color: ${themeData.numbers}">$1</span>`
            )

            // Highlight comments
            highlightedLine = highlightedLine.replace(
                /(\/\/.*)/g,
                `<span style="color: ${themeData.comments}">$1</span>`
            )

            // Highlight function names
            highlightedLine = highlightedLine.replace(
                /\b(\w+)\s*\(/g,
                (match, funcName) => {
                    if (!['if', 'for', 'while', 'switch', 'catch'].includes(funcName)) {
                        return `<span style="color: ${themeData.functions}">${funcName}</span>(`
                    }
                    return match
                }
            )

            // Highlight types/interfaces
            highlightedLine = highlightedLine.replace(
                /\b(React|FontAwesomeIcon|faCheckSquare|faEdit|faSquare|faTimesCircle)\b/g,
                `<span style="color: ${themeData.types}">$1</span>`
            )

            // Highlight variables
            highlightedLine = highlightedLine.replace(
                /\b(tarea|toggleCompletada|editarTarea|eliminarTarea|editandoTarea|cambiarEditandoTarea|nuevaTarea|cambiarNuevaTarea|handleSubmit|e|id|texto|completada)\b/g,
                `<span style="color: ${themeData.variables}">$1</span>`
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
                        <div className="mb-1">📁 COMPONENTS</div>
                        <div className="ml-4 mb-1">📄 FormularioTareas.js</div>
                        <div className="ml-4 mb-1">📄 Header.js</div>
                        <div
                            className="ml-4 mb-1 px-2 py-1 rounded"
                            style={{ backgroundColor: themeData.selectionBackground }}
                        >
                            📄 Tarea.js
                        </div>
                        <div className="ml-4 mb-1">📄 ListaTareas.js</div>
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
                            Tarea.js
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