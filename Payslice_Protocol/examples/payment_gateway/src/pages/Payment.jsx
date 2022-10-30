import { Card, Col, Row } from "antd"
import Invoice from "../components/Invoice"

 const Payment  = () => {
    return (
        <Row justify="center">
            <Col xs={24} md={12} lg={10}>
                <Card title="Payslice Invoice">
                    <Invoice />
                </Card>
            </Col> 
        </Row>
    )
}

export default Payment;