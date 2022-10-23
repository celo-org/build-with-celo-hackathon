import {
    Form,
    Input,
    Space,
    Button,
    InputNumber,
    Tooltip,
    Divider,
    Collapse,
    Avatar,
    Select,
} from "antd";
import {
    BankOutlined,
    InfoCircleOutlined,
    MinusCircleOutlined,
    PlusOutlined,
    SendOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    useAccount,
    useContract,
    useNetwork,
    useSigner
} from "wagmi";
import {  useEffect, useState } from "react";
import { ExchangeInterface, SliceInterface } from "../interface";
import {  ethers } from "ethers";
import {
    TokenIcons,
    TOKENS,
    TokenSymbol,
} from "../constants/invoicedata";
import useSwap  from "../api/uniswap";
import {
    approve,
    checkBalance,
    createTokenContract,
    swapEthToWeth,
} from "../helpers";

const { TextArea } = Input;
const { Panel } = Collapse;

const SliceForm = ({
    contractAddress,
    paymentId ,
}) => {
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [sliceInfo, setSliceInfo] = useState([]);
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();

    const {
        getAmountInQoute
    } = useSwap();

    const sliceContract = useContract({
        addressOrName: contractAddress,
        contractInterface: SliceInterface.abi,
        signerOrProvider: signer,
    });

    const exchangeContract = useContract({
        addressOrName: ExchangeInterface.address,
        contractInterface: ExchangeInterface.abi,
        signerOrProvider: signer,
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                if (!sliceContract) {
                    setError(true);
                } else {
                    const [
                        name,
                        description,
                        exchangeAddress,
                        targetToken,
                        recipientAddress,
                        totalReceivable,
                        totalPaid,
                    ] = await sliceContract?.getSliceInfo();

                    const tokenContract = createTokenContract(
                        targetToken,
                        signer
                    );
                    const targetTokenDecimals = await tokenContract.decimals();

                    console.log(signer)

                    setSliceInfo({
                        name,
                        description,
                        targetToken,
                        targetTokenDecimals,
                        recipientAddress,
                        totalReceivable,
                        amountLeft: totalReceivable.sub(totalPaid),
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [sliceContract, signer]);

    useEffect(() => {
        (async () => {
            if (!signer) {
                return;
            }

            if (chain?.id !== 31337) {
                return;
            }

            const amount = 100;

            const balance = await checkBalance(
                "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
                signer
            );

            if (parseFloat(ethers.utils.formatEther(balance)) >= amount) {
                return;
            }

            const ok = window.confirm(
                "For testing purposes you will need to conver Eth to wallet. Cancel if necessary"
            );
            if (!ok) {
                return;
            }

            await swapEthToWeth(
                signer,
                ethers.utils.parseEther(amount.toString())
            );
        })();
    }, [signer]);

    const onFinish = async (data) => {
        if (!sliceContract) {
            return;
        }

        console.log(data);
        const payments = [];

        for (let i = 0; i < data.Tokens.length; i++) {
            const promise = new Promise(async (resolve, reject) => {
                try {
                    const { amountOut, inputToken } = data.Tokens[i];

                    const amountIn = await getAmountInQoute(exchangeContract, ethers.utils.parseEther(amountOut), [inputToken, data.targetToken]);

                    
                    const paymentDetails = [
                        inputToken,
                        address,
                        ethers.utils.parseEther(amountOut),
                        ethers.utils.parseEther(amountIn),
                        data.payeruid,
                        [inputToken, data.targetToken]

                    ];

                    console.log(paymentDetails);

                    //approve tokens
                    await approve(
                        inputToken,
                        signer,
                        sliceContract.address,
                        ethers.utils.parseEther(amountIn)
                    );

                    const txn = await sliceContract.makePayment(
                        ...paymentDetails
                    );
                    await txn.wait();

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            payments.push(promise);
        }

        await Promise.all(payments);
    };

    if (isError || !sliceInfo) {
        return "Error page";
    }

    if (isLoading) {
        return "loading...";
    }

    return (
        <Form
            name="payslice_slice_form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                payeruid: paymentId,
                payerAddress: address,
                description: sliceInfo?.description,
                targetToken: sliceInfo?.targetToken,
                totalReceivable: ethers.utils.formatUnits(
                    sliceInfo?.amountLeft || 0,
                    sliceInfo?.targetTokenDecimals
                ),
                recipientAddress: sliceInfo?.recipientAddress,
            }}
        >
            <Form.Item label="Payer Address" name={"payerAddress"}>
                <Input
                    placeholder="Payer Address"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Extra information">
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    disabled
                />
            </Form.Item>

            <Form.Item label="Amount" name={"totalReceivable"}>
                <Input
                    addonBefore={
                        <Avatar
                            size={24}
                            src={
                                TokenIcons[
                                    TokenSymbol[sliceInfo?.targetToken]
                                ]
                            }
                        />
                    }
                    suffix={`(${ethers.utils.formatUnits(
                        sliceInfo?.totalReceivable || 0,
                        sliceInfo?.targetTokenDecimals
                    )})`}
                    placeholder="Amount"
                    prefix={<BankOutlined className="site-form-item-icon" />}
                    disabled
                    size="medium"
                    onChange={() => {}}
                />
            </Form.Item>
            <Form.Item label="Description" name={"description"}>
                <TextArea
                    value={""}
                    placeholder="Description"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                />
            </Form.Item>
            <Divider> Pay with</Divider>
            <Form.List name="Tokens">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <TokenSelector
                                key={key}
                                name={name}
                                restField={restField}
                                remove={remove}
                                signer={signer}
                                targetToken={sliceInfo?.targetToken}
                                
                            />
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Token
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Collapse
                collapsible="header"
                ghost
                accordion
                style={{ marginBottom: "20px" }}
            >
                <Panel header="Advanced Options" forceRender>
                    <Form.Item label="Payment ID" name={"payeruid"}>
                        <Input
                            placeholder="Payer id"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        label="Receiving Address"
                        name={"recipientAddress"}
                    >
                        <Input
                            placeholder="Receiving Address"
                            prefix={
                                <SendOutlined className="site-form-item-icon" />
                            }
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            disabled
                        />
                    </Form.Item>
                    <Form.Item label="Target Token" name={"targetToken"}>
                        <Input
                            placeholder="Target Token"
                            prefix={
                                <SendOutlined className="site-form-item-icon" />
                            }
                            suffix={
                                <Tooltip title="Extra information">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                            disabled
                        />
                    </Form.Item>
                </Panel>
            </Collapse>
            <Form.Item>
                <Button size="large" htmlType="submit">
                    Pay
                </Button>
            </Form.Item>
        </Form>
    );
};

const TokenSelector = ({ idx, restField, name, remove, signer, targetToken }) => {
    const [isLoading, setLoading] = useState(false);
    const [inputToken, setInputToken] = useState("");
    const [inputAmount, setAmountIn] = useState("");
    const [outputAmount, setAmountOut] = useState(0);

    const exchangeContract = useContract({
        addressOrName: ExchangeInterface.address,
        contractInterface: ExchangeInterface.abi,
        signerOrProvider: signer,
    });


    const {
        getAmountInQoute
    } = useSwap();

    return (
        <Space
            style={{
                display: "flex",
                marginBottom: 8,
            }}
            align="middle"
        >
            <Form.Item
                {...restField}
                name={[name, "inputToken"]}
                rules={[
                    {
                        required: true,
                        message: "Missing token name",
                    },
                ]}
            >
                <Select
                    prefix={<SendOutlined className="site-form-item-icon" />}
                    placeholder="Token"
                    size="large"
                    style={{ width: 120 }}
                    loading={isLoading}
                    onChange={async (value) => {
                        try {
                            setLoading(true);

                            setInputToken((prev) => value);

                            if(!outputAmount){
                                return
                            }

                            const inputAmount = await getAmountInQoute(exchangeContract, ethers.utils.parseEther(outputAmount), [inputToken, targetToken]);
                                
                            setAmountIn(inputAmount);
                        } catch (error) {
                            console.log(error);
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    <Select.Option value={TOKENS.oUSDC}>
                        oUSDC
                    </Select.Option>
                    <Select.Option value={TOKENS.WKLAY}>
                        WKLAY
                    </Select.Option>
                    <Select.Option value={TOKENS.KDAI}>
                        KDAI
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                {...restField}
                hasFeedback
                    
            >
                <Input
                    placeholder={TokenSymbol[inputToken]}
                    style={{ width: "100%" }}
                    size="large"
                    type="number"
                    value={inputAmount}
                    disabled
                />
            </Form.Item>
            <Form.Item {...restField}
                name={[name, "amountOut"]}
            >
                <Input
                    placeholder={TokenSymbol[targetToken]}
                    style={{ width: "100%" }}
                    size="large"
                    type="number"
                    onChange={
                        async(event) => {
                            try {
                                setLoading((prev) => true);
                                // setAmount((prev) => value);
                                const value = event.target.value;

                                setAmountOut(value.toString());
                                
                                if (!inputToken || !targetToken) {
                                    return;
                                }

                                const inputAmount = await getAmountInQoute(exchangeContract, ethers.utils.parseEther(value.toString()), [inputToken, targetToken]);
                                
                                setAmountIn(inputAmount);
                                
                            } catch (error) {
                                console.log(error);
                            } finally {
                                setLoading(false);
                            }
                        }
                    }
                />
            </Form.Item>

            <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
    );
};

const Slice=()=> {
    const params = new URLSearchParams(window.location.href);
    const contractAddress = params.get("cad");
    const paymentId = params.get("pid");

    if(!contractAddress){
        return "Invalid Slice"
    }
    
    return (<SliceForm  contractAddress={contractAddress} paymentId={paymentId} />)
}

export default Slice;
