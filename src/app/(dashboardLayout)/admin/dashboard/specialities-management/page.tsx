import SpecialitiesManagementHeader from '@/components/modules/admin/specialitiesManagement/SpecialitiesManagementHeader';
import SpecialityTable from '@/components/modules/admin/specialitiesManagement/SpecialityTable';
import RefreshButton from '@/components/shared/RefreshButton';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { getSpecialities } from '@/services/admin/specialtiesManagement';
import { Suspense } from 'react';


const SpecialitiesManagementPage = async () => {
    const result = await getSpecialities();

    return (
        <div className='space-y-6'>
            <SpecialitiesManagementHeader />
            <div className='flex'>
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <SpecialityTable specialities={result?.data} />
            </Suspense>
        </div>
    );
};

export default SpecialitiesManagementPage;