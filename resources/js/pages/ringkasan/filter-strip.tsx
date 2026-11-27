import { Link } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { impor } from '@/routes/admin';
import type { RingkasanProps } from '@/types/ringkasan';

function Item({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-base text-foreground">{label}</span>
            <span className="text-2xl leading-8 font-bold text-foreground">
                {value}
            </span>
        </div>
    );
}

/** Admin-only header strip: upload shortcut plus the active filters. */
export function FilterStrip({
    filters,
}: {
    filters: RingkasanProps['filters'];
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex flex-wrap items-end gap-x-10 gap-y-4 rounded-xl border border-border bg-card p-4">
                <div className="flex flex-col gap-2">
                    <span className="text-base text-foreground">Jenis</span>
                    <Link
                        href={impor().url}
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'h-11 gap-3 px-3 text-base font-normal text-muted-foreground',
                        )}
                    >
                        Unggah Excel
                        <Upload aria-hidden className="size-5" />
                    </Link>
                </div>
                <Item label="Jenis Data" value={filters.jenisData} />
                <Item label="Kategori" value={filters.kategori} />
                <Item label="Organisasi" value={filters.organisasi} />
            </div>
        </div>
    );
}
