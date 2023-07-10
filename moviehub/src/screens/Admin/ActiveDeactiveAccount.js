import React from "react";
import LeftDashboard from "../../components/Admin/leftDashboard";
import RightDashboard from "../../components/Admin/rightDashboard";

function ActiveDeactiveAccount() {
    return (
        <>
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <LeftDashboard />
                    <RightDashboard />
                </div>
            </React.Fragment>
        </>
    )
}
export default ActiveDeactiveAccount