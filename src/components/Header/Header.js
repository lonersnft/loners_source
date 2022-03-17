import {
  Button,
  MenuList,
  MenuItem,
  Box,
  SimpleGrid,
  Image,
  Flex,
  Menu,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import logo from "../../img/logo.jpg";
<script src="https://code.iconify.design/2/2.1.2/iconify.min.js"></script>;
function Header() {
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
    <>
      {isMobile ? (
        <Flex justify="space-around" align="center" bg="#C4C4C4" h="10vh">
          <Box>
            <Image
              src={logo}
              alt="loners logo"
              h="60px"
              mt="2%"
              href="https://discord.gg/hNEtMs7FR3"
            />
          </Box>
          <Box>
            <Menu w="50%">
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Social Media
              </MenuButton>
              <MenuList>
                <Link href="https://discord.gg/hNEtMs7FR3" isExternal>
                  <MenuItem minH="48px">
                    <Flex>
                      <Box mr="10%">
                        <FaDiscord size="35px" mr="2%" />
                      </Box>
                      <Text fontSize="18px" mt="2%">
                        Discord
                      </Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <Link href="https://twitter.com/loners_nft" isExternal>
                  <MenuItem minH="40px">
                    <Flex>
                      <Box mr="10%">
                        <FaTwitter size="35px" mr="2%" />
                      </Box>
                      <Text fontSize="18px" mt="2%">
                        Twitter
                      </Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <Link href="https://github.com/lonersnft" isExternal>
                  <MenuItem>
                    <Flex>
                      <Box mr="10%">
                        <FaGithub size="35px" mr="2%" />
                      </Box>
                      <Text fontSize="18px" mt="2%">
                        Github
                      </Text>
                    </Flex>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      ) : (
        <Flex justify="space-around" align="center" bg="#C4C4C4" h="10vh">
          <Box>
            <Image
              src={logo}
              alt="loners logo"
              h="60px"
              mt="2%"
              href="https://discord.gg/hNEtMs7FR3"
            />
          </Box>

          <SimpleGrid columns={3} w="25%" mt="1.5%" ml="3%" mb="1.5%">
            <Box>
              <Link href="https://discord.gg/hNEtMs7FR3" isExternal>
                <FaDiscord size="35px" />
              </Link>
            </Box>
            <Box>
              <Link href="https://github.com/lonersnft" isExternal>
                <FaGithub size="35px" />
              </Link>
            </Box>
            <Box>
              <Link href="https://twitter.com/loners_nft" isExternal>
                <FaTwitter size="35px" />
              </Link>
            </Box>
          </SimpleGrid>
          <Box>
            <Image
              src={logo}
              display={isMobile && "none"}
              alt="loners logo"
              h="60px"
              mt="2%"
            />
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Header;
