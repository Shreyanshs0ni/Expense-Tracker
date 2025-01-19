"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const AuthChecker = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded) {
      if (
        !isSignedIn &&
        !pathname.includes("sign-in") &&
        !pathname.includes("sign-up")
      ) {
        router.replace("/welcome");
      }
      if (
        isSignedIn &&
        (pathname.includes("welcome") ||
          pathname.includes("sign-in") ||
          pathname.includes("sign-up"))
      ) {
        router.replace("/dashboard");
      }
    }
  }, [isLoaded, isSignedIn, router, pathname]);

  if (!isLoaded) {
    return <Loader />;
  }

  return null; // or you can return a placeholder component
};

export default AuthChecker;
