export interface GuestDescription {
  adult: number;
  child: number;
}

export interface RoomDescription {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export interface RoomDetail {
  adult: number;
  child: number;
  price: number;
}

export interface DpCell {
  adult: number;
  child: number;
  price: number;
  allocation: { roomIndex?: number; adult: number; child: number }[];
}

export const getDefaultRoomAllocation = (
  guestDescription: GuestDescription = { adult: 0, child: 0 },
  roomDescriptions: RoomDescription[] = []
): RoomDetail[] => {
  const { adult, child } = guestDescription;
  const dp: DpCell[][] = [];

  for (let a = 0; a <= adult; a++) {
    dp[a] = [];
    for (let c = 0; c <= child; c++) {
      dp[a][c] = {
        adult: a,
        child: c,
        price: Infinity,
        allocation: Array(roomDescriptions.length)
          .fill(null)
          .map(() => ({ adult: 0, child: 0 })),
      };
    }
  }

  dp[0][0].price = 0;

  const n = roomDescriptions.length;

  for (let i = 0; i < n; i++) {
    const { roomPrice, adultPrice, childPrice, capacity } = roomDescriptions[i];

    for (let j = adult; j >= 0; j--) {
      for (let k = child; k >= 0; k--) {
        if (dp[j][k].price === Infinity) continue;

        const maxAdultsInRoom = Math.min(capacity, adult - j);
        const maxChildrenInRoom = Math.min(capacity, child - k);

        for (
          let adultsInRoom = 0;
          adultsInRoom <= maxAdultsInRoom;
          adultsInRoom++
        ) {
          for (
            let childrenInRoom = 0;
            childrenInRoom <= maxChildrenInRoom;
            childrenInRoom++
          ) {
            if (adultsInRoom === 0 && childrenInRoom > 0) continue;
            if (adultsInRoom + childrenInRoom > capacity) continue; // 確保房間容量限制

            const nextAdults = j + adultsInRoom;
            const nextChildren = k + childrenInRoom;
            const nextPrice =
              dp[j][k].price +
              roomPrice +
              adultsInRoom * adultPrice +
              childrenInRoom * childPrice;

            if (nextPrice < dp[nextAdults][nextChildren].price) {
              dp[nextAdults][nextChildren].price = nextPrice;
              dp[nextAdults][nextChildren].allocation = dp[j][k].allocation.map(
                (alloc, index) =>
                  index === i
                    ? {
                        roomIndex: i,
                        adult: adultsInRoom,
                        child: childrenInRoom,
                      }
                    : alloc
              );
            }
          }
        }
      }
    }
  }

  const allocation = dp[adult][child].allocation;
  return allocation.map((alloc) => {
    const roomDescription = roomDescriptions[(alloc.roomIndex as number)];
    return {
      adult: alloc.adult,
      child: alloc.child,
      price: roomDescription ?
        roomDescription.roomPrice +
        alloc.adult * roomDescription.adultPrice +
        alloc.child * roomDescription.childPrice : 0,
    };
  });
};

export const getRoomTotalPrice = (roomDetails: RoomDetail[]): number => {
  return roomDetails.reduce((acc, val) => acc + val.price, 0);
};
