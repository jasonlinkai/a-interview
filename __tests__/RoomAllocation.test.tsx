import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { getDefaultRoomAllocation } from "@/utils/roomHelpers";
import RoomAllocation, { testIds } from "@/components/organisms/RoomAllocation";
import { testIds as customInputNumberTestIds } from "@/components/molecules/CustomInputNumber";
import { testData } from "@/data/roomAllocation";
import { RoomDetail } from "@/utils/roomHelpers";

const defaultProps = Object.freeze({
  guest: testData[0].input.guest,
  rooms: getDefaultRoomAllocation(
    testData[0].input.guest,
    testData[0].input.rooms
  ),
});

const defaultProps2 = Object.freeze({
  guest: testData[1].input.guest,
  rooms: getDefaultRoomAllocation(
    testData[1].input.guest,
    testData[1].input.rooms
  ),
});

describe("test RoomAllocation", () => {
  it("check RoomAllocation header display coorrectly", () => {
    render(
      <RoomAllocation guest={defaultProps.guest} rooms={defaultProps.rooms} />
    );
    expect(
      within(screen.getByTestId(testIds.header)).getByText(
        `住客人數：${defaultProps.guest.adult}位大人，${defaultProps.guest.child}位小孩 / ${defaultProps.rooms.length}房`
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(testIds.detail)).getByText(
        `尚未分配人數：0位大人，0位小孩 / ${defaultProps.rooms.length}房`
      )
    ).toBeInTheDocument();
  });
  it("check RoomAllocation guest and rooms prop work properly ", () => {
    const { rerender } = render(
      <RoomAllocation guest={defaultProps.guest} rooms={defaultProps.rooms} />
    );
    rerender(
      <RoomAllocation guest={defaultProps2.guest} rooms={defaultProps2.rooms} />
    );
    expect(
      within(screen.getByTestId(testIds.header)).getByText(
        `住客人數：${defaultProps2.guest.adult}位大人，${defaultProps2.guest.child}位小孩 / ${defaultProps2.rooms.length}房`
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(testIds.detail)).getByText(
        `尚未分配人數：0位大人，0位小孩 / ${defaultProps2.rooms.length}房`
      )
    ).toBeInTheDocument();
  });
  it("check RoomAllocation result length is not exceed total", () => {
    let result: RoomDetail[] = [];
    const onChange = jest.fn((r: RoomDetail[]) => {
      result = r;
    });
    render(
      <RoomAllocation
        guest={defaultProps.guest}
        rooms={defaultProps.rooms}
        onChange={onChange}
      />
    );
    const incrementButton = screen.getAllByTestId(
      customInputNumberTestIds.incrementButton
    )?.[0];
    fireEvent(
      incrementButton,
      new FocusEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    const totalGuest = defaultProps.guest.adult + defaultProps.guest.child;
    const totalAssingedGuest = result.reduce((acc, detail) => {
      acc += detail.adult;
      acc += detail.child;
      return acc;
    }, 0);
    expect(totalAssingedGuest <= totalGuest).toBe(true);
  });
});
