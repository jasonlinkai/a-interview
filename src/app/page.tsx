import CustomInputNumber from "@/components/molecules/CustomInputNumber";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-500px h-full bg-white">
        <CustomInputNumber value={100} max={100} min={0}></CustomInputNumber>
      </div>
    </main>
  );
}
