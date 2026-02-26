import type { ReactNode } from "react";
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold leading-tight">Content Analytics</h1>
            <p className="text-sm text-neutral-500">Dashboard</p>
          </div>

          <div className="text-sm text-neutral-500">
            <span className="rounded-full border bg-white px-3 py-1">
              MVP v1
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}