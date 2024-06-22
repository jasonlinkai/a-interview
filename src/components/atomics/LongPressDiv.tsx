import React, { useState, useRef, useEffect } from "react";

interface LongPressDivProps {
  onLongPress: () => void;
  ms?: number; // Threshold for long press in milliseconds, default to 500ms
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const LongPressDiv: React.FC<LongPressDivProps> = ({
  onLongPress,
  ms = 50,
  children,
  style,
}) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevUpdater = useRef(0);
  const [updater, setUpdater] = useState(0);

  const handleMouseDown = () => {
    setIsLongPress(true);
  };

  const handleMouseUp = () => {
    setIsLongPress(false);
  };

  useEffect(() => {
    if (isLongPress) {
      intervalRef.current = setInterval(() => {
        setUpdater(Date.now());
      }, ms);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isLongPress, ms]);

  useEffect(() => {
    if (updater - prevUpdater.current > ms) {
      prevUpdater.current = updater;
      onLongPress();
    }
  }, [updater, ms, onLongPress]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={style}
    >
      {children}
    </div>
  );
};

export default LongPressDiv;
