/**
 * Shared number formatting for the whole dashboard (Indonesian style:
 * dot for thousands, comma for decimals). Laravel sends DECIMAL columns as
 * strings, so every helper accepts `number | string`.
 */

type Numeric = number | string | null | undefined;

const FALLBACK = '-';

const UNITS = [
    { threshold: 1e12, suffix: ' T' },
    { threshold: 1e9, suffix: ' M' },
    { threshold: 1e6, suffix: ' Jt' },
] as const;

function toNumber(value: Numeric): number | null {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    const parsed = typeof value === 'number' ? value : Number(value);

    return Number.isFinite(parsed) ? parsed : null;
}

function decimal(value: number, maxDigits: number, minDigits = 0): string {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
    }).format(value);
}

/**
 * formatRupiah(1450000000000)             // "Rp1,45 T"
 * formatRupiah('676010000000.00')         // "Rp676,01 M"
 * formatRupiah(34100000)                  // "Rp34,10 Jt"
 * formatRupiah(450000)                    // "Rp450.000"
 * formatRupiah(0)                         // "Rp0"
 * formatRupiah(117670000000, { signed })  // "+Rp117,67 M"
 * formatRupiah('abc')                     // "-"
 */
export function formatRupiah(
    value: Numeric,
    { signed = false }: { signed?: boolean } = {},
): string {
    const amount = toNumber(value);

    if (amount === null) {
        return FALLBACK;
    }

    const sign = amount < 0 ? '-' : signed && amount > 0 ? '+' : '';
    const abs = Math.abs(amount);
    const unit = UNITS.find(({ threshold }) => abs >= threshold);

    if (!unit) {
        return `${sign}Rp${decimal(abs, 0)}`;
    }

    // Whole units drop the decimals ("Rp420 M"), otherwise keep two ("Rp8,72 T").
    const scaled = Math.round((abs / unit.threshold) * 100) / 100;
    const digits = Number.isInteger(scaled) ? 0 : 2;

    return `${sign}Rp${decimal(scaled, digits, digits)}${unit.suffix}`;
}

/** Input is already a percent (46.77), not a ratio. formatPercent(46.77) // "46,77%" */
export function formatPercent(value: Numeric, digits = 2): string {
    const amount = toNumber(value);

    if (amount === null) {
        return FALLBACK;
    }

    return `${decimal(amount, digits, digits)}%`;
}

/** Plain integer-style number with thousands separators. formatNumber(369734) // "369.734" */
export function formatNumber(value: Numeric, digits = 0): string {
    const amount = toNumber(value);

    if (amount === null) {
        return FALLBACK;
    }

    return decimal(amount, digits, digits);
}

/** Percent with an explicit sign, for changes. formatSignedPercent(3.2) // "+3,20%" */
export function formatSignedPercent(value: Numeric, digits = 2): string {
    const amount = toNumber(value);

    if (amount === null) {
        return FALLBACK;
    }

    return `${amount > 0 ? '+' : ''}${formatPercent(amount, digits)}`;
}
