export type Role = 'admin' | 'pimpinan' | 'wilayah';

export type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
};
