import React from 'react';
import SidebarContent from './SidebarContent';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { IUser } from '@/types/user.interface';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { ISidebarNavSection } from '@/types/dashboard.interface';
import { getNavItemsByRole } from '@/lib/navItems.config';

const DashboardSidebar = async () => {
    const userInfo = await getUserInfo() as IUser;
    const navItems: ISidebarNavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <SidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
    );
};

export default DashboardSidebar;