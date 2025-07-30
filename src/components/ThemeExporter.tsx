import { useState } from 'react'
import { VSTheme } from '../types/theme'
import { Copy, Download, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ThemeExporterProps {
    theme: VSTheme
}

const ThemeExporter = ({ theme }: ThemeExporterProps) => {
    const [copied, setCopied] = useState(false)

    const themeJson = JSON.stringify(theme, null, 2)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(themeJson)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    const handleDownload = () => {
        const blob = new Blob([themeJson], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${theme.name.replace(/\s+/g, '-').toLowerCase()}-theme.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-6">
            {/* Export Actions */}
            <div className="flex gap-4 justify-center">
                <Button
                    onClick={handleCopy}
                    disabled={copied}
                    className="flex items-center gap-2"
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy JSON'}
                </Button>

                <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="flex items-center gap-2"
                >
                    <Download className="h-4 w-4" />
                    Download JSON
                </Button>
            </div>

            {/* Theme JSON */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Theme JSON</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-gray-100 text-sm font-mono">
                            {themeJson}
                        </pre>
                    </div>
                </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">How to use this theme</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        <li>Copy the JSON above or download the file</li>
                        <li>Create a new file in VS Code with the content</li>
                        <li>Save it as <code className="bg-gray-100 px-1 rounded text-xs">theme-name-color-theme.json</code></li>
                        <li>Place it in your VS Code themes folder:
                            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                <li><strong>Windows:</strong> <code className="bg-gray-100 px-1 rounded text-xs">%APPDATA%\Code\User\themes\</code></li>
                                <li><strong>macOS:</strong> <code className="bg-gray-100 px-1 rounded text-xs">~/Library/Application Support/Code/User/themes/</code></li>
                                <li><strong>Linux:</strong> <code className="bg-gray-100 px-1 rounded text-xs">~/.config/Code/User/themes/</code></li>
                            </ul>
                        </li>
                        <li>Restart VS Code</li>
                        <li>Go to Settings → Color Theme and select your theme</li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    )
}

export default ThemeExporter 