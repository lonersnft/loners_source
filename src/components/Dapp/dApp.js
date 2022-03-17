import {
  Box,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "./dApp.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import dappBg from "../../img/dapp.jpg";
import dappmobileBg from "../../img/dapp_mobile.jpg";
import { Link } from "react-router-dom";
import MintContract from "../../artifacts/contracts/LonerMint.sol/LonerMint.json";
import StakeContract from "../../artifacts/contracts/LonerStakeToken.sol/LonerStakeToken.json";

const MotionBox = motion(Box);

function DApp() {
  const [loggedAccount, setloggedAccount] = useState("");
  const [userRewards, setuserRewards] = useState();
  const [userTokens, setuserTokens] = useState();
  const [userStakedTokens, setuserStakedTokens] = useState();
  const [userTokensToStake, setuserTokensToStake] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isOnGoodChain, setGoodChain] = useState(false);

  // Mobile responsive
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

  useEffect(() => {
    fetchUserRewards();
    fetchUserStakeTokens();
    fetchUserTokens();
    checkChainID();
  }, [loggedAccount]);

  const stakeContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const mintContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  async function requestAccount() {
    const address = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setloggedAccount(address[0]);
  }

  async function checkChainID() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      setGoodChain(chainId === 137);
    }
  }

  async function switchChain() {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            rpcUrls: ["https://rpc-mainnet.matic.network/"],
            chainName: "Matic Mainnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      });
    }
  }

  async function fetchUserStakeTokens() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        stakeContractAddress,
        StakeContract.abi,
        provider
      );
      try {
        const data = await contract.stakebalanceOf(loggedAccount);
        setuserStakedTokens(data.toString() / 10 ** 18);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function fetchUserTokens() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        stakeContractAddress,
        StakeContract.abi,
        provider
      );
      try {
        const data = await contract.balanceOf(loggedAccount);
        setuserTokens(data.toString() / 10 ** 18);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function fetchUserRewards() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        stakeContractAddress,
        StakeContract.abi,
        provider
      );
      try {
        const data = await contract.calcrewards(loggedAccount);
        setuserRewards(data.toString() / 10 ** 18);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function claimRewards() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        stakeContractAddress,
        StakeContract.abi,
        signer
      );
      const transaction = await contract.claimrewards();
      await transaction.wait();
      await fetchUserRewards();
      await fetchUserTokens();
      await fetchUserStakeTokens();
    }
  }

  async function stakeTokens() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        stakeContractAddress,
        StakeContract.abi,
        signer
      );
      const transaction = await contract.stake(
        ethers.utils.parseEther(userTokensToStake.toString())
      );
      await transaction.wait();
      await fetchUserRewards();
      await fetchUserTokens();
      await fetchUserStakeTokens();
    }
  }

  async function unstakeTokens() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        stakeContractAddress,
        StakeContract.abi,
        signer
      );
      const transaction = await contract.unstake(
        ethers.utils.parseEther(userTokensToStake.toString())
      );
      await transaction.wait();
      await fetchUserRewards();
      await fetchUserTokens();
      await fetchUserStakeTokens();
    }
  }

  async function mintLoner() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintContractAddress,
        MintContract.abi,
        signer
      );
      const transaction = await contract.mint({
        value: ethers.utils.parseEther("0.1"),
      });
      await transaction.wait();
      await fetchUserRewards();
      await fetchUserTokens();
      await fetchUserStakeTokens();
    }
  }

  {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          checkChainID();
        }
      });
    }
  }

  return (
    <>
      <Header />
      <Box
        h={isMobile ? "245vh" : "120vh"}
        bgImage={isMobile ? dappmobileBg : dappBg}
        bgRepeat="no-repeat"
        bgSize="100% 100%"
      >
        <br></br>
        {loggedAccount === "" ? (
          <Flex justify="center">
            <MotionBox
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              pl={8}
              pr={8}
              mt="25vh"
            >
              <Button
                bg="transparent"
                border="1px solid"
                borderRadius="full"
                color="white"
                onClick={requestAccount}
              >
                Log in with MetaMask
              </Button>
            </MotionBox>
          </Flex>
        ) : (
          <Box>
            {isOnGoodChain ? (
              <>
                <Flex justify="center">
                  <Text mt="25vh" color="white" align={isMobile && "center"}>
                    Welcome, {loggedAccount}
                  </Text>
                </Flex>
                <br></br>
                <Flex justify="center">
                  <MotionBox
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    pl={8}
                    pr={8}
                  >
                    <Button _hover={{ bg: "grey" }} onClick={mintLoner}>
                      Mint a Loner
                    </Button>
                  </MotionBox>
                </Flex>
                <br></br>
                <Grid
                  templateColumns={
                    isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
                  }
                  gap="60px"
                  mt="4vh"
                  justify="center"
                  mr="5%"
                  ml="5%"
                >
                  <GridItem
                    colSpan={1}
                    h={isMobile ? "40vh" : "50vh"}
                    bg="#694E4E"
                    borderRadius={5}
                  >
                    <Box
                      h="92%"
                      bg="#886F6F"
                      mt="3%"
                      ml="3%"
                      mr="3%"
                      borderRadius={5}
                    >
                      <Flex justify="center">
                        <Text fontSize="50px" mt="2vh" color="white">
                          REWARDS
                        </Text>
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                        <Text fontSize="20px" color="black">
                          Rewards / Minute : {userStakedTokens / 10000} LRT
                          Tokens
                        </Text>
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                        <Text fontSize="20px" color="black">
                          {userRewards} LRT Tokens to claim
                        </Text>
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                        <MotionBox
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          pl={8}
                          pr={8}
                        >
                          <Button
                            _hover={{ bg: "grey" }}
                            onClick={claimRewards}
                          >
                            Claim rewards
                          </Button>
                        </MotionBox>
                      </Flex>
                    </Box>
                  </GridItem>

                  <GridItem
                    colSpan={1}
                    h={isMobile ? "40vh" : "50vh"}
                    bg="#694E4E"
                    borderRadius={5}
                  >
                    <Box
                      h="92%"
                      bg="#886F6F"
                      mt="3%"
                      ml="3%"
                      mr="3%"
                      borderRadius={5}
                    >
                      <Flex justify="center">
                        <Text fontSize="50px" mt="2vh" color="white">
                          INFOS
                        </Text>
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                        <Text fontSize="20px" color="black">
                          Tokens Staked : {userStakedTokens}
                        </Text>
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                        <Text fontSize="20px" color="black">
                          Stake Tokens Balance : {userTokens}
                        </Text>
                      </Flex>
                    </Box>
                  </GridItem>
                  <GridItem
                    colSpan={1}
                    h={isMobile ? "40vh" : "50vh"}
                    bg="#694E4E"
                    borderRadius={5}
                  >
                    <Box
                      h="92%"
                      bg="#886F6F"
                      mt="3%"
                      ml="3%"
                      mr="3%"
                      borderRadius={5}
                    >
                      <Flex justify="center">
                        <Text fontSize="50px" mt="2vh" color="white">
                          STAKING :
                        </Text>
                      </Flex>
                      <Flex justify="center" mt="2vh">
                        <NumberInput
                          onChange={(valueString) =>
                            setuserTokensToStake(valueString)
                          }
                          color="white"
                          defaultValue={0}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                      <br></br>
                      <Flex justify="center">
                        <MotionBox
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          pl={8}
                          pr={8}
                        >
                          <Button
                            size="lg"
                            bg="transparent"
                            border="1px solid"
                            borderRadius="full"
                            color="black"
                            onClick={stakeTokens}
                          >
                            Stake
                          </Button>
                        </MotionBox>
                        <MotionBox
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          pl={8}
                          pr={8}
                        >
                          <Button
                            size="lg"
                            bg="transparent"
                            border="1px solid"
                            borderRadius="full"
                            color="black"
                            onClick={unstakeTokens}
                          >
                            Unstake
                          </Button>
                        </MotionBox>
                      </Flex>
                    </Box>
                  </GridItem>
                </Grid>
              </>
            ) : (
              <>
                <Flex justify="center">
                  <Alert status="error" mt="30vh" w={isMobile ? "90%" : "40%"} borderRadius="5">
                    <AlertIcon />
                    <AlertTitle mr={2}>Wrong blockchain !</AlertTitle>
                    <AlertDescription>
                      Click below to switch to the MATIC blockchain
                    </AlertDescription>
                  </Alert>
                </Flex>
                <Flex justify="center">
                  <MotionBox
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    pl={8}
                    pr={8}
                    mt="5vh"
                  >
                    <Button
                      bg="transparent"
                      border="1px solid"
                      borderRadius="full"
                      color="white"
                      onClick={switchChain}
                    >
                      Switch Network
                    </Button>
                  </MotionBox>
                </Flex>
              </>
            )}
          </Box>
        )}
        {loggedAccount && isOnGoodChain && (
          <>
            <Flex justify="center" mt="3vh">
              <Alert status="warning" w={isMobile ? "95%" :"50%" } borderRadius="5">
                <AlertIcon />
                Staking or Unstaking will automatically claim your current
                rewards.
              </Alert>
            </Flex>
          </>
        )}
        <Flex justify="center" mt="3vh">
          <MotionBox
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            pl={8}
            pr={8}
          >
            <Link to="/">
              <Button
                size="lg"
                border="1px solid"
                borderRadius="full"
                opacity="80%"
              >
                <ArrowBackIcon /> Back to Home
              </Button>
            </Link>
          </MotionBox>
        </Flex>
      </Box>
    </>
  );
}

export default DApp;
