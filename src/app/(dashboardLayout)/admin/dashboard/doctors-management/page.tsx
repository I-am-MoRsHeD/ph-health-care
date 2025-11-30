import DoctorFilters from "@/components/modules/admin/doctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/admin/doctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/admin/doctorsManagement/DoctorsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialtiesManagement";
import { Suspense } from "react";

const AdminDoctorsManagementPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const specialitiesResult = await getSpecialities();
    const doctorsResult = await getDoctors(queryString);
    const totalPages = Math.ceil(doctorsResult?.meta.total / doctorsResult?.meta.limit);

    return (
        <div className="space-y-6">
            <DoctorsManagementHeader specialities={specialitiesResult?.data || []} />
            <DoctorFilters specialties={specialitiesResult?.data} />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable
                    doctors={doctorsResult?.data}
                    specialities={specialitiesResult?.data || []}
                />
                <TablePagination currentPage={doctorsResult?.meta.page} totalPages={totalPages} />
            </Suspense>
        </div>
    );
};

export default AdminDoctorsManagementPage;