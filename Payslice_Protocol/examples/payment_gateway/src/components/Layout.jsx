import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }) {
    return (
        <Layout className="site-layout">
            <Layout className="layout">
                <Header style={{ background: "transparent", zIndex: 1 }}>
                    <Navigation />
                </Header>
                <Content style={{ padding: "0 50px" }}>
                <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>Payslice ©2022</Footer>
            </Layout>
        </Layout>
    );
}
