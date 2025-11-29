import DashboardHeader from '@/components/modules/Dashboard/DashboardHeader';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';
import React from 'react';

const CommonDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <DashboardSidebar />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <DashboardHeader />
                <main className='flex -1 overflow-y-auto bg-muted/10 p-4 md:p-6'>
                    <div className='w-full'>{children}</div>
                </main>
            </div>
        </div>
    );
};

export default CommonDashboardLayout;