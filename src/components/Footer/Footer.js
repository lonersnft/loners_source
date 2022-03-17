import { Box, Grid, Text, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "@chakra-ui/react";

export default function Footer() {
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
    <Box bgColor="#878383" color="#fff" p={5}>
      <Grid
        templateColumns={isMobile ? null : "1.84fr 1fr 1fr"}
        maxWidth="100vw"
        gap={isMobile ? "55px" : "100px"}
      >
        <GridItem colSpan={1}>
          <Text fontSize="30px" mb="3vh" color="#000000db" fontWeight="bold">
            Loners NFT Collection
          </Text>
          <Text
            align="justify"
            fontSize="16px"
            color="#000000"
            fontWeight="semi-bold"
          >
            The information provided on this website does not constitute
            investment advice, financial advice, trading advice, or any other
            sort of advice, and you should not treat any of the website's
            content as such. The Loners team provides the website as a service
            to the public, and is not responsible for, and expressly disclaims
            all liability for, damages of any kind arising out of use, reference
            to, or reliance on any information contained within this website.
            While the information contained within this website is periodically
            updated, no guarantee is given that the information provided on this
            website is correct, complete, and up-to-date.
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="30px" mb="3vh" color="#000000" fontWeight="bold">
            Important Links
          </Text>
          <Grid templateRows="repeat(3, 0.1fr)" gap="30px">
            <GridItem>
              <Link
                href="https://lonersnft.gitbook.io/loners-documentation/the-project/loners-whitepaper-intro"
                isExternal
              >
                <Text color="#000000" fontSize="20px">
                  WhitePaper
                </Text>
              </Link>
            </GridItem>
            <GridItem>
              <Link
                href="https://lonersnft.gitbook.io/loners-documentation/the-ecosystem/the-loners-collection"
                isExternal
              >
                <Text color="#000000" fontSize="20px">
                  What is the Loners NFT Collection
                </Text>
              </Link>
            </GridItem>
            <GridItem>
              <Text color="#000000" fontSize="20px">
                Smart Contracts
              </Text>
            </GridItem>

            <Text></Text>
          </Grid>
        </GridItem>
        <GridItem>
          <Text fontSize="30px" mb="3vh" color="#000000" fontWeight="bold">
            Community
          </Text>
          <Grid templateRows="repeat(2, 0.1fr)" gap="30px">
            <GridItem>
              <Link href="https://twitter.com/loners_nft" isExternal>
                <Text color="#000000" fontSize="20px">
                  Twitter
                </Text>
              </Link>
            </GridItem>
            <GridItem>
              <Link href="https://discord.gg/hNEtMs7FR3" isExternal>
                <Text color="#000000" fontSize="20px">
                  Discord
                </Text>
              </Link>
            </GridItem>

            <Text></Text>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
}
