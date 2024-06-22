// components/CustomInputNumber.test.js
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import CustomInputNumber, {
  testIds,
} from "@/components/molecules/CustomInputNumber";
import { describe } from "node:test";

const defaultProps = Object.freeze({
  max: 100,
  min: 0,
  value: 99,
  name: "custom_input_number_name",
});

describe("test props of CustomInputNumber", () => {
  beforeEach(() => {
    render(
      <CustomInputNumber
        max={defaultProps.max}
        min={defaultProps.min}
        value={defaultProps.value}
        name={defaultProps.name}
      />
    );
  });
  it("check max prop work properly", () => {
    const incrementButton = screen.getByTestId(testIds.incrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    for (let i = 0; i <= defaultProps.max - defaultProps.value; i++) {
      fireEvent(
        incrementButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    }
    expect(input.value).toBe(`${defaultProps.max}`);
  });
  it("check min prop work properly", () => {
    const decrementButton = screen.getByTestId(testIds.decrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    for (let i = 0; i <= defaultProps.value; i++) {
      fireEvent(
        decrementButton,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    }
    expect(input.value).toBe(`${defaultProps.min}`);
  });
  it("check onChange prop work properly", () => {
    cleanup();
    let eventTargetName;
    let eventTargetValue;
    const onChange = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      eventTargetName = e.target.name;
      eventTargetValue = e.target.value;
    });
    render(
      <CustomInputNumber
        max={defaultProps.max}
        min={defaultProps.min}
        value={defaultProps.value}
        name={defaultProps.name}
        onChange={onChange}
      />
    );
    const incrementButton = screen.getByTestId(testIds.incrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      incrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value + 1}`);
    expect(eventTargetValue).toBe(`${defaultProps.value + 1}`);
    expect(eventTargetName).toBe(defaultProps.name);
  });
  it("check decrementButton work properly", () => {
    const decrementButton = screen.getByTestId(testIds.decrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      decrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value - 1}`);
  });
  it("check incrementButton work properly", () => {
    const incrementButton = screen.getByTestId(testIds.incrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      incrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value + 1}`);
  });
});
