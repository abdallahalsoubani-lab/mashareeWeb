/**
 * Riyal Symbol Component
 * Displays Saudi Riyal currency symbol
 */

interface RiyalSymbolProps {
  size?: number;
  className?: string;
}

export default function RiyalSymbol({ size = 16, className = '' }: RiyalSymbolProps) {
  return (
    <img
      src="/riyal.png"
      alt="ريال"
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ 
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '2px',
        marginLeft: '2px',
        filter: 'brightness(0) saturate(100%) invert(79%) sepia(29%) saturate(580%) hue-rotate(3deg) brightness(92%) contrast(87%)'
      }}
    />
  );
}

// Text version for when image is not needed
export function RiyalText() {
  return <span className="font-bold">ريال</span>;
}
