import { useState } from 'react'
import { ThemeFormData, VSTheme } from './types/theme'
import ThemeForm from './components/ThemeForm'
import CodePreview from './components/CodePreview'
import ThemeExporter from './components/ThemeExporter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  const [themeData, setThemeData] = useState<ThemeFormData>({
    name: 'My Custom Theme',
    type: 'dark',
    editorBackground: '#1e1e1e',
    editorForeground: '#d4d4d4',
    lineHighlight: '#2a2d2e',
    selectionBackground: '#264f78',
    cursorColor: '#d4d4d4',
    sidebarBackground: '#252526',
    sidebarForeground: '#cccccc',
    activityBarBackground: '#333333',
    activityBarForeground: '#ffffff',
    statusBarBackground: '#007acc',
    statusBarForeground: '#ffffff',
    titleBarBackground: '#3c3c3c',
    titleBarForeground: '#cccccc',
    keywords: '#569cd6',
    functions: '#dcdcaa',
    strings: '#ce9178',
    numbers: '#b5cea8',
    comments: '#6a9955',
    variables: '#9cdcfe',
    types: '#4ec9b0',
    operators: '#d4d4d4'
  })

  const generateVSTheme = (): VSTheme => {
    return {
      name: themeData.name,
      type: themeData.type,
      colors: {
        'editor.background': themeData.editorBackground,
        'editor.foreground': themeData.editorForeground,
        'editor.lineHighlightBackground': themeData.lineHighlight,
        'editor.selectionBackground': themeData.selectionBackground,
        'editor.inactiveSelectionBackground': themeData.selectionBackground + '80',
        'editor.findMatchBackground': themeData.selectionBackground + '60',
        'editor.findMatchHighlightBackground': themeData.selectionBackground + '40',
        'editorCursor.foreground': themeData.cursorColor,
        'editorWhitespace.foreground': themeData.editorForeground + '40',
        'editorIndentGuide.background': themeData.editorForeground + '20',
        'editorIndentGuide.activeBackground': themeData.editorForeground + '40',
        'sideBar.background': themeData.sidebarBackground,
        'sideBar.foreground': themeData.sidebarForeground,
        'activityBar.background': themeData.activityBarBackground,
        'activityBar.foreground': themeData.activityBarForeground,
        'statusBar.background': themeData.statusBarBackground,
        'statusBar.foreground': themeData.statusBarForeground,
        'titleBar.activeBackground': themeData.titleBarBackground,
        'titleBar.activeForeground': themeData.titleBarForeground,
      },
      tokenColors: [
        {
          name: 'Keywords',
          scope: ['keyword', 'storage.type', 'storage.modifier'],
          settings: { foreground: themeData.keywords }
        },
        {
          name: 'Functions',
          scope: ['entity.name.function', 'support.function'],
          settings: { foreground: themeData.functions }
        },
        {
          name: 'Strings',
          scope: ['string', 'string.quoted'],
          settings: { foreground: themeData.strings }
        },
        {
          name: 'Numbers',
          scope: ['constant.numeric'],
          settings: { foreground: themeData.numbers }
        },
        {
          name: 'Comments',
          scope: ['comment', 'comment.line', 'comment.block'],
          settings: { foreground: themeData.comments }
        },
        {
          name: 'Variables',
          scope: ['variable', 'variable.other'],
          settings: { foreground: themeData.variables }
        },
        {
          name: 'Types',
          scope: ['entity.name.type', 'support.type'],
          settings: { foreground: themeData.types }
        },
        {
          name: 'Operators',
          scope: ['keyword.operator'],
          settings: { foreground: themeData.operators }
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 VS Code Theme Creator
          </h1>
          <p className="text-lg text-gray-600">
            Create and customize your own Visual Studio Code themes
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Form Section - Centered */}
          <div className="flex justify-center">
            <Card className="w-full max-w-4xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                  Theme Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeForm
                  themeData={themeData}
                  onThemeChange={setThemeData}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section - Below Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                  VS Code Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodePreview themeData={themeData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                  Export Theme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeExporter theme={generateVSTheme()} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
