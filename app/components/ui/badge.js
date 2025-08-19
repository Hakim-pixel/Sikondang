export function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ${className}`}>
      {children}
    </span>
  );
}
