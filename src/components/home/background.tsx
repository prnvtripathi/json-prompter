"use client"

import { useTheme } from "next-themes";

export function Background({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  console.log("theme", theme)

  return (
    <div className={`min-h-screen w-full ${theme === "dark" ? "bg-black" : "bg-white"} relative`}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: theme === "dark"
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

/*
Light background:
<div className="min-h-screen w-full bg-white relative">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
        `,
      }}
    />
  </div>

  Dark background:
  <div className="min-h-screen w-full bg-black relative">
<div
    className="absolute inset-0 z-0"
    style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
        `,
    }}
/>
  </div >

*/