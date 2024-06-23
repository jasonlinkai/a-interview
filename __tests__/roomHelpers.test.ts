import { getDefaultRoomAllocation } from "@/utils/roomHelpers";
import { testData } from "@/data/roomAllocation";

describe("roomHelpers", () => {
  test.each(testData)("test getDefaultRoomAllocation function", (data) => {
    expect(
      JSON.stringify(
        getDefaultRoomAllocation(data.input.guest, data.input.rooms)
      )
    ).toBe(JSON.stringify(data.expected));
  });
});
