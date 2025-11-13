import { getUserInfo } from '@/services/auth/getUserInfo';
import { IUser } from '@/types/user.interface';
import NavbarContent from './NavbarContent';
import { ISidebarNavSection } from '@/types/dashboard.interface';
import { getNavItemsByRole } from '@/lib/navItems.config';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';

const DashboardHeader = async () => {
    const userInfo = (await getUserInfo()) as IUser;
    const navItems: ISidebarNavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <div>
            <NavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
        </div>
    );
};

export default DashboardHeader;