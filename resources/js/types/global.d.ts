import type { User } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: { user: User | null };
            [key: string]: unknown;
        };
    }
}

export {};
