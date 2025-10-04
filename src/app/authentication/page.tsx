"use client";

import { Suspense } from "react";

import Authentication from "./authentication";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Authentication />
    </Suspense>
  );
}
