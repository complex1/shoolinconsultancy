import { useState } from 'react';

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  mobileBreakpoint?: number;
}

const ResponsiveTable = ({
  columns,
  data,
  className = '',
  mobileBreakpoint = 768
}: ResponsiveTableProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width on mount and window resize
  if (typeof window !== 'undefined') {
    useState(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    });
  }

  if (isMobile) {
    return (
      <div className={`space-y-4 ${className}`}>
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-white rounded-lg shadow p-4 space-y-2 border border-neutral-200"
          >
            {columns.map((column) => (
              <div key={column.key} className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-500">
                  {column.header}
                </span>
                <span className="text-sm text-neutral-900">
                  {row[column.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`table-responsive ${className}`}>
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${
                  column.width ? `w-[${column.width}]` : ''
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable; 