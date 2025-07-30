import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ColorInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    description?: string
}

const ColorInput = ({
    label,
    value,
    onChange,
    description
}: ColorInputProps) => (
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
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-16 h-10 p-0 border-2 hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: value }}
                    >
                        <span className="sr-only">Pick a color</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3 bg-red-500" align="start">
                    <HexColorPicker color={value} onChange={onChange} />
                </PopoverContent>
            </Popover>
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

export default ColorInput 