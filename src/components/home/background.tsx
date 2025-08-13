"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Background({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until after mount to prevent SSR mismatch
  if (!mounted) {
    return (
      <>
        <div className="absolute inset-0 z-0" />
        <div className="relative z-10 min-h-full">{children}</div>
      </>
    )
  }

  const now = new Date();
  console.log("theme from bg", resolvedTheme, now.toISOString());

  return (
    <div
      className={`min-h-full w-full ${resolvedTheme === "dark" ? "bg-black" : "bg-white"
        } relative`}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            resolvedTheme === "dark"
              ? `
                  radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
                  radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
                  radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
                `
              : `
                  radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
                  radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
                  radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
                `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
