import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HexColorPicker } from 'react-colorful'
import { useState, useRef, useEffect } from 'react'

interface ColorInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    description?: string
}

// Global state to track which color picker is open
let activeColorPickerId: string | null = null
const colorPickerInstances = new Set<string>()

const ColorInput = ({
    label,
    value,
    onChange,
    description
}: ColorInputProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const instanceId = useRef<string>(`color-picker-${Math.random().toString(36).substr(2, 9)}`)

    // Register this instance
    useEffect(() => {
        colorPickerInstances.add(instanceId.current)
        return () => {
            colorPickerInstances.delete(instanceId.current)
            if (activeColorPickerId === instanceId.current) {
                activeColorPickerId = null
            }
        }
    }, [])

    // Close dropdown when clicking outside or pressing Escape
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node

            // Check if click is outside this specific color picker
            const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target)
            const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target)

            if (isOutsideButton && isOutsideDropdown && isOpen) {
                setIsOpen(false)
                activeColorPickerId = null
            }
        }

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false)
                activeColorPickerId = null
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isOpen])

    const toggleDropdown = () => {
        if (isOpen) {
            // Close this picker
            setIsOpen(false)
            activeColorPickerId = null
        } else {
            // Close any other open picker first
            if (activeColorPickerId && activeColorPickerId !== instanceId.current) {
                // Trigger a custom event to close other pickers
                window.dispatchEvent(new CustomEvent('closeColorPickers', {
                    detail: { except: instanceId.current }
                }))
            }

            // Open this picker
            setIsOpen(true)
            activeColorPickerId = instanceId.current
        }
    }

    // Listen for close events from other pickers
    useEffect(() => {
        const handleCloseEvent = (event: CustomEvent) => {
            if (event.detail.except !== instanceId.current && isOpen) {
                setIsOpen(false)
                if (activeColorPickerId === instanceId.current) {
                    activeColorPickerId = null
                }
            }
        }

        window.addEventListener('closeColorPickers', handleCloseEvent as EventListener)

        return () => {
            window.removeEventListener('closeColorPickers', handleCloseEvent as EventListener)
        }
    }, [isOpen])

    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium h-6 flex items-center">
                {label}

            </Label>
            <div className="flex gap-2 relative">
                <Button
                    ref={buttonRef}
                    variant="outline"
                    className="w-16 h-10 p-0 border-2 hover:opacity-80 transition-opacity flex-shrink-0"
                    style={{ backgroundColor: value }}
                    onClick={toggleDropdown}
                >
                    <span className="sr-only">Pick a color</span>
                </Button>

                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50"
                    >
                        <HexColorPicker color={value} onChange={onChange} />
                    </div>
                )}

                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000"
                    className="font-mono text-sm border-gray-400 h-10"
                />
            </div>
        </div>
    )
}

export default ColorInput 