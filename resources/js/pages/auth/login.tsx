import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';

export default function Login() {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post(store().url, {
            onFinish: () => form.reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk" />
            <AuthLayout
                title="Dashboard Keuangan & Aset Daerah"
                description="Masuk dengan akun yang dibuat oleh Admin BKAD."
            >
                <form
                    onSubmit={submit}
                    className="flex flex-col gap-5"
                    noValidate
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="username"
                            autoFocus
                            required
                            placeholder="nama@kulonprogokab.go.id"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                            aria-invalid={form.errors.email ? true : undefined}
                            aria-describedby={
                                form.errors.email ? 'email-error' : undefined
                            }
                            className="h-11"
                        />
                        {form.errors.email ? (
                            <p
                                id="email-error"
                                role="alert"
                                className="text-sm text-danger"
                            >
                                {form.errors.email}
                            </p>
                        ) : null}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Kata sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData('password', e.target.value)
                            }
                            aria-invalid={
                                form.errors.password ? true : undefined
                            }
                            aria-describedby={
                                form.errors.password
                                    ? 'password-error'
                                    : undefined
                            }
                            className="h-11"
                        />
                        {form.errors.password ? (
                            <p
                                id="password-error"
                                role="alert"
                                className="text-sm text-danger"
                            >
                                {form.errors.password}
                            </p>
                        ) : null}
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={form.data.remember}
                            onCheckedChange={(checked) =>
                                form.setData('remember', checked === true)
                            }
                        />
                        <Label htmlFor="remember" className="font-normal">
                            Ingat saya
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        disabled={form.processing}
                        className="h-11 w-full text-sm font-semibold"
                    >
                        {form.processing ? 'Memproses…' : 'Masuk'}
                    </Button>
                </form>
            </AuthLayout>
        </>
    );
}
