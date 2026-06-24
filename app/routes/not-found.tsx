import { Link, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/not-found";

export function meta(): Route.MetaDescriptors {
  return [{ title: "Page not found — HealthRecords" }];
}

function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="bg-primary h-[var(--header-height)] flex items-center px-6 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-text-inverse font-semibold text-sm">
            HealthRecords
          </span>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div
          className="bg-surface border border-border rounded-[var(--radius-card)] p-10 max-w-md w-full text-center"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {children}
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-inverse text-sm font-medium px-5 py-2.5 rounded-[var(--radius-button)] transition-colors"
          >
            ← Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function NotFound() {
  return (
    <NotFoundLayout>
      <p className="text-6xl font-bold text-accent mb-2">404</p>
      <h1 className="text-lg font-semibold text-text mb-2">Page not found</h1>
      <p className="text-sm text-text-muted mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </NotFoundLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const isDevError = import.meta.env.DEV && error instanceof Error;

  if (is404) {
    return (
      <NotFoundLayout>
        <p className="text-6xl font-bold text-accent mb-2">404</p>
        <h1 className="text-lg font-semibold text-text mb-2">Page not found</h1>
        <p className="text-sm text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </NotFoundLayout>
    );
  }

  return (
    <NotFoundLayout>
      <p className="text-5xl mb-4">⚠</p>
      <h1 className="text-lg font-semibold text-text mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-text-muted mb-2">
        {isRouteErrorResponse(error)
          ? error.statusText
          : "An unexpected error occurred."}
      </p>
      {isDevError && error.stack && (
        <pre className="mt-4 mb-6 text-left text-xs bg-background border border-border rounded-[var(--radius-button)] p-3 overflow-x-auto text-danger leading-relaxed">
          {error.stack}
        </pre>
      )}
    </NotFoundLayout>
  );
}
