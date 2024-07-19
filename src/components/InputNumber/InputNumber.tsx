import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './InputNumber.css';

type InputNumberProps = {
  value: number;
  min?: number;
  max?: number;
  postfix?: string;
  onChange?: (value: number | undefined) => void;
};

function getValue(
  event: ChangeEvent<HTMLInputElement>,
  min?: number,
  max?: number
): number | undefined {
  const value = Number(event.target.value);
  if (!value) return;
  if (min && value < min) return min;
  if (max && value > max) return max;
  if (value.toString().includes('.')) return Number(value.toFixed(2));
  return value;
}

function InputNumber({
  value: initialValue,
  min,
  max,
  postfix,
  onChange,
}: InputNumberProps) {
  const [value, setValue] = useState<number | undefined>(initialValue);
  const ref = useRef<HTMLInputElement | undefined>();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.width = `${ref.current.value.toString().length}ch`;
    }
  }, [ref]);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      if (ref.current) {
        ref.current.style.width = `${initialValue.toString().length}ch`;
      }
    }
  }, [initialValue]);

  return (
    <div className='flex items-end gap-2 font-semibold'>
      <input
        type='number'
        inputMode='decimal'
        className='text-4xl outline-none text-right min-w-10'
        value={value}
        ref={ref as any}
        onChange={(e) => {
          const newValue = getValue(e, min, max);
          if (ref.current && newValue)
            ref.current.style.width = `${newValue.toString().length}ch`;
          setValue(newValue);
          onChange?.(newValue);
        }}
      />
      {postfix && <div className='text-lg'>{postfix}</div>}
    </div>
  );
}

export default InputNumber;
