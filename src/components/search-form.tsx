'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
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
import { OptionButton } from './option-button';

const formSchema = z.object({
  inputA: z.string().nonempty('Input A cannot be empty'),
  sliderLower: z.number().min(0).max(100),
  sliderUpper: z.number().min(0).max(100),
  toggleValue: z.boolean(),
  inputB: z.string().nonempty('Input B cannot be empty'),
  inputC: z.string().nonempty('Input C cannot be empty'),
  inputD: z.string().nonempty('Input D cannot be empty'),
  inputE: z.string().nonempty('Input E cannot be empty'),
  inputF: z.string().nonempty('Input F cannot be empty'),
  inputG: z.string().nonempty('Input G cannot be empty'),
});

type FormData = z.infer<typeof formSchema>;

export default function AdvancedFormWithDialogs() {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.searchForm);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formState,
  });

  const sliderLower = watch('sliderLower');
  const sliderUpper = watch('sliderUpper');

  // Update Redux state when form values change
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name && type === 'change') {
        if (['inputA', 'inputB', 'inputC', 'inputD', 'inputE', 'inputF'].includes(name)) {
          dispatch(setInputValue({ field: name, value: value[name] as string }));
        } else if (name === 'sliderLower' || name === 'sliderUpper') {
          dispatch(setSliderValue({ field: name, value: value[name] as number }));
        } else if (name === 'toggleValue') {
          dispatch(setToggleValue(value[name] as boolean));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const onSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data);
    // Additional submit logic if needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full max-w-4xl mx-auto px-4 mb-4">
      <div className="space-y-6">
        {/* Input A Section */}
        <div className="w-full">
          <Label htmlFor="inputA">Input A</Label>
          <Controller
            name="inputA"
            control={control}
            render={({ field }) => (
              <Input id="inputA" {...field} placeholder="Search" className="mt-1" />
            )}
          />
          {errors.inputA && (
            <p className="text-sm text-red-500 mt-1">{errors.inputA.message}</p>
          )}
        </div>

        {/* Price Slider Section */}
        <div className="w-full">
          <Label>Price</Label>
          <div className="mt-4">
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
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[lowerValue, upperValue]}
                      onValueChange={([lower, upper]) => {
                        onLowerChange(lower);
                        onUpperChange(upper);
                      }}
                      className="w-full"
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Min/Max Input Fields */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
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

          {(errors.sliderLower || errors.sliderUpper) && (
            <p className="text-sm text-red-500 mt-1">Invalid slider range</p>
          )}
        </div>

        {/* Toggle Switch Section */}
        <div className="flex items-center space-x-2 pt-2">
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

      {/* Option Buttons Section */}
      <div className="flex flex-wrap justify-center gap-4">
        <OptionButton label="Button B" inputName="inputB" control={control} errors={errors} />
        <OptionButton label="Button C" inputName="inputC" control={control} errors={errors} />
        <OptionButton label="Button D" inputName="inputD" control={control} errors={errors} />
        <OptionButton label="Button E" inputName="inputE" control={control} errors={errors} />
        <OptionButton label="Button F" inputName="inputF" control={control} errors={errors} />
        <OptionButton label="Button G" inputName="inputG" control={control} errors={errors} />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}