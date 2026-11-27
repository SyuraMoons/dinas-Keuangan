import type { ReactNode } from 'react';

type AuthLayoutProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

export default function AuthLayout({
    title,
    description,
    children,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
            <div className="w-full max-w-md">
                <div className="mb-6 flex flex-col items-center gap-3 text-center">
                    <div className="size-12 rounded-xl bg-muted-foreground/50" />
                    <div>
                        <h1 className="text-xl font-bold text-foreground">
                            {title}
                        </h1>
                        {description ? (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {description}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
