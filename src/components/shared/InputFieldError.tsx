import { FieldDescription } from "../ui/field";
import { getInputFieldError, IInputStateProps } from "@/lib/getInputFieldError";

interface IInputFieldErrorProps {
    field: string;
    state: IInputStateProps
}

const InputFieldError = ({ field, state }: IInputFieldErrorProps) => {

    if (getInputFieldError(field, state)) {
        return (
            <FieldDescription className="text-red-600" >
                {getInputFieldError(field, state)}
            </FieldDescription>
        )
    }
    return null;
};

export default InputFieldError;