import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export const metadata = {
  title: "Verify booking · Reception",
};

export default function VerifyPage({ searchParams }) {
  return (
    <Suspense fallback={null}>
      <VerifyClient searchParams={searchParams} />
    </Suspense>
  );
}
