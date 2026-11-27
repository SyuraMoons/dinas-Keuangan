import type { ReactNode } from 'react';
import { formatRupiah, formatSignedPercent } from '@/lib/format';
import type { RingkasanProps } from '@/types/ringkasan';

function AssetStat({
    label,
    value,
    footer,
}: {
    label: string;
    value: string;
    footer: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-base text-foreground">{label}</span>
            <span className="text-2xl leading-8 font-bold text-foreground">
                {value}
            </span>
            <hr className="border-border" />
            <span className="text-sm">{footer}</span>
        </div>
    );
}

export function AsetSummary({ aset }: { aset: RingkasanProps['aset'] }) {
    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 sm:[&>*:nth-child(1)]:border-r sm:[&>*:nth-child(1)]:pr-8">
            <AssetStat
                label="Nilai Aset Akhir"
                value={formatRupiah(aset.nilaiAkhir)}
                footer={
                    <span className="text-success">
                        {formatSignedPercent(aset.perubahanPersen)}
                    </span>
                }
            />
            <AssetStat
                label="Penambahan Aset"
                value={formatRupiah(aset.penambahan)}
                footer={
                    <span className="text-muted-foreground">
                        Mutasi penambahan
                    </span>
                }
            />
            <AssetStat
                label="Pengurangan Aset"
                value={formatRupiah(aset.pengurangan)}
                footer={
                    <span className="text-muted-foreground">
                        Mutasi pengurangan
                    </span>
                }
            />
        </div>
    );
}
