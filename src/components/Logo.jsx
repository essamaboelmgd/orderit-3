import { Link } from 'react-router-dom';

// Logo component — "Order" in red + "It" in white or dark
export default function Logo({ lightBg = false, size = 'lg' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
  };
  return (
    <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
      <span className={`font-cairo font-extrabold tracking-tight ${sizes[size] || sizes.lg}`}>
        <span style={{ color: '#F03030' }}>Order</span>
        <span style={{ color: lightBg ? '#1A1A1A' : '#FFFFFF' }}>It</span>
      </span>
    </Link>
  );
}
