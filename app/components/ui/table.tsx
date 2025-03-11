import { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full text-sm ${className}`}>{children}</table>
    </div>
  )
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">{children}</tr>
}

export function TableHead({ children }: { children: ReactNode }) {
  return <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">{children}</th>
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className="p-4 align-middle">{children}</td>
}
