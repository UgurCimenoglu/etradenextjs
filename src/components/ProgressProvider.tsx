"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("pprograss tetiklendi")
  return (
    <>
      <ProgressBar
        height="4px"
        color="#3fc8ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default ProgressProvider;
