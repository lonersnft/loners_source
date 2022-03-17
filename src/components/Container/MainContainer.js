import {
  Box,
  Text,
  Flex,
  Button,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./MainContainer.css";

import homePage from "../../img/homepage.jpg";
import homePageMobile from "../../img/homepagemobile.jpg";
import rmap1 from "../../img/rmap1.png";
import rmap2 from "../../img/rmap2.png";
import rmap3 from "../../img/rmap3.png";

function MainContainer() {
  const styles = {
    // backgroundImage: `url(${homePage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    height: "500vh",
  };

  // Mobile responsive
  const [isMobile, setIsMobile] = useState(false);

  const applyResponsive = () => {
    if (window.innerWidth <= 960) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    applyResponsive();
  }, []);

  window.addEventListener("resize", applyResponsive);
  return (
    <Box>
      <Header />
      <Box style={styles} bgImage={isMobile ? homePageMobile : homePage}>
        <Box className="content">
          <Flex justify="center">
            <Flex
              width={isMobile ? "30%" : "50%"}
              mt="45vh"
              justify="space-around"
              direction={isMobile && "column"}
            >
              <Box mb={isMobile && "3vh"}>
                <Link href="dapp">
                  <Button _hover={{ bg: "grey" }}>Enter the dApp</Button>
                </Link>
              </Box>
              <Box>
                <Link
                  href="https://lonersnft.gitbook.io/loners-documentation/the-project/loners-whitepaper-intro"
                  isExternal
                >
                  <Button _hover={{ bg: "grey" }}>Documentation</Button>
                </Link>
              </Box>
            </Flex>
          </Flex>
          <Grid
            templateColumns="repeat(2, 1fr)"
            mt={isMobile ? "45vh" : "50vh"}
            mr="2%"
            ml="2%"
            mb="15%"
            gap={isMobile ? 5 : 10}
          >
            <GridItem w="100%" h="80vh" ml={isMobile && "10%"}>
              <Box w={isMobile && "80%"}>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "4xl" : "5vh"}
                    fontWeight="semibold"
                    mt="2vh"
                    color="#bd3f3f"
                  >
                    Phase 1
                  </Text>
                </Flex>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "md" : "3vh"}
                    color="white"
                    mt="3vh"
                  >
                    - Loners collection design
                  </Text>
                </Flex>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "md" : "3vh"}
                    color="white"
                    mt="1vh"
                  >
                    - Website design and development
                  </Text>
                </Flex>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "md" : "3vh"}
                    color="white"
                    mt="1vh"
                  >
                    - Contracts and dApp development
                  </Text>
                </Flex>
              </Box>
              <Flex justify="center" w={isMobile && "80%"}>
                <Image src={rmap2} h="23vh" mt="6vh" />
              </Flex>
              <Flex justify="center">
                <Text
                  fontSize={isMobile ? "4xl" : "5vh"}
                  fontWeight="semibold"
                  mt="3vh"
                  color="#bd3f3f"
                >
                  Phase 3
                </Text>
              </Flex>
              <Flex justify="center">
                <Text fontSize={isMobile ? "md" : "3vh"} color="white" mt="3vh">
                  - 3D Loners Collection Mint
                </Text>
              </Flex>
              <Flex justify="center">
                <Text fontSize={isMobile ? "md" : "3vh"} color="white" mt="1vh">
                  - Loners Metaverse Game Development
                </Text>
              </Flex>
              <Flex justify="center">
                <Text fontSize={isMobile ? "md" : "3vh"} color="white" mt="1vh">
                  - Further announcements coming
                </Text>
              </Flex>
            </GridItem>
            <GridItem w="100%" h="80vh" mr={isMobile && "10%"}>
              <Flex justify="center" w={isMobile && "80%"}>
                <Image src={rmap1} h="23vh" mt="2vh" />
              </Flex>
              <Box w={isMobile && "80%"}>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "4xl" : "5vh"}
                    fontWeight="semibold"
                    mt="4vh"
                    color="#bd3f3f"
                  >
                    Phase 2
                  </Text>
                </Flex>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "md" : "3vh"}
                    color="white"
                    mt="3vh"
                  >
                    - Social media accounts launched
                  </Text>
                </Flex>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "md" : "3vh"}
                    color="white"
                    mt="1vh"
                  >
                    - Stealth launch and date announcement
                  </Text>
                </Flex>
                <Flex justify="center">
                  <Text
                    fontSize={isMobile ? "md" : "3vh"}
                    color="white"
                    mt="1vh"
                  >
                    - Mint and dApp available for everyone
                  </Text>
                </Flex>
              </Box>
              <Flex justify="center">
                <Image src={rmap3} h="23vh" mt="3vh" />
              </Flex>
            </GridItem>
          </Grid>
          <Box>
            <Flex
              direction="column"
              justify="center"
              w={isMobile ? "46%" : "50%"}
              ml="5%"
              mt={isMobile && "45vh"}
            >
              <Box align="center">
                <Text
                  color="#76D3F0"
                  fontSize={isMobile ? "3vh" : "5vh"}
                  mb={isMobile ? "3vh" : "10vh"}
                  fontWeight="semibold"
                >
                  Mint a Loner
                </Text>
              </Box>
              <Text
                color="#FFFFFF"
                fontSize={isMobile ? "1.5vh" : "2.5vh"}
                align={isMobile ? "left" : "center"}
                mb="3%"
                fontWeight="semibold"
              >
                An NFT collection of 10.000 unique generated illustrations
                <br></br>
                on depression and anxiety problems.
              </Text>
              <Text
                color="#FFFFFF"
                fontSize={isMobile ? "1.5vh" : "2.5vh"}
                align={isMobile ? "left" : "center"}
                mb="5%"
                fontWeight="semibold"
              >
                We are trying to raise awereness about those problems<br></br>
                that are more common than we may think.
              </Text>
              <Text
                color="#ffffffb5"
                fontSize={isMobile ? "1.2vh" : "2vh"}
                align={isMobile ? "left" : "center"}
                mb="1%"
                fontWeight="semibold"
              >
                - 300 Million people are affected worldwide (close to 5% of the
                whole population).
              </Text>
              <Text
                color="#c03434a8"
                fontSize={isMobile ? "1.2vh" : "2vh"}
                align={isMobile ? "left" : "center"}
                mb="1%"
                fontWeight="semibold"
              >
                - Each year, 800 000 of them commit suicide.
              </Text>
              <Text
                color="#ffffffb5"
                fontSize={isMobile ? "1.2vh" : "2vh"}
                align={isMobile ? "left" : "center"}
                mb="3%"
                fontWeight="semibold"
              >
                - Most isolate themselves, and live without curing their
                depression.
              </Text>
              <Text
                color="#FFFFFF"
                fontSize="2.5vh"
                align="center"
                mb="1%"
                fontWeight="semibold"
                display={isMobile && "none"}
              >
                Join us to spread awareness, and make the world a little bit
                better !
              </Text>
            </Flex>
          </Box>
          <Flex className="spacer" h="10%" direction="column" mb="15%"></Flex>
          <Box>
            <Flex
              justify="center"
              mt={isMobile ? "10vh" : "50vh"}
              ml="35%"
              direction="column"
              w="60%"
            >
              <Text
                color="#bd3f3f"
                fontSize={isMobile ? "3vh" : "5vh"} 
                mb={isMobile ? "3vh" : "8vh"}
                fontWeight="semibold"
                align="center"
              >
                Grow your wealth and help a good cause
              </Text>
              <Text
                color="#FFFFFF"
                fontSize={isMobile ? "1.5vh" : "2.5vh"}
                align="center"
                mb="1%"
                fontWeight="semibold"
              >
                Minting a LONER give you instant access to the Dapp
              </Text>
              <br></br>
              <Text
                color="#76d3f0"
                fontSize={isMobile ? "1.5vh" : "2.5vh"}
                align="center"
                mb="1%"
                fontWeight="semibold"
              >
                Get juicy rewards by staking your Lonely Coins ! <br></br>10% of
                the mint liquidity while be donated to an association for
                mental-health and wellness that will be voted on our{" "}
                <a target="_blank" href="https://discord.gg/hNEtMs7FR3">
                  Discord
                </a>
              </Text>
              <br></br>
              <Text
                color="#FFFFFF"
                fontSize={isMobile ? "1.5vh" : "2.5vh"}
                align="center"
                mb="1%"
                fontWeight="semibold"
              >
                With The Loners, you can heal the world while growing your
                crypto-wealth.
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default MainContainer;
