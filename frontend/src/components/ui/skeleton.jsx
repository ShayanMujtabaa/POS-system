import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulsez rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
