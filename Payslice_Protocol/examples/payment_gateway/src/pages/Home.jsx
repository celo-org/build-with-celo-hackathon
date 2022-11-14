import { Button, Col, Image, Row, Typography } from "antd";
import Wallpaper from "../components/shared/Wallpaper";

export default function Home() {
    return (
        <Row style={{ padding: '9em 2vw' }} gutter={[34, 34]}>
            <Wallpaper />
            <Col xs={24} md={9} >
                <Typography.Title level={1} style={{ fontSize: "3vw" }} className="text-white">
                Join the Premier cryptocurrency Payment Platform
                </Typography.Title>
                <Typography.Title level={4}  className="text-mutted">
                    We are the Stripe, Paystack, Paypal and MasterCard in crypto
                </Typography.Title>
                <Typography.Title level={4} className="text-mutted">
                    Enjoy Frictionless Payments
                </Typography.Title>
                <Button shape="round">Get Started</Button>
            </Col>
            <Col xs={24} md={15}>
                <Image src="images/cryptos.png" preview={false}/>
            </Col>
        </Row>
    )
}