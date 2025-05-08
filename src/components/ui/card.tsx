import { ReactNode, MouseEventHandler } from 'react';
export function Card({ children, className = '', onClick }: { children: ReactNode, className?: string, onClick?: MouseEventHandler<HTMLDivElement> }) {
  return <div onClick={onClick} className={`bg-white rounded-2xl shadow p-4 ${className}`}>{children}</div>;
}



