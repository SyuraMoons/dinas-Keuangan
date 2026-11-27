import { Head } from '@inertiajs/react';
import {
    Landmark,
    FilePlus,
    MessageSquare,
    Plus,
    ReceiptText,
    Tag,
} from 'lucide-react';
import { toast } from 'sonner';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { SectionCard } from '@/components/dashboard/section-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatCardGroup } from '@/components/dashboard/stat-card-group';
import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/use-role';
import AppLayout from '@/layouts/app-layout';
import { asetDaerah, pajakPbb, realisasiAnggaran } from '@/routes';
import type { RingkasanProps } from '@/types/ringkasan';
import { AsetSummary } from './aset-summary';
import { FilterStrip } from './filter-strip';
import { ringkasanMock } from './mock';

function KomentarButton() {
    // Opens the Catatan panel once the Komentar issue lands.
    return (
        <Button
            type="button"
            onClick={() => toast('Fitur Komentar segera hadir.')}
            className="h-15 gap-3 rounded-lg px-7 text-lg font-semibold shadow-lg"
        >
            Komentar
            <MessageSquare aria-hidden className="size-6" />
        </Button>
    );
}

export default function Ringkasan(props: Partial<RingkasanProps>) {
    const data: RingkasanProps = { ...ringkasanMock, ...props };
    const role = useRole();

    return (
        <>
            <Head title="Ringkasan" />
            <AppLayout
                dataDate={data.dataDate}
                floatingAction={<KomentarButton />}
            >
                {role === 'admin' ? (
                    <FilterStrip filters={data.filters} />
                ) : null}

                <StatCardGroup>
                    <StatCard
                        title="Realisasi Pendapatan"
                        icon={FilePlus}
                        value={data.pendapatan.realisasi}
                        total={data.pendapatan.anggaran}
                        footer={{
                            kind: 'percent',
                            value: data.pendapatan.persen,
                        }}
                    />
                    <StatCard
                        title="Realisasi Belanja"
                        icon={FilePlus}
                        value={data.belanja.realisasi}
                        total={data.belanja.anggaran}
                        footer={{ kind: 'percent', value: data.belanja.persen }}
                    />
                    <StatCard
                        title="Surplus Realisasi"
                        icon={Plus}
                        iconTone="success"
                        value={data.surplus}
                        footer={{
                            kind: 'caption',
                            text: 'Pendapatan dikurangi belanja',
                        }}
                    />
                    <StatCard
                        title="Nilai Aset Daerah"
                        icon={Tag}
                        iconTone="warning"
                        value={data.nilaiAset}
                        footer={{ kind: 'caption', text: 'Dari saldo awal' }}
                    />
                </StatCardGroup>

                {/* Not in Figma yet: agree the final layout with the designer. */}
                <StatCardGroup className="xl:grid-cols-4">
                    <StatCard
                        title="Pajak Daerah"
                        icon={Landmark}
                        value={data.pajakDaerah.realisasi}
                        total={data.pajakDaerah.target}
                        footer={{
                            kind: 'percent',
                            value: data.pajakDaerah.persen,
                        }}
                    />
                    <StatCard
                        title="Sisa Piutang PBB"
                        icon={ReceiptText}
                        iconTone="danger"
                        value={data.sisaPiutangPbb}
                        footer={{
                            kind: 'caption',
                            text: 'Potensi penerimaan tersisa',
                        }}
                    />
                </StatCardGroup>

                <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                    <SectionCard
                        title="Progress Realisasi Anggaran"
                        footerLink={{
                            href: realisasiAnggaran().url,
                            label: 'Lihat rincian realisasi anggaran',
                        }}
                    >
                        <ProgressCard
                            title="Pendapatan Daerah"
                            percent={data.pendapatan.persen}
                            tone="info"
                            left={{
                                label: 'Realisasi',
                                amount: data.pendapatan.realisasi,
                            }}
                            right={{
                                label: 'Anggaran',
                                amount: data.pendapatan.anggaran,
                            }}
                        />
                        <ProgressCard
                            title="Belanja Daerah"
                            percent={data.belanja.persen}
                            tone="primary"
                            left={{
                                label: 'Realisasi',
                                amount: data.belanja.realisasi,
                            }}
                            right={{
                                label: 'Anggaran',
                                amount: data.belanja.anggaran,
                            }}
                        />
                    </SectionCard>

                    <SectionCard
                        title="Capaian Penerimaan PBB"
                        footerLink={{
                            href: pajakPbb().url,
                            label: 'Lihat detail penerimaan PBB',
                        }}
                    >
                        <ProgressCard
                            title="Progress Realisasi Penerimaan"
                            percent={data.pbb.persenRealisasi}
                            tone="success"
                            left={{
                                label: 'terealisasi',
                                labelAfter: true,
                                amount: data.pbb.terealisasi,
                            }}
                            right={{
                                label: 'belum terealisasi',
                                labelAfter: true,
                                amount: data.pbb.belumTerealisasi,
                            }}
                        />
                        <ProgressCard
                            title="SPPT Terealisasi"
                            percent={data.pbb.persenSppt}
                            tone="success-strong"
                            note="Persentase jumlah SPPT berbeda dari realisasi nominal."
                        />
                    </SectionCard>

                    <SectionCard
                        title="Ringkasan Aset Daerah"
                        footerLink={{
                            href: asetDaerah().url,
                            label: 'Lihat detail aset daerah',
                        }}
                    >
                        <AsetSummary aset={data.aset} />
                    </SectionCard>
                </div>
            </AppLayout>
        </>
    );
}
