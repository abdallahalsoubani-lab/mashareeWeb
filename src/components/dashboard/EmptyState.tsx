/**
 * Empty State Component
 * Displays when no data is available
 */

import Link from 'next/link';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && (
        <div className="relative w-32 h-32 bg-background-secondary rounded-3xl flex items-center justify-center mb-8 text-5xl border border-primary/20 animate-float">
          <span className="relative z-10">{icon}</span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      {description && (
        <p className="text-secondary mb-8 max-w-md text-lg">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="group relative px-8 py-4 bg-primary text-background rounded-xl font-bold overflow-hidden transition-all hover:shadow-glow-gold hover:scale-105"
        >
          <span className="relative z-10">{action.label}</span>
        </Link>
      )}
    </div>
  );
}
