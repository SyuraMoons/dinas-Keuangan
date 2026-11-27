import type { ReactNode } from 'react';
import AppHeader from '@/components/app-header';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

type AppLayoutProps = {
    children: ReactNode;
    /** Date of the active import batch, already formatted (e.g. "30 November 2026"). */
    dataDate?: string;
    /** Unread Catatan count for the header bell. */
    unreadCount?: number;
    /** Floating button pinned to the bottom-right (the Komentar trigger). */
    floatingAction?: ReactNode;
};

export default function AppLayout({
    children,
    dataDate,
    unreadCount,
    floatingAction,
}: AppLayoutProps) {
    return (
        <TooltipProvider>
            <div className="min-h-screen bg-background">
                <AppHeader unreadCount={unreadCount} />

                <main className="mx-auto max-w-[1440px] px-4 py-7 lg:px-16">
                    {dataDate ? (
                        <p className="mb-3 text-right text-xs text-muted-foreground">
                            Data per {dataDate}
                        </p>
                    ) : null}
                    <div className="flex flex-col gap-4">{children}</div>
                </main>

                {floatingAction ? (
                    <div className="fixed right-4 bottom-6 z-40 lg:right-[max(1rem,calc((100vw-1440px)/2+4rem))]">
                        {floatingAction}
                    </div>
                ) : null}

                <Toaster position="top-right" />
            </div>
        </TooltipProvider>
    );
}
