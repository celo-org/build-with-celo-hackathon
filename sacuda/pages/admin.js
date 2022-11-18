import { useState } from "react";
import Head from 'next/head';
import { SacudaContext } from '../components/sacudaContext';
import { Text, Box, Icon, Button, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, SimpleGrid, Link, FormControl, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { FiEye, FiUser } from "react-icons/fi";
import { Table } from "react-chakra-pagination";
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOff } from "next-auth/react";
import { useAccount, useConnect, useContract, useContractRead, useContractWrite, useNetwork, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

const url = process.env.NEXTAUTH_URL+"api/getUsers";

export default function Admin({users}) {

    const {uMail,setUMail} = SacudaContext();
    const {uProfile, setUProfile} = SacudaContext();

    const CONTRACT_ADDRESS="0x34422efA66294820a0bb169294c28a880B9a88bf";
    
    const sacudaAbi = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"error","name":"NotAPercentage","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"NameUpdated","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true},{"type":"string","name":"newName","internalType":"string","indexed":false}],"anonymous":false},{"type":"event","name":"RoleAdminChanged","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"bytes32","name":"previousAdminRole","internalType":"bytes32","indexed":true},{"type":"bytes32","name":"newAdminRole","internalType":"bytes32","indexed":true}],"anonymous":false},{"type":"event","name":"RoleGranted","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"sender","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RoleRevoked","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32","indexed":true},{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"sender","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"UserReportUpdated","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true},{"type":"uint8","name":"paymentHistory","internalType":"uint8","indexed":false},{"type":"uint8","name":"amountOwed","internalType":"uint8","indexed":false},{"type":"uint8","name":"creditLength","internalType":"uint8","indexed":false},{"type":"uint8","name":"creditMix","internalType":"uint8","indexed":false},{"type":"uint8","name":"newCredit","internalType":"uint8","indexed":false}],"anonymous":false},{"type":"event","name":"WeightsUpdated","inputs":[{"type":"uint8","name":"paymentHistory","internalType":"uint8","indexed":false},{"type":"uint8","name":"amountOwed","internalType":"uint8","indexed":false},{"type":"uint8","name":"creditLength","internalType":"uint8","indexed":false},{"type":"uint8","name":"creditMix","internalType":"uint8","indexed":false},{"type":"uint8","name":"newCredit","internalType":"uint8","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"ADMIN_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"CLERK_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DEFAULT_ADMIN_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"ENHANCER_ROLE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"WOB_ROLE","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addAdmin","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addClerk","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"amountOwedWeight","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burn","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"creditLengthWeight","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"creditMixWeight","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"getRoleAdmin","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"grantRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"hasRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"_user","internalType":"address"},{"type":"bool","name":"_isEnhancer","internalType":"bool"},{"type":"string","name":"_name","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"newCreditWeight","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nftId","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"paymentHistoryWeight","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeAdmin","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeClerk","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"paymentHistory","internalType":"uint8"},{"type":"uint8","name":"amountOwed","internalType":"uint8"},{"type":"uint8","name":"creditLength","internalType":"uint8"},{"type":"uint8","name":"creditMix","internalType":"uint8"},{"type":"uint8","name":"newCredit","internalType":"uint8"}],"name":"report","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeRole","inputs":[{"type":"bytes32","name":"role","internalType":"bytes32"},{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"score","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateName","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"string","name":"_name","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateReport","inputs":[{"type":"uint256","name":"_tokenId","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateWeights","inputs":[{"type":"bytes","name":"data","internalType":"bytes"}]}]
    
    const { isConnected } = useAccount();
    const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
        signIn(); //What to show to unathenticated users
    }
    })

    const [bWalletSta, setBWalletSta] = useState("0x000000000000000000000000000000000000dEaD");
    const [bNameSta, setBNameSta] = useState("none");
    const [page, setPage] = useState(1);
    const [modalValue, setModalValue] = useState([])
    const [isOpen,setIsOpen] = useState(false)
    const [buttonState,setButtonState] =useState()


    const { config, error } = usePrepareContractWrite({
          address: CONTRACT_ADDRESS,
          abi: sacudaAbi,
          functionName: 'mint',
          args: [
            bWalletSta,
            false,
            bNameSta
          ]
        });

    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    const mainRedirect = () => {
        router.push('/selection') }

    const walletRedirect= () => {
        router.push('/auth/walletConnect') }
    
    function onClose(){
        setIsOpen(false)
      }

    function handleEditClick({user}){
        setBWalletSta(user.wallet)
        setBNameSta(user.bname)
        setIsOpen(true)
        setModalValue(user)
     }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        } = useForm()


    const onSubmit = async (values) => {

        if (buttonState === 1) {
        console.log('regmail:'+modalValue.email)
        console.log(bWalletSta)
        console.log(bNameSta)
        const reqemail = modalValue.email;
        const preProf = `{"profile": 2}`;
        const prof = JSON.parse(preProf);

        const finalValues = { ...values, ...prof}
        await write()
        try {
            const res = await fetch(`/api/updateProfile/${reqemail}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(finalValues)

            });
            if (!res.ok) {
            throw new Error(res.status);
            }

            const { data } = await res.json();
            //mutate(`/api/updateProfile/${reqemail}`, data, false);
            //router.push("/");
            onClose()
        } catch (error) {
            console.log(error);
        }
        };
    
        if (buttonState === 2) {
            console.log('regmail:'+modalValue.email)
            const reqemail = modalValue.email;
            const preProf = `{"profile": 100}`;
            const prof = JSON.parse(preProf);

            const finalValues = { ...values, ...prof}
            try {
                const res = await fetch(`/api/updateProfile/${reqemail}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(finalValues)

                });
                if (!res.ok) {
                throw new Error(res.status);
                }

                const { data } = await res.json();
                // mutate(`/api/updateProfile/${reqemail}`, data, false);
                // router.push("/");
            } catch (error) {
                console.log(error);
            }
            };
    }

    const tableData = users.map((user, index) => ({
        name: user.name,
        surname: user.surname,
        email: user.email,
        wallet: user.wallet,
        bussiness: user.bname,
        action: (
          <Button
            colorScheme="gray"
            onClick={() => handleEditClick({user})}
            size="sm"
          >
            <Icon as={FiEye} fontSize="20" />
          </Button>
          
        )
      }));

      const tableColumns = [
            {
            Header: "Name",
            accessor: "name"
            },
            {
                Header: "Surname",
                accessor: "surname"
                },
            {
            Header: "Email",
            accessor: "email"
            },
            {
            Header: "Wallet",
            accessor: "wallet"
            },
            {
            Header: "Bussiness Name",
            accessor: "bussiness"
            },
            {
            Header: "",
            accessor: "action"
            }
        ];

        if (isConnected) {
            if(uMail===session.user.email) {
                if (uProfile === 1) {
        return (
            <>
            <main className={styles.lists}>
            <Head>
                <title>Sacuda | A finantial revolution!</title>
            </Head>
            <Box p="12">
            <Heading as="h1">
            Admin Dashboard - List of Sacuda WOBs
            </Heading>
            <Box mt="6">
            <Table
                colorScheme="blue"
                // Fallback component when list is empty
                emptyData={{
                    icon: FiUser,
                    text: "Nobody is registered here."
                }}
                totalRegisters={users.length}
                page={page}
                // Listen change page event and control the current page using state
                onPageChange={(page) => setPage(page)}
                columns={tableColumns}
                data={tableData}
                />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent  className={styles.lists}>
            <ModalHeader><Heading as='h1'>BUSSINESS NAME: {modalValue.bname} SECTOR: {modalValue.bsector}</Heading></ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
            <Heading as='h1' textDecoration='underline'>WOB Details</Heading>
            <SimpleGrid columns={5} className={styles.lists}>
                <Box height='80px'><Heading as='h2'>Name</Heading><Text >{modalValue.name}</Text></Box>
                <Box height='80px'><Heading as='h2'>Surname</Heading><Text >{modalValue.name}</Text></Box>
                <Box height='80px'><Heading as='h2'>EMail</Heading><Text >{modalValue.name}</Text></Box>
                <Box height='80px'><Heading as='h2'>Country</Heading><Text >{modalValue.country}</Text></Box>
                <Box height='80px'><Heading as='h2'>Personal Linkedin</Heading><Link >{modalValue.linkedin}</Link></Box>
            </SimpleGrid>
            <Heading as='h1' textDecoration='underline'>Bussiness Details</Heading>
            <SimpleGrid columns={3} className={styles.lists}>
                <Box height='80px'><Heading as='h2'>Business IG</Heading><Link >{modalValue.big}</Link></Box>
                <Box height='80px'><Heading as='h2'>Business FB</Heading><Link >{modalValue.bfb}</Link></Box>
                <Box height='80px'><Heading as='h2'>Business LinkedIn</Heading><Link >{modalValue.blinked}</Link></Box>
            </SimpleGrid>
            <Heading as='h1' textDecoration='underline'>Bussiness Idea</Heading>
            <SimpleGrid columns={1}  className={styles.lists}>
                <Box height='auto'><Text >{modalValue.bidea}</Text></Box>
            </SimpleGrid>
            <SimpleGrid columns={2}  className={styles.lists}>
                <Box><Heading as='h1' textDecoration='underline'>Bussiness Diagnostic</Heading>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel marginBottom='1%' htmlFor='name'>Please enter the bussiness diagnostic below</FormLabel>
                            <Input
                                height='80px'
                                width='50%'
                                value={modalValue.bdiag} 
                                key={modalValue.id}
                                variant="outline" 
                                type="text" 
                                placeholder="Diagnostic..."
                                id='bdiag'
                                {...register('bdiag', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'Minimum length should be 1' },
                                })}
                            />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>    
                <Box><Heading as='h1' textDecoration='underline'>Bussiness Scoring</Heading>
                <FormControl isInvalid={errors.name}>
                        <FormLabel marginBottom='1%' htmlFor='name'>Please enter the bussiness scoring below. If the bussiness does not meet approval criteria, please enter a scoring of 0</FormLabel>
                            <Input
                                height='80px'
                                width='50%'
                                value={modalValue.bscore} 
                                key={modalValue.id}
                                variant="outline" 
                                type="text" 
                                placeholder="Diagnostic..."
                                id='bscore'
                                {...register('bscore', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'Minimum length should be 1' },
                                })}
                            />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
            </SimpleGrid>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="cyan" mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button type="submit" colorScheme="red" mr={3} onClick={() => (setButtonState(2))}>
                    Disapprove
                </Button>
                <Button type="submit" colorScheme="green" mr={3} disabled={!write} onClick={() => (setButtonState(1))}>
                    Approve
                </Button>
            </ModalFooter>
          </form>
          
          </ModalContent>
          </Modal>
            </Box>
            
        </main>
        </>

        );

    }
        else
        return(
            <main className={styles.container}>
                            
            <Head>
            <title>Sacuda | A finantial revolution!</title>
            </Head>
            <Heading as={'h1'}>
                Welcome!
            </Heading>
            <Text 
                as={'h2'}
                marginTop='1%'
                marginBottom='1%'
            >
                You´re not supposed to be here
            </Text>
    </main>
        )
        }   
    }
    else
    return(
        <main className={styles.container}>
                        
        <Head>
        <title>Sacuda | A finantial revolution!</title>
        </Head>
        <Heading as={'h1'}>
            Welcome!
        </Heading>
        <Text 
            as={'h2'}
            marginTop='1%'
            marginBottom='1%'
        >
            You´re not supposed to be here
        </Text>
</main>
    )
}

export const getServerSideProps = async () => {
    console.log(url)
    try {
      const response = await fetch(url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({profile: 0})
      });
      const {data} = await response.json();
      return {
        props: { 
            users: JSON.parse(JSON.stringify(data)) 
        },
      };
    } catch (e) {
      console.error(e);
    }
  } 