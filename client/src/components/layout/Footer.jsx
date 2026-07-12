export function Footer() {
  return (
    <footer className="flex h-10 shrink-0 items-center justify-center border-t border-border px-4 text-xs text-muted-foreground">
      © {new Date().getFullYear()} TransitOps. All rights reserved.
    </footer>
  );
}
