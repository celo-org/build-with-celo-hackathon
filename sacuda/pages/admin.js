import { useState, useRef } from "react";
import axios from "axios";
import styles from '../styles/home.module.scss';
import {
    Flex,
    Avatar,
    Text,
    Box,
    Icon,
    Button,
    Heading,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Link
  } from "@chakra-ui/react";

import { FiEye, FiUser } from "react-icons/fi";

import { Table } from "react-chakra-pagination";

const url = "http://localhost:3000/api/getUsers";

export default function admin({users}) {
    const [page, setPage] = useState(1);

    const { onOpen } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const [modalValue, setModalValue] = useState([])
    const [isOpen,setIsOpen] = useState(false)
    function onClose(){
        setIsOpen(false)
      }

    function handleEditClick({user}){
        setIsOpen(true)
     // we've set the passed todo to modal value
        setModalValue(user)
        console.log({user})
     }


    function handleEditSubmit(e){
        e.preventDefault();
        editTodo(modalValue.id,modalValue)
        setModalValue("")
        setIsOpen(false)
      }

      function handleEditInputChange(e,id){ 
        setModalValue({ ...modalValue, text: e.target.value });
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
            <Box p="12">
            <Heading size="sm" as="h1">
            List of Sacuda Users
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
            <form onSubmit={handleEditSubmit}>
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
                    <Input
                    height='80px'
                    width='50%'

                    value={modalValue.biag} 
                    key={modalValue.id}
                    variant="outline" 
                    type="text" 
                    placeholder="Diagnostic..."
                    />
                </Box>    
                <Box><Heading as='h1' textDecoration='underline'>Bussiness Scoring</Heading>
                    <Input  
                    height='80px'
                    width='50%'
                    value={modalValue.bscore} 
                    key={modalValue.id}
                    variant="outline" 
                    type="text" 
                    placeholder="Scoring..."
                    />
                </Box>
            </SimpleGrid>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
            Close
            </Button>
            <Button type="submit" colorScheme="teal" mr={3}>
            Update
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
        body: JSON.stringify(0)
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