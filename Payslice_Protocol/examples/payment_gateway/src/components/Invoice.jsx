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
    Typography,
    Alert,
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
import { useEffect, useState } from "react";
import { ExchangeInterface, loggerInterface, PaysliceInterface, SliceInterface } from "../interface";
import { ethers } from "ethers";
import {
    TokenIcons,
    TOKENS,
    TokenSymbol,
} from "../constants/invoicedata";
import useSwap from "../api/uniswap";
import {
    approve,
    checkBalance,
    createContract,
    createTokenContract,
    swapEthToWeth,
} from "../helpers";
import { useMemo } from "react";

const { TextArea } = Input;
const { Panel } = Collapse;

const SliceForm = ({
    contractAddress,
    paymentId,
}) => {

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [sliceInfo, setSliceInfo] = useState([]);
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const { chain } = useNetwork();
    const [form] = Form.useForm();
    const totalReceivable = useMemo(() => {
        return ethers.utils.formatUnits(
            sliceInfo?.amountLeft || 0,
            sliceInfo?.targetTokenDecimals
        )
    }, [sliceInfo]);


    const {
        getAmountInQoute
    } = useSwap();

    const paysliceContract = useContract({
        addressOrName: PaysliceInterface.address,
        contractInterface: PaysliceInterface.abi,
        signerOrProvider: signer,
    });

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
                        exchangeAddress,
                        targetToken,
                        recipientAddress,
                        totalReceivable,
                        totalPaid
                    ] = await sliceContract?.getSliceInfo();

                    const loggerAddress = await paysliceContract.loggerAddress();

                    const loggerContract = createContract(loggerAddress, loggerInterface.abi, signer);

                    const info = await loggerContract.queryFilter(loggerContract.filters.SliceCreated());

                    const userdata = JSON.parse(ethers.utils.toUtf8String(info[0].args.userdata))[0];

                    const tokenContract = createTokenContract(
                        targetToken,
                        signer
                    );
                    const targetTokenDecimals = await tokenContract.decimals();

                    setSliceInfo({
                        name: userdata?.name,
                        description: userdata?.slug?.current,
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
    }, [sliceContract, signer, paysliceContract]);

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

        const payments = [];

        for (let i = 0; i < data.Tokens.length; i++) {
            const promise = new Promise(async (resolve, reject) => {
                try {
                    console.log(data.Tokens);

                    const { amountOut, inputToken } = data.Tokens[i];

                    const amountIn = (inputToken === data.targetToken) ?
                        amountOut :
                        await getAmountInQoute(exchangeContract, ethers.utils.parseEther(amountOut), [inputToken, data.targetToken]);

                    const paymentDetails = [
                        inputToken,
                        address,
                        ethers.utils.parseEther(amountOut),
                        ethers.utils.parseEther(amountIn),
                        data.payeruid,
                        [inputToken, data.targetToken]

                    ];

                    console.log(paymentDetails);

                    // approve tokens   
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

        const [, , ,
            totalReceivable,
            totalPaid
        ] = await sliceContract?.getSliceInfo();

        console.log(totalPaid, totalReceivable);

        if (totalPaid >= totalReceivable) {
            //close window
            window.close();
            
        }

        window.location.reload();
    };

    if (isError || !sliceInfo) {
        return "Error page";
    }

    if (isLoading) {
        return "loading...";
    }

    return (
        <Form
            preserve={false}
            name="payslice_slice_form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                payeruid: paymentId,
                payerAddress: address,
                description: sliceInfo?.description,
                targetToken: sliceInfo?.targetToken,
                totalReceivable,
                recipientAddress: sliceInfo?.recipientAddress,
            }}

            form={form}
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

            <Form.Item
                label="Amount "
                name={"totalReceivable"}
            >
                <Input
                    addonBefore={
                        <Avatar
                            size={24}
                            style={{ backgroundColor: "whitesmoke" }}
                            src={
                                TokenIcons[
                                TokenSymbol[sliceInfo?.targetToken]
                                ]
                            }
                        />
                    }
                    type="number"
                    suffix={`(${totalReceivable})`}
                    placeholder="Amount"
                    prefix={<BankOutlined className="site-form-item-icon" />}
                    disabled
                    size="medium"
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
                        {fields.map(({ key, name, ...restField }, idx) => (
                            <TokenSelector
                                key={idx}
                                name={name}
                                restField={restField}
                                form={form}
                                remove={remove}
                                signer={signer}
                                targetToken={sliceInfo?.targetToken}
                                exchangeContract={exchangeContract}

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

const TokenSelector = ({ form, restField, name, remove, exchangeContract, targetToken }) => {
    const [isLoading, setLoading] = useState(false);
    const [inputToken, setInputToken] = useState("");
    const [inputAmount, setAmountIn] = useState("");
    const [outputAmount, setAmountOut] = useState(0);
    const [error, setError] = useState(null);
    const { address } = useAccount();
    const { data: signer } = useSigner();

    const {
        getAmountInQoute
    } = useSwap();

    const updateInputAmount = async (inputAmount) => {
        const tokenContract = createTokenContract(
            inputToken,
            signer
        );

        const balance = await tokenContract.balanceOf(address);
        const amountIn = ethers.utils.parseEther(inputAmount);

        if (balance < amountIn) {
            setError(`Insufficient ${TokenSymbol[inputToken]} balance`);
            return;
        }

        setAmountIn(prev => inputAmount);

    }

    const handleInputAmountChange = async (value) => {

        const inputToken = form.getFieldValue(['Tokens', name, 'inputToken']);

        if (!inputToken || !targetToken) {
            return;
        }

        if (inputToken === targetToken) {
            form.setFieldValue(['Tokens', name, 'amountOut'], value);
            return;
        }

        if (value <= 0) {
            form.setFieldValue(['Tokens', name, 'amountOut'], value);
        }

        const inputAmount = await getAmountInQoute(
            exchangeContract,
            ethers.utils.parseEther(value),
            [inputToken, targetToken]
        );

        form.setFieldValue(['Tokens', name, 'amountOut'], inputAmount);
    }


    const handleOutputAmountChange = async (value) => {
        setAmountOut(value);

        const inputToken = form.getFieldValue(['Tokens', name, 'inputToken']);

        if (!inputToken || !targetToken) {
            return;
        }

        if (inputToken === targetToken) {
            updateInputAmount(value);
            return;
        }

        if (value <= 0) {
            updateInputAmount(0);
        }

        const inputAmount = await getAmountInQoute(
            exchangeContract,
            ethers.utils.parseEther(value),
            [inputToken, targetToken]
        );

        updateInputAmount(inputAmount);
    }

    return (
        <Space
            direction="vertical"
            size={"small"}
        >
            {error && <Alert message={error} type="error" showIcon />}

            <Space
                style={{
                    display: "flex",
                    marginBottom: 0,
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
                    style={{ marginBottom: 0 }}
                >
                    <Select
                        prefix={<SendOutlined className="site-form-item-icon" />}
                        placeholder="Token"
                        size="large"
                        style={{ width: 120 }}
                        loading={isLoading}
                        onChange={async (inputToken) => {
                            try {
                                setLoading(true);
                                setError(null);

                                setInputToken((prev) => inputToken);

                                if (inputAmount > 0) {
                                    await handleInputAmountChange(inputAmount);
                                    return;
                                }

                                if (outputAmount > 0) {
                                    await handleOutputAmountChange(outputAmount);
                                    return
                                }

                            } catch (error) {
                                setError("Token Pair does not exists");
                            } finally {
                                setLoading(false);
                            }
                        }}
                    >

                        {
                            Object.entries(TOKENS).map(([key, value]) => (
                                <Select.Option
                                    value={value}

                                >
                                    <Avatar
                                        size={24}
                                        style={{ backgroundColor: "whitesmoke" }}
                                        src={
                                            TokenIcons[
                                            TokenSymbol[value]
                                            ]
                                        }
                                    /> {key}
                                </Select.Option>))
                        }

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
                        step={0.01}
                        type="number"
                        value={inputAmount}
                        onChange={async (event) => {
                            try {
                                setLoading((prev) => true);

                                const value = (event.target.value).toString();
                                updateInputAmount(value);

                                handleInputAmountChange(value);

                            } catch (error) {
                                setError("Token Pair does not exist");
                            } finally {
                                setLoading(false);
                            }

                        }}
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
                        min={0.00}
                        step={0.01}
                        defaultValue={outputAmount}
                        onChange={
                            async (event) => {
                                try {
                                    setLoading((prev) => true);
                                    // setAmount((prev) => value);
                                    const value = (event.target.value).toString();

                                    handleOutputAmountChange(value);

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
        </Space>


    );
};

const Slice = () => {
    const params = new URLSearchParams(window.location.href);
    const contractAddress = params.get("cad");
    const paymentId = params.get("pid");

    if (!contractAddress) {
        return "Invalid Slice"
    }

    return (<SliceForm contractAddress={contractAddress} paymentId={paymentId} />)
}

export default Slice;
