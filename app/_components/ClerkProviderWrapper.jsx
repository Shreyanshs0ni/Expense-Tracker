"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const ClerkProviderWrapper = ({ children }) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
