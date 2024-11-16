import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-dvh w-full bg-[#f5f5f5]">
        <Header />
        <div className="h-full w-full">{children}</div>
      </main>
    </>
  );
}
