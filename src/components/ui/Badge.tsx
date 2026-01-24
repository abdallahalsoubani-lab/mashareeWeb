import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'exclusive' | 'gold';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-[#c9a227]/20 text-[#d4b94c] border border-[#c9a227]/50',
      success: 'bg-green-500/20 text-green-300 border border-green-500/50',
      warning: 'bg-orange-500/20 text-orange-300 border border-orange-500/50',
      exclusive: 'bg-purple-500/20 text-purple-300 border border-purple-500/50',
      gold: 'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a]',
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
