import { useState } from 'react';

const useToggle = (
  state: boolean,
): [boolean, () => void, () => void, () => void] => {
  const [isVisible, setIsVisible] = useState(state);

  const onOpen = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const onToggle = () => {
    setIsVisible(!isVisible);
  };

  return [isVisible, onOpen, onClose, onToggle];
};

export default useToggle;
