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
import { registerPatient } from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState } from "react";


const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerPatient, null);
    console.log(state);
    const getFieldError = (fieldName: string) => {
        if (state && !state.success) {
            const fieldError = state.error.find((err: any) => err.field === fieldName);
            return fieldError ? fieldError.message : null;
        };
    };

    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <Field>
                        <FieldLabel htmlFor="name">
                            Full Name
                        </FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Evil Rabbit"
                        />
                        {
                            getFieldError("name") && (
                                <FieldDescription className="text-red-600">
                                    {getFieldError("name")}
                                </FieldDescription>
                            )
                        }
                    </Field>
                    {/* address */}
                    <Field>
                        <FieldLabel htmlFor="address">
                            Address
                        </FieldLabel>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="16 Mirpur, Dhaka"
                        />
                    </Field>

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
                        {getFieldError("email") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("email")}
                            </FieldDescription>
                        )
                        }
                    </Field>
                    {/* Contact Number */}
                    <Field>
                        <FieldLabel htmlFor="contact-number">
                            Contact Number
                        </FieldLabel>
                        <Input
                            id="contact-number"
                            name="contact-number"
                            type="text"
                            placeholder="01*********"
                        />
                        {getFieldError("contactNumber") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("contactNumber")}
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
                        {getFieldError("password") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("password")}
                            </FieldDescription>
                        )
                        }
                    </Field>
                    {/* Confirm password */}
                    <Field>
                        <FieldLabel htmlFor="confirm-password">
                            Confirm Password
                        </FieldLabel>
                        <Input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="********"
                        />
                        {getFieldError("confirmPassword") && (
                            <FieldDescription className="text-red-600">
                                {getFieldError("confirmPassword")}
                            </FieldDescription>
                        )
                        }
                    </Field>
                </div>
                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating account..." : "Create Account"}
                        </Button>
                        <FieldDescription className="px-6 text-center">
                            Already have an account? {" "}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;