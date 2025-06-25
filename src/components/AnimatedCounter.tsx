import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
  /**
   * The numerical value to display and animate to.
   */
  value: number;
  /**
   * Optional className to be applied to the span element.
   */
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const initialRender = useRef(true);

  useEffect(() => {
    console.log('AnimatedCounter loaded or value changed to:', value);
    const node = nodeRef.current;

    if (!node) {
      return;
    }

    // Set initial value without animation on first render
    if (initialRender.current) {
      node.textContent = value.toLocaleString();
      initialRender.current = false;
      return;
    }
    
    const fromValueText = node.textContent?.replace(/,/g, '') || '0';
    const fromValue = parseInt(fromValueText, 10);

    // No need to animate if value hasn't changed
    if (fromValue === value) {
      return;
    }

    const controls = animate(fromValue, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = Math.round(latest).toLocaleString();
      },
    });

    // Cleanup function to stop the animation if the component unmounts
    // or if the value changes again before the animation completes.
    return () => controls.stop();
  }, [value]);

  return (
    <span
      ref={nodeRef}
      className={`font-heading text-4xl font-bold text-primary tabular-nums ${className}`}
    >
      {/* The initial value is set here and then controlled by the effect */}
    </span>
  );
};

export default AnimatedCounter;