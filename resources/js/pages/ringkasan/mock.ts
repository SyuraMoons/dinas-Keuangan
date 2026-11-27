import type { RingkasanProps } from '@/types/ringkasan';

/** Dummy data from the Figma, used until `RingkasanController` returns real props. */
export const ringkasanMock: RingkasanProps = {
    dataDate: '27 November 2026',
    filters: {
        jenisData: 'LRA',
        kategori: 'Intra + Ekstra',
        organisasi: 'Semua OPD',
    },
    pendapatan: {
        realisasi: '676010000000.00',
        anggaran: '1450000000000.00',
        persen: 46.77,
    },
    belanja: {
        realisasi: '558340000000.00',
        anggaran: '1530000000000.00',
        persen: 36.55,
    },
    surplus: '117670000000.00',
    nilaiAset: '8720000000000.00',
    // Not in Figma yet: placeholder numbers.
    pajakDaerah: {
        realisasi: '120500000000.00',
        target: '250000000000.00',
        persen: 48.2,
    },
    sisaPiutangPbb: '6440000000.00',
    pbb: {
        persenRealisasi: 75.69,
        terealisasi: '20060000000.00',
        belumTerealisasi: '6440000000.00',
        persenSppt: 78.08,
    },
    aset: {
        nilaiAkhir: '8720000000000.00',
        perubahanPersen: 3.2,
        penambahan: '420000000000.00',
        pengurangan: '185000000000.00',
    },
};
