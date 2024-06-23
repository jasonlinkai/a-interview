import { getDefaultRoomAllocation } from "@/utils/roomHelpers";

const testData = [
  {
    input: {
      guest: { adult: 4, child: 2 },
      rooms: [
        {
          id: 0,
          roomPrice: 1000,
          adultPrice: 200,
          childPrice: 100,
          capacity: 4,
        },
        { id: 1, roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
      ],
    },
    expected: [
      {
        id: 0,
        roomPrice: 1000,
        adultPrice: 200,
        childPrice: 100,
        capacity: 4,
        adult: 2,
        child: 2,
        price: 1600,
      },
      {
        id: 1,
        roomPrice: 0,
        adultPrice: 500,
        childPrice: 500,
        capacity: 4,
        adult: 2,
        child: 0,
        price: 1000,
      },
    ],
  },
  {
    input: {
      guest: { adult: 7, child: 3 },
      rooms: [
        {
          id: 0,
          roomPrice: 2000,
          adultPrice: 200,
          childPrice: 100,
          capacity: 4,
        },
        {
          id: 1,
          roomPrice: 2000,
          adultPrice: 200,
          childPrice: 100,
          capacity: 4,
        },
        {
          id: 2,
          roomPrice: 2000,
          adultPrice: 400,
          childPrice: 200,
          capacity: 2,
        },
        {
          id: 3,
          roomPrice: 2000,
          adultPrice: 400,
          childPrice: 200,
          capacity: 2,
        },
      ],
    },
    expected: [
      {
        id: 0,
        roomPrice: 2000,
        adultPrice: 200,
        childPrice: 100,
        capacity: 4,
        adult: 4,
        child: 0,
        price: 2800,
      },
      {
        id: 1,
        roomPrice: 2000,
        adultPrice: 200,
        childPrice: 100,
        capacity: 4,
        adult: 2,
        child: 2,
        price: 2600,
      },
      {
        id: 2,
        roomPrice: 2000,
        adultPrice: 400,
        childPrice: 200,
        capacity: 2,
        adult: 1,
        child: 1,
        price: 2600,
      },
      {
        id: 3,
        roomPrice: 2000,
        adultPrice: 400,
        childPrice: 200,
        capacity: 2,
        adult: 0,
        child: 0,
        price: 0,
      },
    ],
  },
  {
    input: {
      guest: { adult: 4, child: 2 },
      rooms: [
        {
          id: 0,
          roomPrice: 1000,
          adultPrice: 200,
          childPrice: 100,
          capacity: 2,
        },
        { id: 1, roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
      ],
    },
    expected: [
      {
        id: 0,
        roomPrice: 1000,
        adultPrice: 200,
        childPrice: 100,
        capacity: 2,
        adult: 1,
        child: 1,
        price: 1300,
      },
      {
        id: 1,
        roomPrice: 0,
        adultPrice: 500,
        childPrice: 500,
        capacity: 4,
        adult: 3,
        child: 1,
        price: 2000,
      },
    ],
  },
];

describe("roomHelpers", () => {
  test.each(testData)("test getDefaultRoomAllocation function", (data) => {
    expect(
      JSON.stringify(
        getDefaultRoomAllocation(data.input.guest, data.input.rooms)
      )
    ).toBe(JSON.stringify(data.expected));
  });
});
