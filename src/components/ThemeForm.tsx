import { ThemeFormData } from '../types/theme'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import ColorInput from './ColorInput'

interface ThemeFormProps {
    themeData: ThemeFormData
    onThemeChange: (data: ThemeFormData) => void
}

interface ColorFieldConfig {
    key: keyof ThemeFormData
    label: string
    description?: string
}

const ThemeForm = ({ themeData, onThemeChange }: ThemeFormProps) => {
    const handleChange = (field: keyof ThemeFormData, value: string) => {
        onThemeChange({
            ...themeData,
            [field]: value
        })
    }

    const renderColorInputs = (fields: ColorFieldConfig[]) => {
        return fields.map((field) => (
            <ColorInput
                key={field.key}
                label={field.label}
                value={themeData[field.key]}
                onChange={(value) => handleChange(field.key, value)}
                description={field.description}
            />
        ))
    }

    const distributeFields = (fields: ColorFieldConfig[], columns: number = 3) => {
        const result = []
        for (let i = 0; i < columns; i++) {
            const columnFields = fields.filter((_, index) => index % columns === i)
            result.push(
                <div key={i} className="space-y-4">
                    {renderColorInputs(columnFields)}
                </div>
            )
        }
        return result
    }

    // Field configurations
    const editorFields: ColorFieldConfig[] = [
        { key: 'editorBackground', label: 'Background', description: 'Main editor background color' },
        { key: 'editorForeground', label: 'Foreground', description: 'Default text color' },
        { key: 'lineHighlight', label: 'Line Highlight', description: 'Current line background' },
        { key: 'selectionBackground', label: 'Selection', description: 'Selected text background' },
        { key: 'cursorColor', label: 'Cursor', description: 'Cursor color' }
    ]

    const uiFields: ColorFieldConfig[] = [
        { key: 'sidebarBackground', label: 'Sidebar Background' },
        { key: 'sidebarForeground', label: 'Sidebar Foreground' },
        { key: 'activityBarBackground', label: 'Activity Bar Background' },
        { key: 'activityBarForeground', label: 'Activity Bar Foreground' },
        { key: 'statusBarBackground', label: 'Status Bar Background' },
        { key: 'statusBarForeground', label: 'Status Bar Foreground' },
        { key: 'titleBarBackground', label: 'Title Bar Background' },
        { key: 'titleBarForeground', label: 'Title Bar Foreground' }
    ]

    const syntaxFields: ColorFieldConfig[] = [
        { key: 'keywords', label: 'Keywords', description: 'if, else, for, while, etc.' },
        { key: 'functions', label: 'Functions', description: 'Function names' },
        { key: 'strings', label: 'Strings', description: 'String literals' },
        { key: 'numbers', label: 'Numbers', description: 'Numeric literals' },
        { key: 'comments', label: 'Comments', description: 'Comments' },
        { key: 'variables', label: 'Variables', description: 'Variable names' },
        { key: 'types', label: 'Types', description: 'Type names' },
        { key: 'operators', label: 'Operators', description: '+, -, *, /, etc.' }
    ]

    return (
        <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="ui">UI</TabsTrigger>
                <TabsTrigger value="syntax">Syntax</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Theme Name</Label>
                            <Input
                                id="name"
                                value={themeData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="My Custom Theme"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Theme Type</Label>
                            <select
                                id="type"
                                value={themeData.type}
                                onChange={(e) => handleChange('type', e.target.value as 'dark' | 'light')}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Empty column for balance */}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="editor" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-6">
                    {distributeFields(editorFields)}
                </div>
            </TabsContent>

            <TabsContent value="ui" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-6">
                    {distributeFields(uiFields)}
                </div>
            </TabsContent>

            <TabsContent value="syntax" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-6">
                    {distributeFields(syntaxFields)}
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default ThemeForm 