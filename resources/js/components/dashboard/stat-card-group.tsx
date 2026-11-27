import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StatCardGroupProps = {
    children: ReactNode;
    className?: string;
};

/** White rounded container for up to 4 StatCards: 4 cols desktop, 2 tablet, 1 mobile. */
export function StatCardGroup({ children, className }: StatCardGroupProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-4 rounded-xl border border-border bg-card p-4 shadow-card sm:grid-cols-2 xl:grid-cols-4',
                className,
            )}
        >
            {children}
        </div>
    );
}
