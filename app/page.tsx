"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
}
