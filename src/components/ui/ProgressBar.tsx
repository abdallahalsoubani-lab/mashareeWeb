import React from 'react';
import { toArabicNumeral } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  showAmount?: boolean;
  current?: number;
  total?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  showAmount = false,
  current,
  total,
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        {label && <span className="text-secondary text-sm font-medium">{label}</span>}
        {showPercentage && (
          <span className="text-primary font-bold text-sm">
            {toArabicNumeral(Math.min(progress, 100))}٪
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2.5 bg-background rounded-full overflow-hidden">
        <div
          className="absolute inset-0 bg-primary rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Amount Info */}
      {showAmount && current !== undefined && total !== undefined && (
        <p className="text-secondary text-xs mt-2 text-right">
          {toArabicNumeral(current)} من {toArabicNumeral(total)} ريال
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
