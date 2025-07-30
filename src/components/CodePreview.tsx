import { ThemeFormData } from '../types/theme'
import { useState, useRef, useEffect } from 'react'
import { codeSamples } from '../samples'

interface CodePreviewProps {
    themeData: ThemeFormData
}

const CodePreview = ({ themeData }: CodePreviewProps) => {
    const [activeTab, setActiveTab] = useState<'javascript' | 'typescript' | 'python'>('javascript')
    const [height, setHeight] = useState(384) // 24rem = 384px
    const [isResizing, setIsResizing] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle mouse events for resizing
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !containerRef.current) return

            const containerRect = containerRef.current.getBoundingClientRect()
            const newHeight = e.clientY - containerRect.top

            // Set minimum and maximum height constraints
            const minHeight = 300 // 18.75rem
            const maxHeight = 800 // 50rem

            if (newHeight >= minHeight && newHeight <= maxHeight) {
                setHeight(newHeight)
            }
        }

        const handleMouseUp = () => {
            setIsResizing(false)
        }

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isResizing])

    const handleMouseDown = () => {
        setIsResizing(true)
    }

    const renderHighlightedCode = (code: string, language: string) => {
        const lines = code.split('\n')

        return lines.map((line, index) => {
            let highlightedLine = line

            // Process highlighting in order of specificity to avoid conflicts

            // Highlight comments first (they shouldn't be processed further)
            if (language === 'python') {
                highlightedLine = highlightedLine.replace(
                    /(#.*)/g,
                    `<span style="color: ${themeData.comments}">$1</span>`
                )
            } else {
                highlightedLine = highlightedLine.replace(
                    /(\/\/.*)/g,
                    `<span style="color: ${themeData.comments}">$1</span>`
                )
            }

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

            // Highlight keywords (language-specific)
            const keywords = language === 'python'
                ? /\b(import|from|class|def|if|else|elif|try|except|finally|return|True|False|None|for|while|in|is|not|and|or|with|as|lambda|yield|raise|assert|break|continue|pass|del|global|nonlocal)\b/g
                : language === 'typescript'
                    ? /\b(import|export|from|const|let|var|if|else|try|catch|finally|return|default|function|useState|useEffect|switch|case|break|continue|for|while|do|in|of|new|class|extends|super|this|static|async|await|true|false|null|undefined|interface|type|enum|namespace|declare|module|export|import|as|type|readonly|public|private|protected|abstract|implements|extends|interface|class|enum|namespace|declare|module|export|import|as|type|readonly|public|private|protected|abstract|implements)\b/g
                    : /\b(import|export|from|const|let|var|if|else|try|catch|finally|return|default|function|useState|useEffect|switch|case|break|continue|for|while|do|in|of|new|class|extends|super|this|static|async|await|true|false|null|undefined)\b/g;

            highlightedLine = highlightedLine.replace(
                keywords,
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
                    const keywords = ['if', 'for', 'while', 'switch', 'catch', 'function', 'def', 'class'];
                    if (keywords.includes(funcName)) {
                        return match;
                    }

                    return `<span style="color: ${themeData.functions}">${funcName}</span>(`;
                }
            )

            // Highlight types/interfaces (language-specific)
            const types = language === 'python'
                ? /\b(str|int|float|bool|list|dict|tuple|set|Optional|List|Dict|Union|Enum|dataclass|datetime)\b/g
                : language === 'typescript'
                    ? /\b(React|TaskManager|useState|useEffect|Task|TaskManagerProps|FilterType|BulkAction|React\.FC|string|boolean|number|void|any|unknown|never|object|array|Promise|Date)\b/g
                    : /\b(React|TaskManager|useState|useEffect)\b/g;

            highlightedLine = highlightedLine.replace(
                types,
                (match) => {
                    // Don't highlight if this is inside a comment or string
                    if (highlightedLine.includes(`<span style="color: ${themeData.comments}">`) ||
                        highlightedLine.includes(`<span style="color: ${themeData.strings}">`)) {
                        return match;
                    }
                    return `<span style="color: ${themeData.types}">${match}</span>`;
                }
            )

            // Highlight variables (language-specific)
            const variables = language === 'python'
                ? /\b(tasks|filter_type|search_term|filtered_tasks|search_results|stats|task_id|updated_tasks|action|task|completed|title|id|priority|created_at|manager|filename|data|task_data|f|pending_tasks)\b/g
                : language === 'typescript'
                    ? /\b(tasks|onTaskUpdate|filter|setFilter|searchTerm|setSearchTerm|filteredTasks|searchResults|stats|taskId|updatedTasks|action|task|completed|title|id|priority|createdAt|Task|TaskManagerProps|FilterType|BulkAction|React\.FC|React\.ChangeEvent|HTMLInputElement|HTMLSelectElement)\b/g
                    : /\b(tasks|onTaskUpdate|filter|setFilter|searchTerm|setSearchTerm|filteredTasks|searchResults|stats|taskId|updatedTasks|action|task|completed|title|id)\b/g;

            highlightedLine = highlightedLine.replace(
                variables,
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
            {/* Language Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {(['javascript', 'typescript', 'python'] as const).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === lang
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                ))}
            </div>

            {/* VS Code Interface */}
            <div
                ref={containerRef}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-lg relative"
                style={{
                    backgroundColor: themeData.editorBackground,
                    height: `${height}px`
                }}
            >
                {/* Activity Bar */}
                <div
                    className="w-12 flex flex-col items-center pt-5 border-r border-gray-300 absolute left-0 top-0 bottom-0"
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
                    className="w-64 flex flex-col absolute left-12 top-0 bottom-0"
                    style={{ backgroundColor: themeData.sidebarBackground, color: themeData.sidebarForeground }}
                >
                    <div className="p-3 border-b border-gray-300">
                        <strong>EXPLORER</strong>
                    </div>
                    <div className="p-3 flex-1">
                        <div className="mb-1">📁 src</div>
                        <div
                            className="ml-4 mb-1 px-2 py-1 rounded"
                            style={{ backgroundColor: themeData.selectionBackground }}
                        >
                            📄 {codeSamples[activeTab].filename}
                        </div>
                    </div>
                    <div className="p-3 border-t border-gray-300">
                        <div className="mb-1">📋 OUTLINE</div>
                        <div className="mb-1">📅 TIMELINE</div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col absolute left-76 top-0 right-0 bottom-0">
                    {/* Tab Bar */}
                    <div
                        className="h-9 flex items-center px-3 border-b border-gray-300"
                        style={{ backgroundColor: themeData.titleBarBackground, color: themeData.titleBarForeground }}
                    >
                        <div
                            className="px-4 py-1 rounded-t"
                            style={{ backgroundColor: themeData.editorBackground }}
                        >
                            {codeSamples[activeTab].filename}
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
                            {renderHighlightedCode(codeSamples[activeTab].code, activeTab)}
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div
                        className="h-6 flex items-center px-3 text-xs border-t border-gray-300 mb-2"
                        style={{ backgroundColor: themeData.statusBarBackground, color: themeData.statusBarForeground }}
                    >
                        <span className="mr-5">Ln 1, Col 1</span>
                        <span className="mr-5">Spaces: 2</span>
                        <span className="mr-5">UTF-8</span>
                        <span className="mr-5">CRLF</span>
                        <span className="mr-5">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                        <span className="ml-auto">Prettier</span>
                    </div>
                </div>

                {/* Resize Handle */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize transition-colors flex items-center justify-center"
                    onMouseDown={handleMouseDown}
                    style={{
                        backgroundColor: isResizing ? '#e5e7eb' : '#f3f4f6',
                        cursor: isResizing ? 'ns-resize' : 'ns-resize'
                    }}
                >
                    <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
                </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-10">
                <p className="text-sm text-blue-800">
                    This preview shows how your theme will look in VS Code with different programming languages.
                </p>
                <p className="text-sm text-blue-800 mt-1">
                    Switch between tabs to see syntax highlighting for JavaScript, TypeScript, and Python.
                </p>
                <p className="text-sm text-blue-800 mt-1">
                    Drag the bottom handle to resize the preview window height.
                </p>
            </div>
        </div>
    )
}

export default CodePreview 