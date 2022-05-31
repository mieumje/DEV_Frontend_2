import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;

const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border: 2px solid #44a;
  background-color: white;
  border-radius: 50%;
  cursor: grab;
`;

const Slider = ({
  min = 0,
  max = 100,
  step = 0.1,
  defaultValue,
  onChange,
  ...props
}) => {
  const sliderRef =  useRef(null);
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(defaultValue ? defaultValue : min);

  const handleMouseDown = useCallback(() => {
    console.log(123);
    setDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    console.log(456);
    setDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;

      const handleOffset = e.pageX - sliderRef.current.offsetLeft;
      const sliderWidth = sliderRef.current.offsetWidth;

      const track = handleOffset / sliderWidth;
      if (track < 0) {
        setValue(min);
      } else if (track > 1) {
        setValue(max);
      } else {
        const newValue = min + (max - min) * track;
        setValue(newValue);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [value, min, max, dragging, sliderRef, handleMouseUp]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail />
      <Handle onMouseDown={handleMouseDown} style={{ left : `${percentage}%`}}/>
    </SliderContainer>
  )
};

export default Slider;