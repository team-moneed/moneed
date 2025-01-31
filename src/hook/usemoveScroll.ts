import { RefObject } from 'react';

function useMoveScroll(ref: RefObject<HTMLDivElement>) {
  const onMoveToElement = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return { onMoveToElement };
}

export default useMoveScroll;
