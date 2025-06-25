import React from 'react';
import { Outlet } from 'react-router-dom';
import NereyeNavbar from './NereyeNavbar';

const PanelWrapper = () => {
    return (
        <>
            <NereyeNavbar />
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default PanelWrapper;
