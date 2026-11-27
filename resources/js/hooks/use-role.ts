import { usePage } from '@inertiajs/react';
import type { Role, User } from '@/types/auth';

const ROLES: Role[] = ['admin', 'pimpinan', 'wilayah'];
const STORAGE_KEY = 'dev-role';

function readDevRole(): Role | null {
    try {
        const requested = new URLSearchParams(window.location.search).get('as');

        if (requested && (ROLES as string[]).includes(requested)) {
            sessionStorage.setItem(STORAGE_KEY, requested);
        }

        const stored = sessionStorage.getItem(STORAGE_KEY);

        return stored && (ROLES as string[]).includes(stored)
            ? (stored as Role)
            : null;
    } catch {
        return null;
    }
}

/**
 * Current user's role. Until `feat/auth-scope` shares the real user, local
 * development can switch role with `?as=admin|pimpinan|wilayah`
 * (default `pimpinan`), remembered for the browser session. The override is ignored in production builds.
 */
export function useRole(): Role {
    const { auth } = usePage<{ auth: { user: User | null } }>().props;

    if (auth.user) {
        return auth.user.role;
    }

    if (import.meta.env.DEV && typeof window !== 'undefined') {
        return readDevRole() ?? 'pimpinan';
    }

    return 'pimpinan';
}
