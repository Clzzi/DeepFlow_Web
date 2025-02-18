import { useState, useCallback, useEffect, useRef, memo, MouseEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./ScrollProgress.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ScrollProgress = (): JSX.Element => {
  const [width, setWidth] = useState<number>(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressMove = useCallback((e: MouseEvent<HTMLDivElement>): void => {
    if (progressRef.current !== null) {
      const { scrollWidth } = progressRef.current;
      const { clientX } = e;

      const selectedPercent: number = ((clientX / scrollWidth) * 100);
      setWidth(selectedPercent);
      
      const { scrollHeight, clientHeight } = document.body;
      const windowHeight: number = scrollHeight - clientHeight;

      const moveScrollPercent: number = ((windowHeight * selectedPercent) / 100);

      window.scrollTo({
        top: moveScrollPercent,
        behavior: 'smooth',
      })
    }
  }, []);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      setWidth(0);
      return;
    }

    const windowHeight: number = scrollHeight - clientHeight;
    const currentPercent: number = (scrollTop / windowHeight);

    setWidth(currentPercent * 100);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    }
  }, [handleScroll]);

  return (
    <div className={cx('ScrollProgress')} ref={progressRef} onClick={handleProgressMove}>
      <div className={cx('ScrollProgress-Progress')} style={{ width: width + '%' }}></div>
    </div>
  );
};

export default memo(ScrollProgress);