import React from "react";
import LeftDashboard from "../../components/Admin/leftDashboard";
import RightDashboard from "../../components/Admin/rightDashboard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function ActiveDeactiveAccount() {
    return (
        <>
            <Header />
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <LeftDashboard />
                    <RightDashboard />
                </div>
            </React.Fragment>
            <Footer />
        </>
    )
}
export default ActiveDeactiveAccount