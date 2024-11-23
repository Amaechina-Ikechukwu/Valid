"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-white text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
              [--white-gradient:repeating-linear-gradient(100deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.8)_7%,rgba(255,255,255,0)_10%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.8)_10%)]
              [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#9333ea_15%,#3b82f6_20%,#9333ea_25%,#3b82f6_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[20px]
              after:content-[""] 
              after:absolute 
              after:inset-0 
              after:[background-image:var(--white-gradient),var(--aurora)]
              after:[background-size:200%,_100%] 
              after:animate-aurora 
              after:[background-attachment:fixed] 
              after:mix-blend-soft-light
              pointer-events-none
              absolute 
              -inset-[10px] 
              opacity-40 
              will-change-transform
              animate-aurora`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          />
        </div>

        {children}
      </div>
    </main>
  );
};
