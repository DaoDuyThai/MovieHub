import React from "react";
import LeftDashboard from "../admin/leftDashboard";
import RightDashboard from "../admin/rightDashboard";

function ActiveDeactiveAccount() {
    return (
        <React.Fragment>
            <div style={{ display: 'flex' }}>
                <LeftDashboard />
                <RightDashboard />
            </div>
        </React.Fragment>
    )
}
export default ActiveDeactiveAccount