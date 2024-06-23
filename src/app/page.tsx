"use client";
import CustomInputNumber from "@/components/molecules/CustomInputNumber";
import { useState } from "react";

export default function Home() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => console.log(e);
  const [value, setValue] = useState("0");
  const [max, setMax] = useState(100);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-500px h-full bg-white">
        <CustomInputNumber
          value={value}
          max={max}
          min={0}
          onChange={onChange}
          onBlur={onBlur}
        ></CustomInputNumber>
      </div>
    </main>
  );
}
