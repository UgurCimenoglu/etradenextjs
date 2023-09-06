"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("pprograss tetiklendi");
  return (
    <div>
      <ProgressBar
        height="4px"
        color="#3fc8ff"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </div>
  );
};

export default ProgressProvider;
