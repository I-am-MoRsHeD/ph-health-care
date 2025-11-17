'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
    currentPage: number;
    totalPage: number;
};

const TablePagination = ({
    currentPage,
    totalPage
}: TablePaginationProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const navigateToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    if (totalPage <= 1) {
        return null;
    };

    return (
        <div className="flex items-center justify-center w-full">
            <Button
                variant='outline'
                size="sm"
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage <= 1 || isPending}
            >
                Previous
                <ChevronLeft className="h-4 w-4 mr-1" />
            </Button>

            <div className="flex items-center gap-1">
                {
                    Array.from({ length: Math.min(5, totalPage) },
                        (_, idx) => {
                            let pageNumber: number;

                            if (totalPage <= 5) {
                                pageNumber = idx + 1
                            } else if (currentPage <= 3) {
                                pageNumber = idx + 1
                            } else if (currentPage >= totalPage - 2) {
                                pageNumber = (totalPage - 4) + idx;
                            } else {
                                pageNumber = (currentPage - 2) + idx
                            };

                            return (
                                <Button
                                    key={pageNumber}
                                    variant={pageNumber === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => navigateToPage(pageNumber)}
                                    disabled={isPending}
                                    className="w-10"
                                >

                                </Button>
                            )
                        })
                }
            </div>

            <Button
                variant='outline'
                size="sm"
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage === totalPage || isPending}
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
        </div>
    );
};

export default TablePagination;