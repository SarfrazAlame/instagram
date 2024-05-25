import Header from "@/components/Header";
import React from "react";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
