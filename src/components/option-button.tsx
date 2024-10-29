import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, Control } from 'react-hook-form'

interface OptionButtonProps {
  label: string
  inputName: string
  control: Control<any>
  errors: Record<string, { message: string }>
}

export function OptionButton({ label, inputName, control, errors }: OptionButtonProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input {label}</DialogTitle>
          <DialogDescription>Enter a value for Input {label}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor={inputName}>Input {label}</Label>
          <Controller
            name={inputName}
            control={control}
            render={({ field }) => (
              <Input
                id={inputName}
                {...field}
                placeholder="Type something..."
                className="mt-1"
              />
            )}
          />
          {errors[inputName] && (
            <p className="text-sm text-red-500 mt-1">{errors[inputName].message}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}