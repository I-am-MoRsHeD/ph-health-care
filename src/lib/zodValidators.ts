import { ZodObject } from "zod";


export const zodValidators = <T>(payload: T, schema: ZodObject) => {
    const validatedPayload = schema.safeParse(payload);

    if (!validatedPayload.success) {
        return {
            success: false,
            error: validatedPayload.error.issues.map(issue => {
                return {
                    field: issue.path[0],
                    message: issue.message
                }
            })
        }
    };

    return {
        success: true,
        data: validatedPayload.data
    }
};