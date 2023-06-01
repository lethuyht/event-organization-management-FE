import { Popover } from 'antd';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { DEFAULT_COLOR_VALUE } from '#/shared/utils/constant';

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(value);

  return (
    <div className="flex flex-col gap-2">
      <Popover
        content={
          <SketchPicker
            color={selectedColor}
            onChangeComplete={color => {
              onChange?.(color.hex);
              setSelectedColor(color.hex);
            }}
          />
        }
        trigger="click"
      >
        <div
          className="flex h-full w-full items-center justify-center border-[1px] border-[#d9d9d9] p-4 hover:border-primary-color"
          style={{ backgroundColor: selectedColor ?? DEFAULT_COLOR_VALUE }}
        />
      </Popover>
      <p className="m-0 uppercase">{selectedColor ?? DEFAULT_COLOR_VALUE}</p>
    </div>
  );
}

export default ColorPicker;
