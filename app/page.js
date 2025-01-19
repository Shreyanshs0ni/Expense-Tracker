"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log("pathname", pathname);

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (
    isSignedIn &&
    (pathname.includes("welcome") ||
      pathname.includes("sign-in") ||
      pathname.includes("sign-up"))
  ) {
    router.replace("/dashboard");
  } else {
    router.replace("/welcome");
  }

  return null;
}
