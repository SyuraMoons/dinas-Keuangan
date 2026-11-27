export type Tone =
    | 'primary'
    | 'info'
    | 'success'
    | 'success-strong'
    | 'danger'
    | 'warning';

/** Text colour of a value that carries a tone (percentages, deltas). */
export const toneText: Record<Tone, string> = {
    primary: 'text-primary',
    info: 'text-info',
    success: 'text-success',
    'success-strong': 'text-success-strong',
    danger: 'text-danger',
    warning: 'text-warning',
};

/** Solid fill, used by progress bars. */
export const toneFill: Record<Tone, string> = {
    primary: 'bg-primary',
    info: 'bg-info',
    success: 'bg-success',
    'success-strong': 'bg-success-strong',
    danger: 'bg-danger',
    warning: 'bg-warning',
};

/** Soft badge background + icon colour, used by stat card icons. */
export const toneBadge: Record<Tone, string> = {
    primary: 'bg-primary-soft text-primary',
    info: 'bg-primary-soft text-info',
    success: 'bg-success-soft text-success-strong',
    'success-strong': 'bg-success-soft text-success-strong',
    danger: 'bg-danger-soft text-danger',
    warning: 'bg-warning-soft text-warning',
};
