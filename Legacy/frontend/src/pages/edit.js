import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import getUserInterval, { checkConnection, editLegacy } from "../utils/helpers.js";

const Edit = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] =  useState(true);
  const [legatee, setLagatee] = useState();
  const [checkInterval, setCheckInterval] = useState();
  const [createLoading, setCreateLoading] = useState(false);
  const [userNextOfKin, setUserNextOfKin] = useState();

  useEffect(() => {
    getLegacy().then(async() => { setIsLoading(false)
    const legacy = await getUserInterval(checkConnection);
    console.log(legacy)
    });
  }, [])

  async function getLegacy() {
    const legacy = await getUserInterval(await checkConnection());
    setCheckInterval(legacy.interval.split(" ")[1]);
    setLagatee(legacy.legatee);
    setUserNextOfKin(localStorage.getItem("legatee"));
  }

  const edit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try { 
      const res = await editLegacy(legatee, checkInterval * 3600 * 24);
      localStorage.setItem("legatee", userNextOfKin);
      console.log(userNextOfKin);
      setCreateLoading(false);
      if (res) {
        navigate("/profile");
      }
    } catch (error) {
      toaster.danger("An Error occured!");
      setCreateLoading(false);
    }
  };

  const handleLegateeChange = (event) => {
    setLagatee(event.target.value);
  };

  const handleCheckIntervalChange = (event) => {
    setCheckInterval(event.target.value);
  };

  return (
    !isLoading &&
    <Box
      padding={{ base: "10px 40px", lg: "30px 80px" }}
      bg="#02044A"
      minH="100vh"
    >
      <Navbar />
      <Box p={{base: "15px 10px", lg:"15px 50px"}} margin="50px 0">
        <Text
          color="white"
          fontSize={{ base: "20px", lg: "50px" }}
          fontWeight="black"
          mb="20px"
        >
          Let's get you started!
        </Text>
        <Box h="1px" bgColor="brand.grey"></Box>
        <form>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacingX="40px"
            spacingY="20px"
            mt="20px"
          >
            <TextInput
              label="Next of Kin Full Name"
              placeholder="Enter your next of kin full name"
              type="text"
              color="brand.white"
              onChange={(e) => setUserNextOfKin(e.target.value)}
              defaultValue={userNextOfKin}
              bg="none"
            />
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacingX="40px"
            spacingY="20px"
            mt="20px"
          >
            <TextInput
              label="Next of kin wallet address"
              placeholder="Enter your next of kin wallet address"
              type="text"
              color="brand.white"
              onChange={handleLegateeChange}
              defaultValue={legatee}
              bg="none"
            />
            <TextInput
              label="CheckInterval (In Days)"
              placeholder="Enter how frequently you want to check in"
              type="number"
              color="brand.white"
              onChange={handleCheckIntervalChange}
              defaultValue={checkInterval}
              bg="none"
            />
          </SimpleGrid>
          <CustomButton
            w={{ base: "90%", lg: "60%" }}
            bg="brand.teal"
            d="flex"
            hover="none"
            color="brand.white"
            m="40px auto"
            hoverColor="brand.white"
            isLoading={createLoading}
            onClick={edit}
            border="1px solid #15F4CB"
            disabled={!userNextOfKin || !legatee || !checkInterval}
          >
            Confirm
          </CustomButton>
        </form>
      </Box>
    </Box>
  );
};

export default Edit;
