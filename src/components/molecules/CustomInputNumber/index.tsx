"use client";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./CustomInputNumber.module.scss";
import LongPressDiv from "@/components/atomics/LongPressDiv";

interface CustomInputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  max?: number;
  min?: number;
  step?: number;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({ ...rest }) => {
  const {
    disabled = false,
    step = 1,
    max = Infinity,
    min = -Infinity,
    value = 0,
  } = rest;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(Number(value) || 0);

  const handleIncrement = () => {
    if (inputRef.current) {
      const newValue = inputValue + step;
      if (newValue <= max) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, newValue);
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    }
  };

  const handleDecrement = () => {
    if (inputRef.current) {
      const newValue = inputValue - step;
      if (newValue >= min) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, newValue);
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);
    if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }
    setInputValue(newValue);
  };

  return (
    <div className={styles.customInputWrap}>
      <LongPressDiv onLongPress={handleDecrement}>
        <button
          className={clsx([
            styles.controlButton,
            {
              [styles.controlButtonDisabled]: disabled || inputValue <= min,
            },
          ])}
          onClick={disabled ? void 0 : handleDecrement}
          disabled={inputValue <= min}
        >
          -
        </button>
      </LongPressDiv>
      <input
        ref={inputRef}
        type="number"
        className={styles.input}
        {...rest}
        value={inputValue}
        onChange={handleChange}
      />
      <LongPressDiv onLongPress={handleIncrement}>
        <button
          className={clsx([
            styles.controlButton,
            {
              [styles.controlButtonDisabled]: disabled || inputValue >= max,
            },
          ])}
          onClick={disabled ? void 0 : handleIncrement}
          disabled={inputValue >= max}
        >
          +
        </button>
      </LongPressDiv>
    </div>
  );
};

export default CustomInputNumber;
