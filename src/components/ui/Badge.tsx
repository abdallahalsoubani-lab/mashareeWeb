import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'exclusive' | 'gold';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'glass border border-primary/30 text-primary-400',
      success: 'glass border border-accent-green/30 text-accent-green',
      warning: 'glass border border-accent-orange/30 text-accent-orange',
      exclusive: 'glass border border-accent-purple/30 text-accent-purple',
      gold: 'bg-gradient-to-r from-accent-purple to-primary-500 text-white',
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
