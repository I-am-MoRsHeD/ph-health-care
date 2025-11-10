/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/services/auth/loginUser";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const LoginForm = ({ callbackUrl }: { callbackUrl?: string | undefined }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);
    console.log("Login form state:", state);
    const getFieldError = (fieldName: string) => {
        if (state && !state?.success) {
            const fieldError = state?.error?.find((err: any) => err?.field === fieldName);
            return fieldError ? fieldError.message : null;
        };
    };

    useEffect(() => {
        if (state && state?.success) {
            toast.success(state?.message || "Logged in successfully!");
        }
        else if (state && !state?.success) {
            toast.error(state?.message || "Login failed. Please try again.");
        }
    }, [state]);

    return (
        <form action={formAction}>
            {/* callbackUrl input */}
            {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* email */}
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="evil@gmail.com"
                        />
                        {
                            getFieldError("email") && (
                                <FieldDescription className="text-red-600">
                                    {getFieldError("email")}
                                </FieldDescription>
                            )
                        }
                    </Field>
                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                        />
                        {
                            getFieldError("password") && (
                                <FieldDescription className="text-red-600">
                                    {getFieldError("password")}
                                </FieldDescription>
                            )
                        }
                    </Field>
                </div>
                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Logging in...." : "Login"}
                        </Button>
                        <FieldDescription className="px-6 text-center">
                            Don&apos;t have an account? {" "}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Sign up
                            </Link>
                        </FieldDescription>
                        <FieldDescription className="px-6 text-center">
                            <Link href="/forget-password" className="text-blue-600 hover:underline">
                                Forget password?
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;