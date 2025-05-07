export  const InfoField = ({ 
    label, 
    value, 
    isEmail = false, 
    isPhone = false,
    className = ""
  }: { 
    label: string; 
    value: string; 
    isEmail?: boolean; 
    isPhone?: boolean;
    className?: string;
  }) => (
    <div className="mb-3">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      {isEmail ? (
        <a 
          href={`mailto:${value}`} 
          className={`text-blue-600 hover:underline ${className}`}
        >
          {value}
        </a>
      ) : isPhone ? (
        <a 
          href={`tel:${value}`} 
          className="text-gray-700 hover:text-blue-600"
        >
          {value}
        </a>
      ) : (
        <p className={`text-gray-700 ${className}`}>{value}</p>
      )}
    </div>
  );