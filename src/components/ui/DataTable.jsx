import { useMemo, useState } from 'react';

export default function DataTable({
  columns,
  rows,
  searchKeys = [],
  toolbarAction,
  searchPlaceholder = 'Search' + '\u2026',
  emptyLabel = 'No records found.',
  variant = 'default',
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q))
    );
  }, [rows, query, searchKeys]);

  return (
    <div className={variant === 'department' ? 'admin-department-page' : undefined}>
      <div className={variant === 'department' ? 'department-table-panel' : 'panel'}>
        <div className={variant === 'department' ? 'department-search-wrap' : 'table-toolbar'}>
        <input
          className={variant === 'department' ? 'department-search' : 'search-input'}
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {toolbarAction}
      </div>
      <div className="table-wrap">
        <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      {filtered.length === 0 && <div className="empty-state">{emptyLabel}</div>}
    </div>
    </div>
  );
}
