import type { LucideIcon } from 'lucide-react';
import { formatPercent, formatRupiah } from '@/lib/format';
import { cn } from '@/lib/utils';
import { toneBadge, toneText } from './tone';
import type { Tone } from './tone';

type StatCardFooter =
    | { kind: 'percent'; value: number; tone?: Tone }
    | { kind: 'caption'; text: string };

type StatRow = {
    /** Already formatted (e.g. "369.734"), or a raw amount with `money`. */
    value: string | number;
    /** Format `value` with `formatRupiah` instead of showing it as is. */
    money?: boolean;
    caption: string;
};

type StatCardProps = {
    title: string;
    icon: LucideIcon;
    iconTone?: Tone;
    /** Main amount; formatted with `formatRupiah`. */
    value?: number | string;
    /** Secondary "/ total" amount next to the value. */
    total?: number | string;
    footer?: StatCardFooter;
    /** PBB variant: two value + caption rows instead of value + footer. */
    rows?: [StatRow, StatRow];
    className?: string;
};

function Row({ value, money, caption }: StatRow) {
    return (
        <div className="flex items-baseline gap-3">
            <span className="text-2xl leading-8 font-bold text-foreground">
                {money ? formatRupiah(value) : value}
            </span>
            <span className="text-xs text-muted-foreground">{caption}</span>
        </div>
    );
}

export function StatCard({
    title,
    icon: Icon,
    iconTone = 'primary',
    value,
    total,
    footer,
    rows,
    className,
}: StatCardProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-2 rounded-xl border border-border bg-card p-4',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <p className="text-base text-foreground">{title}</p>
                <span
                    className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-lg',
                        toneBadge[iconTone],
                    )}
                >
                    <Icon aria-hidden className="size-[18px]" />
                </span>
            </div>

            {rows ? (
                <div className="flex flex-col gap-2">
                    <Row {...rows[0]} />
                    <hr className="border-border" />
                    <Row {...rows[1]} />
                </div>
            ) : (
                <>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl leading-8 font-bold text-foreground">
                            {formatRupiah(value)}
                        </span>
                        {total !== undefined ? (
                            <span className="text-xs text-muted-foreground">
                                / {formatRupiah(total)}
                            </span>
                        ) : null}
                    </div>
                    {footer ? (
                        <>
                            <hr className="border-border" />
                            {footer.kind === 'percent' ? (
                                <p
                                    className={cn(
                                        'text-base font-semibold',
                                        toneText[footer.tone ?? 'primary'],
                                    )}
                                >
                                    {formatPercent(footer.value)}
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    {footer.text}
                                </p>
                            )}
                        </>
                    ) : null}
                </>
            )}
        </div>
    );
}
