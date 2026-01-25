import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-xl overflow-hidden';

    const variants = {
      default: 'glass border border-primary/20',
      glass:
        'glass border border-primary/20',
      gradient:
        'bg-gradient-to-br from-background-secondary/80 to-background-tertiary/60 border border-primary/20',
    };

    return (
      <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />
    );
  }
);

Card.displayName = 'Card';

export default Card;
