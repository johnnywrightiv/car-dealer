'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
	setInputValue,
	setSliderValue,
	setToggleValue,
} from '@/store/search-form-slice';
import type { RootState } from '@/store/store';

const formSchema = z.object({
	inputA: z.string().nonempty('Input A cannot be empty'),
	sliderLower: z.number().min(0).max(100),
	sliderUpper: z.number().min(0).max(100),
	toggleValue: z.boolean(),
	inputB: z.string().nonempty('Input B cannot be empty'),
	inputC: z.string().nonempty('Input C cannot be empty'),
});

type FormData = z.infer<typeof formSchema>;

export default function AdvancedFormWithDialogs() {
	const [openB, setOpenB] = React.useState(false);
	const [openC, setOpenC] = React.useState(false);
	const dispatch = useDispatch();
	const formState = useSelector((state: RootState) => state.searchForm);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			inputA: formState.inputA,
			sliderLower: formState.sliderLower,
			sliderUpper: formState.sliderUpper,
			toggleValue: formState.toggleValue,
			inputB: formState.inputB,
			inputC: formState.inputC,
		},
	});

	// Watch the slider values for the range inputs
	const sliderLower = watch('sliderLower');
	const sliderUpper = watch('sliderUpper');

	const onSubmit = (data: FormData) => {
		dispatch(setInputValue({ field: 'inputA', value: data.inputA }));
		dispatch(setInputValue({ field: 'inputB', value: data.inputB }));
		dispatch(setInputValue({ field: 'inputC', value: data.inputC }));
		dispatch(setSliderValue({ field: 'sliderLower', value: data.sliderLower }));
		dispatch(setSliderValue({ field: 'sliderUpper', value: data.sliderUpper }));
		dispatch(setToggleValue(data.toggleValue));
		reset(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<div className="space-y-4">
				<div>
					<Label htmlFor="inputA">Input A</Label>
					<Controller
						name="inputA"
						control={control}
						render={({ field }) => (
							<Input id="inputA" {...field} placeholder="Search" />
						)}
					/>
					{errors.inputA && (
						<p className="text-sm text-red-500 mt-1">{errors.inputA.message}</p>
					)}
				</div>

				<div>
          <Label>Price</Label>
          {/* Slider Component */}
          <div className='mt-2'>
            <Controller
              name="sliderLower"
              control={control}
              render={({
                field: { value: lowerValue, onChange: onLowerChange },
              }) => (
                <Controller
                  name="sliderUpper"
                  control={control}
                  render={({
                    field: { value: upperValue, onChange: onUpperChange },
                  }) => (
                    <>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[lowerValue, upperValue]}
                        onValueChange={([lower, upper]) => {
                          onLowerChange(lower);
                          onUpperChange(upper);
                        }}
                        className="w-full" // Full width for the slider
                      />
                    </>
                  )}
                />
              )}
            />
          </div>

          {/* Min/Max Input Fields */}
          <div className="flex items-center justify-between mt-4">
            <Controller
              name="sliderLower"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  type="number"
                  min={0}
                  max={sliderUpper}
                  value={value}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue <= sliderUpper) {
                      onChange(newValue);
                    }
                  }}
                  className="w-20"
                />
              )}
            />
            <span className="mx-2">-</span>
            <Controller
              name="sliderUpper"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  type="number"
                  min={sliderLower}
                  max={100}
                  value={value}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    if (newValue >= sliderLower) {
                      onChange(newValue);
                    }
                  }}
                  className="w-20"
                />
              )}
            />
          </div>

          {/* Error Message */}
          {(errors.sliderLower || errors.sliderUpper) && (
            <p className="text-sm text-red-500 mt-1">Invalid slider range</p>
          )}
				</div>

				<div className="flex items-center space-x-2">
					<Controller
						name="toggleValue"
						control={control}
						render={({ field }) => (
							<Switch
								id="toggleValue"
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						)}
					/>
					<Label htmlFor="toggleValue">Toggle Switch</Label>
				</div>
			</div>
     
      {/* Buttons */}
			<div className="space-x-4">
				<Dialog open={openB} onOpenChange={setOpenB}>
					<DialogTrigger asChild>
						<Button variant="outline">Button B</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Input B</DialogTitle>
							<DialogDescription>Enter a value for Input B</DialogDescription>
						</DialogHeader>
						<div className="py-4">
							<Label htmlFor="inputB">Input B</Label>
							<Controller
								name="inputB"
								control={control}
								render={({ field }) => (
									<Input
										id="inputB"
										{...field}
										placeholder="Type something..."
									/>
								)}
							/>
							{errors.inputB && (
								<p className="text-sm text-red-500 mt-1">
									{errors.inputB.message}
								</p>
							)}
						</div>
						<DialogFooter>
							<Button onClick={() => setOpenB(false)}>Close</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				<Dialog open={openC} onOpenChange={setOpenC}>
					<DialogTrigger asChild>
						<Button variant="outline">Button C</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Input C</DialogTitle>
							<DialogDescription>Enter a value for Input C</DialogDescription>
						</DialogHeader>
						<div className="py-4">
							<Label htmlFor="inputC">Input C</Label>
							<Controller
								name="inputC"
								control={control}
								render={({ field }) => (
									<Input
										id="inputC"
										{...field}
										placeholder="Type something..."
									/>
								)}
							/>
							{errors.inputC && (
								<p className="text-sm text-red-500 mt-1">
									{errors.inputC.message}
								</p>
							)}
						</div>
						<DialogFooter>
							<Button onClick={() => setOpenC(false)}>Close</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<Button type="submit">Search</Button>
		</form>
	);
}
