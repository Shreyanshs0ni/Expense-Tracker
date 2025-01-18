"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const AuthChecker = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  console.log("isSignedIn", isSignedIn);
  console.log("isLoaded", isLoaded);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace("/dashboard");
      } else {
        router.replace("/welcome");
      }
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <Loader />;
  }

  return null; // or you can return a placeholder component
};

export default AuthChecker;
