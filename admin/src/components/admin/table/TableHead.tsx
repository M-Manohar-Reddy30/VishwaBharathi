interface TableHeadProps {
  columns: string[];
}

export default function TableHead({
  columns,
}: TableHeadProps) {
  return (
    <thead className="bg-slate-100">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="px-6 py-3 text-left text-sm font-semibold text-slate-700"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}