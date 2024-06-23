"use client";
import React, { useMemo, useState } from "react";
import styles from "@/components/organisms/RoomAllocation/RoomAllocation.module.scss";
import {
  GuestDescription,
  RoomDescription,
  RoomDetail,
} from "@/utils/roomHelpers";
import CustomInputNumber from "@/components/molecules/CustomInputNumber";
import useTheme from "@/hooks";

export const testIds = {};

interface RoomAllocationProps {
  guest: GuestDescription;
  rooms: RoomDetail[];
  onChange?: (result: RoomDescription) => void;
}

const RoomAllocation: React.FC<RoomAllocationProps> = ({
  guest,
  rooms,
  onChange,
}) => {
  return (
    <div className={styles.roomAllocationWrap}>
      <h3 className={styles.roomAllocationHeader}>
        住客人數：{guest.adult}位大人，{guest.child}位小孩 / {rooms.length}房
      </h3>
      <details>尚未分配人數：{}</details>
      {rooms.map((room, i) => {
        const isTail = rooms.length === i + 1;
        return (
          <section
            key={i}
            className={styles.sectionWrap}
            style={isTail ? { borderBottomWidth: "0px" } : void 0}
          >
            <h4 className={styles.sectionHeader}>
              房間：{room.adult + room.child}人
            </h4>
            <div className={styles.sectionInputArea}>
              <div className={styles.inputAreaLeft}>
                <label className={styles.leftLabel}>大人</label>
                <span className={styles.leftSpan}>年齡20+</span>
              </div>
              <CustomInputNumber></CustomInputNumber>
            </div>
            <div className={styles.sectionInputArea}>
              <div className={styles.inputAreaLeft}>
                <label className={styles.leftLabel}>小孩</label>
              </div>
              <CustomInputNumber></CustomInputNumber>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default RoomAllocation;
