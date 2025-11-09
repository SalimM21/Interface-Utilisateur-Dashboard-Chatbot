import React from "react";

export const Table = ({ children, className = "", ...props }) => (
  <div className={`w-full overflow-x-auto ${className}`} {...props}>
    <table className="min-w-full" style={{ borderCollapse: 'collapse' }}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, className = "" }) => (
  <thead className={className}>{children}</thead>
);

export const TableBody = ({ children, className = "" }) => (
  <tbody className={className}>{children}</tbody>
);

export const TableRow = ({ children, className = "", ...props }) => (
  <tr className={className} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ children, className = "" }) => (
  <th className={className} style={{ textAlign: 'left', padding: '8px' }}>
    {children}
  </th>
);

export const TableCell = ({ children, className = "" }) => (
  <td className={className} style={{ padding: '8px' }}>
    {children}
  </td>
);

export default Table;
