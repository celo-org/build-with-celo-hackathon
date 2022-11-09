import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Spinner } from "evergreen-ui";

import Cloud from "../../assets/icons/cloud.png";
import CloudIcon from "../../assets/icons/cloud-icon.png";

const WeatherTemp = ({ weatherData }) => {
//   const [weatherData, setWeatherData] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(false);

  setTimeout(() => {
    setLoadingWeather(true);
  }, 5000);

  return (
    <Box
      w="27%"
      bg="#F2F2F2"
      style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
      borderRadius="8px"
      p="20px"
      h="100vh"
    >
      <Image src={Cloud} alt="cloud" w={120} h={120} mt="-50px" ml="-30px" />
      {!loadingWeather ? (
        <Spinner />
      ) : (
        <>
          <Text mt="20px" fontSize="24px" color="brand.dark">
            No data available
          </Text>
          <Flex mt="30px" alignItems="center">
            <Box w="100%" ml="14px">
              <Text fontSize="12px" color="brand.orange">
                {/* {weatherData?.dayOfWeek[0]} */}
              </Text>
              {/* <Flex alignItems="center" mt="15px">
                <Image src={CloudIcon} alt="cloud" w={30} h={30} />
                <Text fontWeight="light" fontSize="13px" ml="10px">
                  {weatherData?.narrative[0]}
                </Text>
              </Flex> */}
            </Box>
          </Flex>

          {/* <Flex mt="20px" alignItems="center">
            <Box w="100%" ml="14px">
              <Text fontSize="12px" color="brand.orange">
                {weatherData?.dayOfWeek[1]}
              </Text>
              <Flex alignItems="center" mt="15px">
                <Image src={CloudIcon} alt="cloud" w={30} h={30} />
                <Text fontWeight="light" fontSize="13px" ml="10px">
                  {weatherData?.narrative[1]}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Flex mt="20px" alignItems="center">
            <Box w="100%" ml="14px">
              <Text fontSize="12px" color="brand.orange">
                {weatherData?.dayOfWeek[2]}
              </Text>
              <Flex alignItems="center" mt="15px">
                <Image src={CloudIcon} alt="cloud" w={30} h={30} />
                <Text fontWeight="light" fontSize="13px" ml="10px">
                  {weatherData?.narrative[2]}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Flex mt="20px" alignItems="center">
            <Box w="100%" ml="14px">
              <Text fontSize="12px" color="brand.orange">
                {weatherData?.dayOfWeek[3]}
              </Text>
              <Flex alignItems="center" mt="5px">
                <Image src={CloudIcon} alt="cloud" w={30} h={30} />
                <Text fontWeight="light" fontSize="13px" ml="10px">
                  {weatherData?.narrative[3]}
                </Text>
              </Flex>
            </Box>
          </Flex> */}
        </>
      )}
    </Box>
  );
};

export default WeatherTemp;
