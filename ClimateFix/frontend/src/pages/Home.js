import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import AuthNav from "../components/Navbar/AuthNav";
import ImageBg from "../assets/images/trees-bg.jpeg";
import CustomButton from "../components/CustomButton/customButton";
import { locations } from "../utils/data";
import { location } from "../assets/svgs/svg";
import { auth, db } from "../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import MyTree1 from "../assets/images/my-tree1.jpeg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";
import axios from "axios";
import WeatherTemp from "../components/Tamplates/weatherTemp";
import Cookies from "js-cookie";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [myTrees, setMyTrees] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const userId = Cookies.get("userId");

  const navigate = useNavigate();

  const q = query(collection(db, "plantTrees"), 
  where("userId", "==", userId), 
  orderBy("created", "desc")
);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      console.log(doc);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (error) {
      toaster.danger("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    const q = query(collection(db, "plantTrees"), 
    where("userId", "==", userId), 
    orderBy("created", "desc")
  );
    onSnapshot(q, (querySnapshot) => {
      setMyTrees(
        querySnapshot.docs.map((myTree) => ({
          id: myTree.id,
          data: myTree.data(),
        }))
      );
    });
  }, []);

  const api = process.env.REACT_APP_IBM_API;

  useEffect(() => {
    axios
      .get(api,
      )
      .then((res) => {
        setWeatherData(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box>
      <AuthNav />
      <Box p="20px" w="100%" display="flex" justifyContent="space-between">
        <Box w="70%">
          <Image
            src={ImageBg}
            borderRadius="8px"
            h="400px"
            w="100%"
            objectFit="cover"
            alt="bg"
          />
          <Box mt="20px">
            <Text fontSize="20px" color="brand.orange">
              Welcome back {name}
            </Text>
          </Box>

          {/* Locations */}
          <Box mt="40px" px="40px">
            <Flex alignItems="center">
              <Box mr="10px">{location}</Box>
              <Text fontSize="25px" fontWeight="normal">
                Locations
              </Text>
            </Flex>
            <SimpleGrid columns={3} gap="38">
              {locations.map((location) => (
                <Box
                  key={location.country}
                  mt="10px"
                  borderRadius="8px"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                  minH="310px"
                >
                  <Image
                    src={location.image}
                    borderTopRightRadius="8px"
                    borderTopLeftRadius="8px"
                    w="100%"
                    objectFit="cover"
                    h="400px"
                    maxH="200px"
                    alt={location.country}
                  />
                  <Box p="20px">
                    <Text color="brand.dark" fontWeight="bold">
                      {location.country}
                    </Text>
                    <Text mt="8px" color="brand.lightGreen" fontSize="14px">
                      {location.figure} trees planted
                    </Text>
                    <Box mt="20px">
                      <a href={location.route}>
                        <CustomButton
                          border="1px solid #18541A"
                          bg="none"
                          color="brand.dark"
                          hoverColor="brand.white"
                          hoverBg="brand.lightGreen"
                        >
                          <Text fontWeight="medium">Plant here</Text>
                        </CustomButton>
                      </a>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          {/* Plants */}
          <Box mt="60px" px="40px">
            <Flex alignItems="center">
              <Box mr="10px">{location}</Box>
              <Text fontSize="25px" fontWeight="normal">
                My Trees
              </Text>
            </Flex>
            <SimpleGrid columns={3} gap="38">
              {myTrees.map((myTree) => (
                <Box
                  key={myTree.id}
                  mt="10px"
                  borderRadius="8px"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                  minH="310px"
                >
                  <Image
                    src={myTree.data.imageUrl || MyTree1}
                    borderTopRightRadius="8px"
                    borderTopLeftRadius="8px"
                    w="100%"
                    objectFit="cover"
                    h="400px"
                    maxH="200px"
                    alt={myTree.country}
                  />
                  <Box p="20px">
                    <Text color="brand.dark" fontWeight="bold">
                      {myTree.data.region}, Nigeria
                    </Text>
                    <Text mt="8px" color="brand.lightGreen" fontSize="14px">
                      1 tree planted
                    </Text>
                    <Text mt="8px" color="brand.lightGreen" fontSize="14px">
                      {myTree.data.tree}
                    </Text>
                    <Box mt="20px">
                        <a href={`/view-plants/${myTree.id}`}>
                            <CustomButton
                                border="1px solid #18541A"
                                bg="none"
                                color="brand.dark"
                                hoverColor="brand.white"
                                hoverBg="brand.lightGreen"
                            >
                                <Text fontWeight="medium">View</Text>
                            </CustomButton>
                        </a>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
        {/* Weather Condition */}
        <WeatherTemp weatherData={weatherData} />
        {/* <Box
          w="27%"
          bg="#F2F2F2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
          borderRadius="8px"
          p="20px"
        >
          <Image
            src={Cloud}
            alt="cloud"
            w={120}
            h={120}
            mt="-50px"
            ml="-30px"
          />
          <Text mt="20px" ml="20px" fontSize="24px" color="brand.dark">
            Partly Cloudy
          </Text>
          <Flex mt="30px" alignItems="center">
            <Box w="100%" ml="14px">
              <Text fontSize="12px" color="brand.orange">
                {weatherData?.dayOfWeek[0]}
              </Text>
              <Flex fontSize="15px" alignItems="center" mt="15px">
                <Image src={CloudIcon} alt="cloud" w={30} h={30} />
                <Text fontWeight="light" fontSize="14px" ml="10px">
                  {weatherData?.narrative[0]}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Flex mt="20px" alignItems="center">
            <Box w="100%" ml="14px">
              <Text fontSize="12px" color="brand.orange">
                {weatherData?.dayOfWeek[1]}
              </Text>
              <Flex fontSize="15px" alignItems="center" mt="15px">
                <Image src={CloudIcon} alt="cloud" w={30} h={30} />
                <Text fontWeight="light" fontSize="14px" ml="10px">
                  {weatherData?.narrative[1]}
                </Text>
              </Flex>
            </Box>
          </Flex>

        </Box> */}
      </Box>
    </Box>
  );
};

export default Home;
