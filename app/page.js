"use client";
import Feed from "@/Components/Feed";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <section className="w-full flexCenter flex-col">
      <Feed />
      <Link href={"/emailSub"}>
        {" "}
        <button className="text-white bg-slate-500 "> Click me</button>
      </Link>
    </section>
  );
}
