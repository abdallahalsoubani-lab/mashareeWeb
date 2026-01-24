import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'rounded-xl overflow-hidden';

    const variants = {
      default: 'bg-[#5c4d3a]/20 border border-[#8b7355]/30',
      glass:
        'bg-rgba(92, 77, 58, 0.2) backdrop-blur-md border border-[#c9a227]/30',
      gradient:
        'bg-gradient-to-br from-[#5c4d3a]/30 to-[#8b7355]/20 border border-[#c9a227]/20',
    };

    return (
      <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />
    );
  }
);

Card.displayName = 'Card';

export default Card;
