import { getUserInfo } from '@/services/auth/getUserInfo';
import { IUser } from '@/types/user.interface';
import NavbarContent from './NavbarContent';

const DashboardHeader = async () => {
    const userInfo = (await getUserInfo()) as IUser;

    return (
        <div>
            <NavbarContent userInfo={userInfo} />
        </div>
    );
};

export default DashboardHeader;