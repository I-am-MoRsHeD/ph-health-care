import LoginForm from '@/components/modules/auth/login-form';
import React from 'react';

const LoginPage = async ({ searchParams }: { searchParams?: Promise<{ callbackUrl?: string }> }) => {
    const params = await searchParams;

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <div className='w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg'>
                <div className='space-y-2 text-center'>
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-gray-500">
                        Enter your credentials to access your account
                    </p>
                </div>
                <LoginForm callbackUrl={params?.callbackUrl} />
            </div>
        </div>
    );
};

export default LoginPage;