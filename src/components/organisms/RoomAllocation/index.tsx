"use client";
import React, { useMemo } from "react";
import styles from "@/components/organisms/RoomAllocation/RoomAllocation.module.scss";
import {
  GuestDescription,
  RoomDetail,
} from "@/utils/roomHelpers";
import CustomInputNumber from "@/components/molecules/CustomInputNumber";

export const testIds = {};

interface RoomAllocationProps {
  guest: GuestDescription;
  rooms: RoomDetail[];
  onChange?: (result: RoomDetail[]) => void;
}

const RoomAllocation: React.FC<RoomAllocationProps> = ({
  guest,
  rooms,
  onChange,
}) => {
  const totalAdult = useMemo(() => {
    return guest.adult;
  }, [guest]);

  const totalChild = useMemo(() => {
    return guest.child;
  }, [guest]);

  const totalGuest = useMemo(() => {
    return totalAdult + totalChild;
  }, [totalAdult, totalChild]);

  const assingedAdult = useMemo(() => {
    return rooms.reduce((acc, room) => {
      return acc + room.adult;
    }, 0);
  }, [rooms]);

  const assingedChild = useMemo(() => {
    return rooms.reduce((acc, room) => {
      return acc + room.child;
    }, 0);
  }, [rooms]);

  const assingedGuest = useMemo(() => {
    return assingedAdult + assingedChild;
  }, [assingedAdult, assingedChild]);

  const unassingedAdult = useMemo(() => {
    return totalAdult - assingedAdult;
  }, [totalAdult, assingedAdult]);

  const unassingedChild = useMemo(() => {
    return totalChild - assingedChild;
  }, [totalChild, assingedChild]);

  const unassingedGuest = useMemo(() => {
    return unassingedAdult + unassingedChild;
  }, [unassingedAdult, unassingedChild]);

  const disableAllIncrement = useMemo(() => {
    return totalGuest === assingedGuest;
  }, [totalGuest, assingedGuest]);

  return (
    <div className={styles.roomAllocationWrap}>
      <h3 className={styles.roomAllocationHeader}>
        住客人數：{totalAdult}位大人，{totalChild}位小孩 / {rooms.length}房
      </h3>
      <div className={styles.roomAllocationDetails}>
        尚未分配人數：{unassingedAdult}位大人，{unassingedChild}位小孩 /{" "}
        {rooms.length}房
      </div>
      {rooms.map((room, i) => {
        const { id, capacity, adult, child } = room;
        const isTail = rooms.length === i + 1;
        const isRoomFull = adult + child > capacity;
        const disableIncrement = disableAllIncrement || isRoomFull;
        return (
          <section
            key={id}
            className={styles.sectionWrap}
            style={
              isTail
                ? { borderBottomWidth: "0px", marginBottom: "0px" }
                : void 0
            }
          >
            <h4 className={styles.sectionHeader}>
              房間：{room.adult + room.child}人
            </h4>
            <div className={styles.sectionInputArea}>
              <div className={styles.inputAreaLeft}>
                <label className={styles.leftLabel}>大人</label>
                <span className={styles.leftSpan}>年齡20+</span>
              </div>
              <CustomInputNumber
                name="adult"
                value={room.adult}
                disabledIncrement={disableIncrement}
                onChange={(e) => {
                  onChange &&
                  onChange(
                    rooms.map((room) => {
                      if (room.id === id) {
                        return {
                          ...room,
                          adult: Number(e.target.value),
                        };
                      } else {
                        return room;
                      }
                    })
                  );
                }}
              ></CustomInputNumber>
            </div>
            <div className={styles.sectionInputArea}>
              <div className={styles.inputAreaLeft}>
                <label className={styles.leftLabel}>小孩</label>
              </div>
              <CustomInputNumber
                name="child"
                value={room.child}
                disabledIncrement={disableIncrement}
                onChange={(e) => {
                  onChange &&
                    onChange(
                      rooms.map((room) => {
                        if (room.id === id) {
                          return {
                            ...room,
                            child: Number(e.target.value),
                          };
                        } else {
                          return room;
                        }
                      })
                    );
                }}
              ></CustomInputNumber>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default RoomAllocation;
