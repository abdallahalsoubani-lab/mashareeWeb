import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-xl overflow-hidden';

    const variants = {
      default: 'glass border-2 border-primary/70 shadow-card',
      glass:
        'glass border-2 border-primary/70 shadow-card',
      gradient:
        'bg-gradient-to-br from-background-secondary/80 to-background-tertiary/60 border-2 border-primary/70 shadow-card',
    };

    return (
      <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />
    );
  }
);

Card.displayName = 'Card';

export default Card;
