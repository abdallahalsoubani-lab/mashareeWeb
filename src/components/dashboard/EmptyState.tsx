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
        <div className="relative w-32 h-32 glass rounded-3xl flex items-center justify-center mb-8 text-5xl border border-primary/20 animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-primary-500/20 rounded-3xl blur-xl" />
          <span className="relative z-10">{icon}</span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-text-primary mb-3">{title}</h3>
      {description && (
        <p className="text-text-muted mb-8 max-w-md text-lg">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="group relative px-8 py-4 bg-gradient-to-r from-accent-purple via-primary-500 to-accent-teal text-white rounded-xl font-bold overflow-hidden transition-all hover:shadow-glow-md hover:scale-105"
        >
          <span className="relative z-10">{action.label}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-primary-600 to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      )}
    </div>
  );
}
