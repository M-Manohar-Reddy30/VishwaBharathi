"use client";

import Breadcrumb from "./Breadcrumb";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <Breadcrumb />

      <UserMenu />
    </header>
  );
}