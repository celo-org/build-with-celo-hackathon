import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import NigMap from "../assets/images/nigeria-map.png";
import SouthMap from "../assets/images/south-africa-map.jpeg";
import MexicoMap from "../assets/images/mexico-map.jpeg";
import { allExperts, allTrees, MexicoStates, SouthAfricaStates, states } from "../utils/data";
import { TriangleDownIcon } from "@chakra-ui/icons";
import CustomButton from "../components/CustomButton/customButton";
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toaster } from "evergreen-ui";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import TextInput from "../components/TextInputs/TextInput";

const PlantNow = () => {
  const [region, setRegion] = useState("");
  const [tree, setTree] = useState("");
  const [walletAddr, setWalletAddr] = useState("");
  const [treeAddr, setTreeAddr] = useState("");
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  const { id } = useParams();

  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let index = getRandomNumber(0, allExperts.length - 1);
    try {
      await addDoc(collection(db, "plantTrees"), {
        region,
        tree,
        wallet_addr: walletAddr,
        assignedExpertName: allExperts[index].name,
        assignedExpertEmail: allExperts[index].email,
        videoUrl: "",
        imageUrl: "",
        treeAddr,
        userId: userId,
        created: Timestamp.now(),
      });
      navigate("/invite-pending");
    } catch (error) {
      toaster.danger(error);
    }
  };

  const getRandomNumber = (min, max) => {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;

    return result;
  };

  const countryImage = id === '1' ? NigMap : id === '2' ? SouthMap : MexicoMap;
  const countries = id === '1' ? states : id === '2' ? SouthAfricaStates : MexicoStates;

  return (
    <Box>
      <AuthNav />
      <Box padding="30px" mx="50px">
        <Box>
          <Text fontSize="25px" fontWeight="normal">
            New Plant
          </Text>
          <Text color="brand.lightGreen">Step 1</Text>
        </Box>
        <Box mt="20px">
          <Image
            src={countryImage}
            h="300px"
            w="100%"
            objectFit="cover"
            alt="nig-map"
          />
          <Text mt="40px" color="brand.green" fontWeight="bold">
            Please select any of the available land spaces and trees to be
            planted.
          </Text>

          <SimpleGrid columns={2} gap="30px">
            <FormControl mt="20px">
              <FormLabel color="brand.dark" fontSize="14px" fontWeight="500">
                    Region
                </FormLabel>
              <Select
                placeholder="Please select a region"
                focusBorderColor="#65D593"
                _focus={{ border: "0.1px solid #65D593" }}
                _placeholder={{
                  color: "brand.grey",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                icon={<TriangleDownIcon />}
                size="lg"
                fontSize="16px"
                height="48px"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {countries.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt="20px">
            <FormLabel color="brand.dark" fontSize="14px" fontWeight="500">
                    Tree type
                </FormLabel>
              <Select
                placeholder="Please select a tree to be planted"
                focusBorderColor="#65D593"
                _focus={{ border: "0.1px solid #65D593" }}
                _placeholder={{
                  color: "brand.grey",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
                icon={<TriangleDownIcon />}
                size="lg"
                fontSize="16px"
                height="48px"
                value={tree}
                onChange={(e) => setTree(e.target.value)}
              >
                {allTrees.map((tree) => (
                  <option value={tree} key={tree}>
                    {tree}
                  </option>
                ))}
              </Select>
            </FormControl>
            <TextInput
              placeholder="Input your wallet address"
              label="Wallet Address"
              value={walletAddr}
              onChange={(e) => setWalletAddr(e.target.value)}
              maxLength={35}
              minLength={26}
            />
            <TextInput
              placeholder="Input intended tree location address"
              label="Tree Full Address"
              value={treeAddr}
              onChange={(e) => setTreeAddr(e.target.value)}
              maxLength={35}
              minLength={26}
            />
          </SimpleGrid>
          <Box w="100%" textAlign="center" mt="40px">
            {/* <a href="/invite-pending"> */}
            <CustomButton
              bg="brand.orange"
              color="brand.white"
              hoverBg="brand.lightGreen"
              mx="auto"
              w="40%"
              onClick={handleSubmit}
              disabled={!region || !tree || !walletAddr}
            >
              <Text fontWeight="medium">Proceed</Text>
            </CustomButton>
            {/* </a> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlantNow;
