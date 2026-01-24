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
        'bg-gradient-to-r from-[#c9a227] to-[#d4b94c] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#c9a227]/50 hover:scale-105',
      secondary:
        'bg-[#5c4d3a]/50 text-[#d4b94c] border border-[#c9a227]/50 hover:bg-[#5c4d3a] hover:border-[#d4b94c]',
      outline:
        'border-2 border-[#c9a227] text-[#d4b94c] hover:bg-[#c9a227]/10 hover:shadow-lg hover:shadow-[#c9a227]/50',
      ghost:
        'text-[#d4b94c] hover:bg-[#5c4d3a]/30 hover:text-[#f5f0e8]',
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
