export interface VSTheme {
    name: string;
    type: 'dark' | 'light';
    colors: {
        'editor.background': string;
        'editor.foreground': string;
        'editor.lineHighlightBackground': string;
        'editor.selectionBackground': string;
        'editor.inactiveSelectionBackground': string;
        'editor.findMatchBackground': string;
        'editor.findMatchHighlightBackground': string;
        'editorCursor.foreground': string;
        'editorWhitespace.foreground': string;
        'editorIndentGuide.background': string;
        'editorIndentGuide.activeBackground': string;
        'sideBar.background': string;
        'sideBar.foreground': string;
        'activityBar.background': string;
        'activityBar.foreground': string;
        'statusBar.background': string;
        'statusBar.foreground': string;
        'titleBar.activeBackground': string;
        'titleBar.activeForeground': string;
    };
    tokenColors: {
        name: string;
        scope: string[];
        settings: {
            foreground?: string;
            background?: string;
            fontStyle?: string;
        };
    }[];
}

export interface ThemeFormData {
    name: string;
    type: 'dark' | 'light';
    editorBackground: string;
    editorForeground: string;
    lineHighlight: string;
    selectionBackground: string;
    cursorColor: string;
    sidebarBackground: string;
    sidebarForeground: string;
    activityBarBackground: string;
    activityBarForeground: string;
    statusBarBackground: string;
    statusBarForeground: string;
    titleBarBackground: string;
    titleBarForeground: string;
    // Syntax highlighting colors
    keywords: string;
    functions: string;
    strings: string;
    numbers: string;
    comments: string;
    variables: string;
    types: string;
    operators: string;
} 