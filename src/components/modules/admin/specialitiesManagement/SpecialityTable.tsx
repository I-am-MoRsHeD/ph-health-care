'use client';
import ManagementTable from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specilities.interface";
import { SpecialitiesColumns } from "./SpecialitiesColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { deleteSpeciality } from "@/services/admin/specialtiesManagement";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SpecialitiesTableProps {
    specialities: ISpecialty[];
}

const SpecialityTable = ({ specialities }: SpecialitiesTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingSpeciality, setDeletingSpeciality] = useState<ISpecialty | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (speciality: ISpecialty) => {
        setDeletingSpeciality(speciality)
    };

    const handleConfirm = async () => {
        if (!deletingSpeciality) return;

        setIsDeletingDialog(true);
        const result = await deleteSpeciality(deletingSpeciality?.id);
        setIsDeletingDialog(false);

        if (result.success) {
            toast.success(result?.message || "Speciality deleted successfully!");
            setDeletingSpeciality(null);
            handleRefresh();
        } else {
            toast.error(result?.message || "Failed to delete speciality")
        }
    };

    return (
        <div>
            <ManagementTable
                data={specialities}
                columns={SpecialitiesColumns}
                onDelete={handleDelete}
                getRowKey={(speciality) => speciality.id}
                emptyMessage="No specialites found!"
            />

            <DeleteConfirmationDialog
                open={!!deletingSpeciality}
                onOpenChange={(open) => !open && setDeletingSpeciality(null)}
                onConfirm={handleConfirm}
                title="Delete Speciality"
                description={`Are you sure you want to delete ${deletingSpeciality?.title} ? This action can't be undone.`}
                isDeleting={isDeletingDialog}
            />
        </div>
    );
};

export default SpecialityTable;