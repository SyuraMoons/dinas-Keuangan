import { Link, usePage } from '@inertiajs/react';
import { Bell, Folder, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useRole } from '@/hooks/use-role';
import { cn } from '@/lib/utils';
import { asetDaerah, pajakPbb, realisasiAnggaran, ringkasan } from '@/routes';
import { impor } from '@/routes/admin';

const NAV_ITEMS = [
    { label: 'Ringkasan', href: ringkasan().url },
    { label: 'Realisasi Anggaran', href: realisasiAnggaran().url },
    { label: 'Pajak PBB', href: pajakPbb().url },
    { label: 'Aset Daerah', href: asetDaerah().url },
];

type AppHeaderProps = {
    /** Unread Catatan count for the bell badge (wired in the Komentar issue). */
    unreadCount?: number;
};

function Logo() {
    return (
        <Link
            href={ringkasan().url}
            aria-label="Beranda"
            className="block size-10 shrink-0 rounded-xl bg-muted-foreground/50"
        />
    );
}

function SearchField({ className }: { className?: string }) {
    return (
        <div className={cn('relative', className)}>
            <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-foreground"
            />
            <Input
                type="search"
                name="q"
                placeholder="Cari"
                aria-label="Cari"
                className="h-11 rounded-lg border-border bg-card pl-10 text-sm shadow-card"
            />
        </div>
    );
}

function HeaderAction({ unreadCount }: AppHeaderProps) {
    const role = useRole();

    if (role === 'admin') {
        return (
            <Link
                href={impor().url}
                className={cn(
                    buttonVariants(),
                    'h-11 gap-2 rounded-lg px-4 text-sm font-semibold',
                )}
            >
                Kelola Data
                <Folder aria-hidden className="size-5" />
            </Link>
        );
    }

    return (
        <button
            type="button"
            aria-label="Notifikasi"
            className={cn(
                buttonVariants(),
                'relative size-11 shrink-0 rounded-lg p-0',
            )}
        >
            <Bell aria-hidden className="size-5" />
            {unreadCount ? (
                <span className="absolute -top-1.5 -right-1.5 flex min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] leading-5 font-semibold text-primary-foreground">
                    {unreadCount > 99 ? '99+' : unreadCount}
                </span>
            ) : null}
        </button>
    );
}

export default function AppHeader({ unreadCount }: AppHeaderProps) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    const pathname = url.split('?')[0];

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header className="border-b border-border bg-card">
            <div className="mx-auto flex h-[75px] max-w-[1440px] items-center gap-4 px-4 lg:px-16">
                <Logo />

                <nav
                    aria-label="Menu utama"
                    className="ml-auto hidden items-center gap-8 lg:flex"
                >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={
                                isActive(item.href) ? 'page' : undefined
                            }
                            className={cn(
                                'text-base font-medium text-foreground transition-colors hover:text-primary',
                                isActive(item.href) &&
                                    'font-semibold text-primary underline underline-offset-4',
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <SearchField className="hidden w-80 lg:block" />

                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                    <HeaderAction unreadCount={unreadCount} />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger
                            aria-label="Buka menu"
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'size-11 p-0 lg:hidden',
                            )}
                        >
                            <Menu aria-hidden className="size-5" />
                        </SheetTrigger>
                        <SheetContent side="right" className="gap-6 p-6">
                            <SheetHeader className="p-0">
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <SearchField />
                            <nav
                                aria-label="Menu utama"
                                className="flex flex-col gap-1"
                            >
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            isActive(item.href)
                                                ? 'page'
                                                : undefined
                                        }
                                        className={cn(
                                            'rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-accent',
                                            isActive(item.href) &&
                                                'bg-accent font-semibold text-primary',
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
