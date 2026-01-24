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
        {label && <span className="text-[#b0a090] text-sm">{label}</span>}
        {showPercentage && (
          <span className="text-[#d4b94c] font-bold text-sm">
            {toArabicNumeral(Math.min(progress, 100))}٪
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#5c4d3a] rounded-full overflow-hidden border border-[#8b7355]/50">
        <div
          className="h-full bg-gradient-to-r from-[#c9a227] to-[#d4b94c] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Amount Info */}
      {showAmount && current !== undefined && total !== undefined && (
        <p className="text-[#b0a090] text-xs mt-2 text-right">
          {toArabicNumeral(current)} من {toArabicNumeral(total)} ريال
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
