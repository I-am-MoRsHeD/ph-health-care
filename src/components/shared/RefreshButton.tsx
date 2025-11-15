import { RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";


interface RefreshButtonProps {
    size?: "sm" | "default" | "lg";
    varriant?: "default" | "outline" | "ghost";
    showLabel?: boolean;
}

const RefreshButton = ({
    size = "default",
    varriant = "default",
    showLabel = true,
}: RefreshButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        })
    };

    return (
        <Button
            size={size}
            variant={varriant}
            onClick={handleRefresh}
            disabled={isPending}
        >
            <RefreshCcw className={`h-4 w-4 ${isPending ? "animate-spin" : ""} ${showLabel ? "mr-2" : ""}`} />
            {showLabel && "Refresh"}
        </Button>
    );
};

export default RefreshButton;