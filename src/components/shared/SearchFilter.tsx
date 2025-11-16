'use client';

import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface SearchFilterProps {
    placeholder?: string;
    paramName?: string;
}

const SearchFilter = ({
    placeholder = "Search...",
    paramName = "searchTerm"
}: SearchFilterProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const searchValue = searchParams.get(paramName);
    const [value, setValue] = useState(searchValue || "");
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        const initialValue = searchValue || "";
        if (debouncedValue === initialValue) {
            return; // prevent first render of the page
        }

        if (debouncedValue) {
            params.set(paramName, debouncedValue); //?searchTerm=debounceValue
            params.set("page", "1"); // reset search to first page
        } else {
            params.delete(paramName); // remove searchTerm param
            params.delete("page");
        };

        startTransition(() => {
            router.push(`?${params.toString()}`);
        })

    }, [debouncedValue, paramName, router, searchParams, searchValue])

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text"
                placeholder={placeholder}
                value={value}
                className="pl-10"
                onChange={(e) => setValue(e.target.value)}
                disabled={isPending}
            />
        </div>
    );
};

export default SearchFilter;