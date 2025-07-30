import { useState } from 'react'
import { ThemeFormData } from '../types/theme'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'

interface ThemeFormProps {
    themeData: ThemeFormData
    onThemeChange: (data: ThemeFormData) => void
}

const ThemeForm = ({ themeData, onThemeChange }: ThemeFormProps) => {
    const handleChange = (field: keyof ThemeFormData, value: string) => {
        onThemeChange({
            ...themeData,
            [field]: value
        })
    }

    const ColorInput = ({
        label,
        value,
        onChange,
        description
    }: {
        label: string
        value: string
        onChange: (value: string) => void
        description?: string
    }) => (
        <div className="space-y-2">
            <Label className="text-sm font-medium">
                {label}
                {description && (
                    <span className="text-xs text-muted-foreground ml-2">
                        {description}
                    </span>
                )}
            </Label>
            <div className="flex gap-2">
                <Input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-16 h-10 p-1 border rounded-md cursor-pointer"
                />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000"
                    className="font-mono text-sm"
                />
            </div>
        </div>
    )

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
                    <div className="space-y-4">
                        <ColorInput
                            label="Background"
                            value={themeData.editorBackground}
                            onChange={(value) => handleChange('editorBackground', value)}
                            description="Main editor background color"
                        />
                        <ColorInput
                            label="Foreground"
                            value={themeData.editorForeground}
                            onChange={(value) => handleChange('editorForeground', value)}
                            description="Default text color"
                        />
                    </div>

                    <div className="space-y-4">
                        <ColorInput
                            label="Line Highlight"
                            value={themeData.lineHighlight}
                            onChange={(value) => handleChange('lineHighlight', value)}
                            description="Current line background"
                        />
                        <ColorInput
                            label="Selection"
                            value={themeData.selectionBackground}
                            onChange={(value) => handleChange('selectionBackground', value)}
                            description="Selected text background"
                        />
                    </div>

                    <div className="space-y-4">
                        <ColorInput
                            label="Cursor"
                            value={themeData.cursorColor}
                            onChange={(value) => handleChange('cursorColor', value)}
                            description="Cursor color"
                        />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="ui" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <ColorInput
                            label="Sidebar Background"
                            value={themeData.sidebarBackground}
                            onChange={(value) => handleChange('sidebarBackground', value)}
                        />
                        <ColorInput
                            label="Sidebar Foreground"
                            value={themeData.sidebarForeground}
                            onChange={(value) => handleChange('sidebarForeground', value)}
                        />
                        <ColorInput
                            label="Activity Bar Background"
                            value={themeData.activityBarBackground}
                            onChange={(value) => handleChange('activityBarBackground', value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <ColorInput
                            label="Activity Bar Foreground"
                            value={themeData.activityBarForeground}
                            onChange={(value) => handleChange('activityBarForeground', value)}
                        />
                        <ColorInput
                            label="Status Bar Background"
                            value={themeData.statusBarBackground}
                            onChange={(value) => handleChange('statusBarBackground', value)}
                        />
                        <ColorInput
                            label="Status Bar Foreground"
                            value={themeData.statusBarForeground}
                            onChange={(value) => handleChange('statusBarForeground', value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <ColorInput
                            label="Title Bar Background"
                            value={themeData.titleBarBackground}
                            onChange={(value) => handleChange('titleBarBackground', value)}
                        />
                        <ColorInput
                            label="Title Bar Foreground"
                            value={themeData.titleBarForeground}
                            onChange={(value) => handleChange('titleBarForeground', value)}
                        />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="syntax" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <ColorInput
                            label="Keywords"
                            value={themeData.keywords}
                            onChange={(value) => handleChange('keywords', value)}
                            description="if, else, for, while, etc."
                        />
                        <ColorInput
                            label="Functions"
                            value={themeData.functions}
                            onChange={(value) => handleChange('functions', value)}
                            description="Function names"
                        />
                        <ColorInput
                            label="Strings"
                            value={themeData.strings}
                            onChange={(value) => handleChange('strings', value)}
                            description="String literals"
                        />
                    </div>

                    <div className="space-y-4">
                        <ColorInput
                            label="Numbers"
                            value={themeData.numbers}
                            onChange={(value) => handleChange('numbers', value)}
                            description="Numeric literals"
                        />
                        <ColorInput
                            label="Comments"
                            value={themeData.comments}
                            onChange={(value) => handleChange('comments', value)}
                            description="Comments"
                        />
                        <ColorInput
                            label="Variables"
                            value={themeData.variables}
                            onChange={(value) => handleChange('variables', value)}
                            description="Variable names"
                        />
                    </div>

                    <div className="space-y-4">
                        <ColorInput
                            label="Types"
                            value={themeData.types}
                            onChange={(value) => handleChange('types', value)}
                            description="Type names"
                        />
                        <ColorInput
                            label="Operators"
                            value={themeData.operators}
                            onChange={(value) => handleChange('operators', value)}
                            description="+, -, *, /, etc."
                        />
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
}

export default ThemeForm 