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
  step: 1,
  value: 99,
  name: "custom_input_number_name",
});

describe("test props of CustomInputNumber", () => {
  beforeEach(() => {
    render(
      <CustomInputNumber
        max={defaultProps.max}
        min={defaultProps.min}
        step={defaultProps.step}
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
  it("check max prop still properly after being changed", () => {
    cleanup();
    const { rerender } = render(
      <CustomInputNumber
        max={6}
        min={defaultProps.min}
        step={2}
        value={4}
        name={defaultProps.name}
      />
    );
    rerender(
      <CustomInputNumber
        max={5}
        min={defaultProps.min}
        step={2}
        value={4}
        name={defaultProps.name}
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
    expect(input.value).toBe(`${5}`);
  });
  it("check min prop still properly after being changed", () => {
    cleanup();
    const { rerender } = render(
      <CustomInputNumber
        max={defaultProps.max}
        min={2}
        step={2}
        value={4}
        name={defaultProps.name}
      />
    );
    rerender(
      <CustomInputNumber
        max={defaultProps.max}
        min={3}
        step={2}
        value={4}
        name={defaultProps.name}
      />
    );
    const decrementButton = screen.getByTestId(testIds.decrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      decrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${3}`);
  });
  it("check step prop work properly", () => {
    const step = 2;
    cleanup();
    render(
      <CustomInputNumber
        max={defaultProps.max}
        min={defaultProps.min}
        value={defaultProps.value}
        step={step}
      />
    );
    const decrementButton = screen.getByTestId(testIds.decrementButton);
    const incrementButton = screen.getByTestId(testIds.incrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      decrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      decrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value - step * 2}`);
    fireEvent(
      incrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value - step}`);
  });
  it("check disabled prop work properly", () => {
    cleanup();
    render(
      <CustomInputNumber
        max={defaultProps.max}
        min={defaultProps.min}
        value={defaultProps.value}
        name={defaultProps.name}
        disabled={true}
      />
    );
    const decrementButton = screen.getByTestId(testIds.decrementButton);
    const incrementButton = screen.getByTestId(testIds.incrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      decrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value}`);
    fireEvent(
      incrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(input.value).toBe(`${defaultProps.value}`);
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
  it("check onBlur prop work properly", () => {
    cleanup();
    let eventTargetName;
    let eventTargetValue;
    const onBlur = jest.fn((e: React.FocusEvent<HTMLInputElement>) => {
      eventTargetName = e.target.name;
      eventTargetValue = e.target.value;
    });
    render(
      <CustomInputNumber
        max={defaultProps.max}
        min={defaultProps.min}
        value={defaultProps.value}
        name={defaultProps.name}
        onBlur={onBlur}
      />
    );
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    fireEvent(
      input,
      new FocusEvent("focus", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent.blur(input);
    expect(eventTargetName).toBe(defaultProps.name);
    expect(eventTargetValue).toBe(`${defaultProps.value}`);
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
  it("check input event is fired when button click", () => {
    const decrementButton = screen.getByTestId(testIds.decrementButton);
    const incrementButton = screen.getByTestId(testIds.incrementButton);
    const input: HTMLInputElement = screen.getByTestId(testIds.input);
    let times = 0;
    input.addEventListener("input", (e) => {
      times++;
    });
    fireEvent(
      incrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      decrementButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(times).toBe(2);
  });
});
