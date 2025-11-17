
export interface IInputStateProps {
    success: boolean,
    error: {
        field: string;
        message: string
    }[]
}

export const getInputFieldError = (fieldName: string, state: IInputStateProps) => {
    
    if (state && state?.error) {
        const fieldError = state?.error?.find((err) => err?.field === fieldName);
        return fieldError ? fieldError.message : null;
    } else {
        return null;
    }
};