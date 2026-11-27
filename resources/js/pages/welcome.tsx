import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Beranda" />
            <main className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-semibold">
                    Dashboard Keuangan & Aset Daerah
                </h1>
            </main>
        </>
    );
}
