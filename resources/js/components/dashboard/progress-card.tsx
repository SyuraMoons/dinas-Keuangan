import type { ReactNode } from 'react';
import { formatPercent, formatRupiah } from '@/lib/format';
import { cn } from '@/lib/utils';
import { ProgressBar } from './progress-bar';
import { toneText } from './tone';
import type { Tone } from './tone';

type Caption = {
    label: string;
    /** Raw amount; formatted with `formatRupiah`. */
    amount: number | string;
};

type ProgressCardProps = {
    title: string;
    /** Percent, 0–100. */
    percent: number;
    tone?: Tone;
    /** Caption under the bar, left side (e.g. "Realisasi" + amount). */
    left?: Caption;
    /** Caption under the bar, right side (e.g. "Anggaran" + amount). */
    right?: Caption;
    /** Muted note shown instead of `left` / `right`. */
    note?: ReactNode;
    className?: string;
};

function CaptionText({ label, amount }: Caption) {
    return (
        <span className="text-muted-foreground">
            {label}{' '}
            <span className="font-semibold text-foreground">
                {formatRupiah(amount)}
            </span>
        </span>
    );
}

export function ProgressCard({
    title,
    percent,
    tone = 'primary',
    left,
    right,
    note,
    className,
}: ProgressCardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border bg-card px-4 py-4',
                className,
            )}
        >
            <p className="text-base text-foreground">{title}</p>
            <p
                className={cn(
                    'mt-1 text-2xl leading-8 font-bold',
                    toneText[tone],
                )}
            >
                {formatPercent(percent)}
            </p>
            <ProgressBar
                value={percent}
                tone={tone}
                label={title}
                className="mt-2"
            />
            {note ? (
                <p className="mt-2 text-xs text-muted-foreground">{note}</p>
            ) : (
                <div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs">
                    {left ? <CaptionText {...left} /> : <span />}
                    {right ? <CaptionText {...right} /> : null}
                </div>
            )}
        </div>
    );
}
