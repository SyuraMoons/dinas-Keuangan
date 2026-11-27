import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionCardProps = {
    title: string;
    description?: string;
    children: ReactNode;
    /** Optional "Lihat … →" link at the bottom. */
    footerLink?: { href: string; label: string };
    className?: string;
};

export function SectionCard({
    title,
    description,
    children,
    footerLink,
    className,
}: SectionCardProps) {
    return (
        <section
            className={cn(
                'flex flex-col rounded-xl border border-border bg-card p-4 shadow-card',
                className,
            )}
        >
            <header className="border-b border-border pb-3">
                <h2 className="text-base font-semibold text-foreground">
                    {title}
                </h2>
                {description ? (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </header>

            <div className="mt-4 flex flex-1 flex-col gap-4">{children}</div>

            {footerLink ? (
                <Link
                    href={footerLink.href}
                    className="mt-4 inline-flex items-center gap-2 self-start text-base text-muted-foreground hover:text-primary"
                >
                    {footerLink.label}
                    <ArrowRight aria-hidden className="size-5" />
                </Link>
            ) : null}
        </section>
    );
}
