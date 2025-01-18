"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <Loader />;
  }

  if (isSignedIn) {
    router.replace("/dashboard");
  } else {
    router.replace("/welcome");
  }
}
