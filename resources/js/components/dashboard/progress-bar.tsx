import { cn } from '@/lib/utils';
import { toneFill } from './tone';
import type { Tone } from './tone';

type ProgressBarProps = {
    /** Percent, 0–100 (values outside are clamped). */
    value: number;
    tone?: Tone;
    label?: string;
    className?: string;
};

export function ProgressBar({
    value,
    tone = 'primary',
    label,
    className,
}: ProgressBarProps) {
    const clamped = Math.min(
        100,
        Math.max(0, Number.isFinite(value) ? value : 0),
    );

    return (
        <div
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(clamped)}
            className={cn(
                'h-2 w-full overflow-hidden rounded-full bg-track',
                className,
            )}
        >
            <div
                className={cn('h-full rounded-full', toneFill[tone])}
                style={{ width: `${clamped}%` }}
            />
        </div>
    );
}
