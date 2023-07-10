import React from "react";
import LeftDashboard from "../../components/Admin/leftDashboard";
import RightDashboard from "../../components/Admin/rightDashboard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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