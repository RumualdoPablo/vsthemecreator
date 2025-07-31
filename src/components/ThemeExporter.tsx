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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    onClick={handleCopy}
                    disabled={copied}
                    className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer"
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy JSON'}
                </Button>

                <Button
                    onClick={handleDownload}
                    variant="secondary"
                    className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer"
                >
                    <Download className="h-4 w-4" />
                    Download JSON
                </Button>
            </div>

            {/* Theme JSON */}
            <Card className='border-gray-300'>
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

            {/* How to Use Section */}
            <Card className='border-gray-300'>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-center">
                        How to Use Your VS Code Theme
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Local Usage */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                <span className="mr-2">📁</span>
                                Use Locally
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Method 1: Direct Installation</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-sm">
                                        <li>Download the generated <code className="bg-gray-200 px-1 rounded">.json</code> file</li>
                                        <li>Open VS Code</li>
                                        <li>Press <code className="bg-gray-200 px-1 rounded">Ctrl+Shift+P</code> (Windows/Linux) or <code className="bg-gray-200 px-1 rounded">Cmd+Shift+P</code> (Mac)</li>
                                        <li>Type "Preferences: Open User Settings (JSON)"</li>
                                        <li>Add your theme to the <code className="bg-gray-200 px-1 rounded">workbench.colorCustomizations</code> section</li>
                                    </ol>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Method 2: Theme File</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-sm">
                                        <li>Create a folder: <code className="bg-gray-200 px-1 rounded">~/.vscode/extensions/my-theme</code></li>
                                        <li>Create <code className="bg-gray-200 px-1 rounded">package.json</code> with theme metadata</li>
                                        <li>Create <code className="bg-gray-200 px-1 rounded">themes/theme.json</code> with your theme data</li>
                                        <li>Restart VS Code</li>
                                        <li>Select your theme from Settings → Color Theme</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Extension Development */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                <span className="mr-2">🚀</span>
                                Create Extension
                            </h3>
                            <div className="space-y-3 text-gray-700">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Setup Extension</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-sm">
                                        <li>Install Node.js and npm</li>
                                        <li>Install Yeoman: <code className="bg-gray-200 px-1 rounded">npm install -g yo generator-code</code></li>
                                        <li>Generate extension: <code className="bg-gray-200 px-1 rounded">yo code</code></li>
                                        <li>Choose "New Color Theme" option</li>
                                        <li>Replace the generated theme with your custom theme</li>
                                    </ol>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Publish to Marketplace</h4>
                                    <ol className="list-decimal list-inside space-y-1 text-sm">
                                        <li>Install vsce: <code className="bg-gray-200 px-1 rounded">npm install -g vsce</code></li>
                                        <li>Create publisher account on <a href="https://marketplace.visualstudio.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Visual Studio Marketplace</a></li>
                                        <li>Get Personal Access Token</li>
                                        <li>Package extension: <code className="bg-gray-200 px-1 rounded">vsce package</code></li>
                                        <li>Publish: <code className="bg-gray-200 px-1 rounded">vsce publish</code></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Resources */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">📚 Additional Resources</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <a href="https://code.visualstudio.com/api/extension-guides/color-theme" className="hover:underline" target="_blank" rel="noopener noreferrer">VS Code Color Theme API Documentation</a></li>
                            <li>• <a href="https://code.visualstudio.com/api/working-with-extensions/publishing-extension" className="hover:underline" target="_blank" rel="noopener noreferrer">Publishing Extensions Guide</a></li>
                            <li>• <a href="https://code.visualstudio.com/api/references/theme-color" className="hover:underline" target="_blank" rel="noopener noreferrer">Theme Color Reference</a></li>
                            <li>• <a href="https://code.visualstudio.com/api/references/contribution-points#contributes.themes" className="hover:underline" target="_blank" rel="noopener noreferrer">Theme Contribution Points</a></li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ThemeExporter 