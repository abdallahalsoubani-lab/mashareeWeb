import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'exclusive' | 'gold';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-background-tertiary border border-primary/30 text-primary',
      success: 'bg-background-tertiary border border-primary/30 text-primary',
      warning: 'bg-background-tertiary border border-secondary/30 text-secondary',
      exclusive: 'bg-primary/10 border border-primary/30 text-primary',
      gold: 'bg-primary text-background',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full font-bold text-xs',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
