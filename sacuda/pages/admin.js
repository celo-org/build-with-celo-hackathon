import { useState, mutate } from "react";
import Head from 'next/head';
import { Text, Box, Icon, Button, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, SimpleGrid, Link, FormControl, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { FiEye, FiUser } from "react-icons/fi";
import { Table } from "react-chakra-pagination";
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOff } from "next-auth/react";
import { useAccount, useConnect, useContract, useContractRead, useContractWrite, useNetwork, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import tokenContract from "../../contracts/abi/metadata.json";
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

const url = "http://localhost:3000/api/getUsers";

export default function admin({users}) {

    const CONTRACT_ADDRESS="0x34422efA66294820a0bb169294c28a880B9a88bf";
    
    const sacudaAbi = [
        {
            type:"function",
            stateMutability:"nonpayable",
            outputs:[],
            name:"mint",
            inputs:[
                {
                    type:"address",
                    name:"_user",
                    internalType:"address"
                },
                {
                    type:"bool",
                    name:"_isEnhancer",
                    internalType:"bool"
                },
                {
                    type:"string",
                    name:"_name",
                    internalType:"string"
                }
            ]
        }
    ]

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

    // const {
    //     data: mintData,
    //     write: mintToken,
    //     isLoading: isMintLoading,
    //     isSuccess: isMintStarted,
    //     error: mintError,
    //   } = useContractWrite({
    //     address: CONTRACT_ADDRESS,
    //     abi: tokenContract.output.abi,
    //     functionName: "mint",
    //   });

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


    //   const mintSACSwob = async () => {
    //     console.log(bWalletSta)
    //     console.log(bNameSta)
    //     await mintToken({
    //       args: [
    //         bWalletSta,
    //         false,
    //         bNameSta,
    //       ],
    //     });
    //   };
    
    function onClose(){
        setIsOpen(false)
      }

    function handleEditClick({user}){
        setIsOpen(true)
        setModalValue(user)
        console.log({user})
        setBWalletSta(user.wallet)
        setBNameSta(user.bname)
     }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        } = useForm()


    const onSubmit = async (values) => {
        console.log(bWalletSta)
        console.log(bNameSta)
        if (buttonState === 1) {
        console.log('regmail:'+modalValue.email)
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
                mutate(`/api/updateProfile/${reqemail}`, data, false);
                router.push("/");
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
                <Button type="submit" colorScheme="blue" mr={3} onClick={() => (setButtonState(1))}>
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

export const getServerSideProps = async () => {
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