/** Money arrives as a string (Laravel DECIMAL); percents are already 0–100. */
type Money = string;

type Realisasi = {
    realisasi: Money;
    anggaran: Money;
    persen: number;
};

export type RingkasanProps = {
    /** Date of the active import batch, formatted (e.g. "27 November 2026"). */
    dataDate: string;
    filters: {
        jenisData: string;
        kategori: string;
        organisasi: string;
    };
    pendapatan: Realisasi;
    belanja: Realisasi;
    surplus: Money;
    /** Nilai Aset Daerah, taken from the OPD-00 row, never summed. */
    nilaiAset: Money;
    pajakDaerah: { realisasi: Money; target: Money; persen: number };
    sisaPiutangPbb: Money;
    pbb: {
        persenRealisasi: number;
        terealisasi: Money;
        belumTerealisasi: Money;
        persenSppt: number;
    };
    aset: {
        nilaiAkhir: Money;
        perubahanPersen: number;
        penambahan: Money;
        pengurangan: Money;
    };
};
