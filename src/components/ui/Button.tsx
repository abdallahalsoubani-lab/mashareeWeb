import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, ...props }, ref) => {
    const baseStyles = 'font-bold transition-all duration-300 rounded-lg focus:outline-none';

    const variants = {
      primary:
        'bg-primary text-background hover:shadow-glow-gold hover:scale-105',
      secondary:
        'bg-background-tertiary text-primary border border-primary/30 hover:border-primary/50 hover:bg-primary/10',
      outline:
        'bg-background-secondary border-2 border-primary/40 text-white hover:border-primary hover:bg-primary/10',
      ghost:
        'text-secondary hover:bg-primary/10 hover:text-white',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            جاري...
          </span>
        ) : (
          props.children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
