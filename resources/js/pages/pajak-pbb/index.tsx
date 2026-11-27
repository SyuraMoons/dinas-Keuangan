import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function PajakPbb() {
    return (
        <>
            <Head title="Pajak PBB" />
            <AppLayout>
                <div className="rounded-xl border border-border bg-card p-8 shadow-card">
                    <h1 className="text-lg font-semibold">Pajak PBB</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Halaman ini segera hadir.
                    </p>
                </div>
            </AppLayout>
        </>
    );
}
