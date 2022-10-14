import React from 'react';
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const onNotificationClick = (notification) => {
        navigate(notification.cta.data.url);
    }
    return(
        <nav className='navbar'>
            <h2>Todo List</h2>
            <div>
                <NovuProvider 
                    subscriberId='634917b6e2a2de81df1a73a7'
                    applicationIdentifier='VY-afsvID6w1'
                >
                <PopoverNotificationCenter
                    onNotificationClick={onNotificationClick}
                    colorScheme="dark"
                >
                    {({unseenCount}) => (
                        <NotificationBell unseenCount={unseenCount} />
                    )}
                </PopoverNotificationCenter>
                </NovuProvider>
            </div>
        </nav>
    );
};

export default Nav;