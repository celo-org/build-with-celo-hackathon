import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Space } from "antd";
import { useLocation, useRouteMatch } from "react-router-dom";
import Buy from "./Buy";

export default function Navigation() {
    const location = useLocation();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <h3>Payslice</h3>
            
                <div>
                    <Space>
                        
                        <ConnectButton chainStatus="name" />
                    </Space>
                </div>
        
        </div>
    );
}
