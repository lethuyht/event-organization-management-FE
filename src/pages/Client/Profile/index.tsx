import Tabs from '#/shared/components/Styled/Tabs';
import { Tabs as AntdTabs } from 'antd';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';

const { TabPane } = AntdTabs;

enum ProfileTab {
    PROFILE = 'edit-profile',
    PASSWORD = 'password',
}

function UserProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const params = queryString.parse(location.search);

        if (!params.tab) {
            navigate(`/user/profile?tab=${ProfileTab.PROFILE}`);
        } else {
            setTab(String(params.tab));
        }
    }, [location.search]);

    return (
        <>
            <div className="mb-8 flex justify-center">
                <Tabs
                    activeKey={tab}
                    onTabClick={tabKey => navigate(`/user/profile?tab=${tabKey}`)}
                    className="w-min px-2"
                >
                    <TabPane tab="Thay đổi thông tin cá nhân" key={ProfileTab.PROFILE} />
                </Tabs>
            </div>
            {tab === ProfileTab.PROFILE && <UpdateProfile />}
        </>
    );
}

export default UserProfile;
