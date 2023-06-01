import debounce from 'lodash/debounce';
import { useState, useMemo } from 'react';

function useInput(initialState = '', debounceTime = 0) {
  const [state, setState] = useState<string>(initialState);

  const handlers = useMemo(
    () => ({
      handleInputChange: debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e?.target?.value);
      }, debounceTime),
      resetInput() {
        setState(initialState);
      },
    }),
    [initialState, debounceTime],
  );

  return [state, handlers] as [string, typeof handlers];
}

export default useInput;
