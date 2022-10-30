import { Result } from "antd";

export default function Page404() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
        />
    )
}