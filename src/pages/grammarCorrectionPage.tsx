import {
  Box,
  BoxProps,
  Button,
  Circle,
  Heading,
  Img,
  LightMode,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
  VisuallyHidden,
  IconButton,
  AspectRatio,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export type AppProps = BoxProps & {
  children: ReactNode;
};

export function Page2({ className, children, ...rest }: AppProps) {
  return (
    <Box className={className}>
      <IconButton
        as={Link}
        to="/"
        position="absolute"
        top="1rem"
        left="1rem"
        colorScheme="blue"
        aria-label="Call Segun"
        size="sm"
        icon={<ArrowBackIcon />}
      />
      <Box as="section" h="100vh" bg="#1a202c" color="white" py="7.5rem" height="fit-content">
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          h="100%"
          px={{ base: "6", md: "8" }}
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={6}
          >
            <Box>
              <Box textAlign="center">
                <Heading
                  as="h1"
                  size="3xl"
                  fontWeight="extrabold"
                  maxW="48rem"
                  mx="auto"
                  lineHeight="1.2"
                  letterSpacing="tight"
                >
                  O C R Expresso
                </Heading>
                <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
                Grammar Correction of Handwritten Documents
                </Text>
              </Box>

              <Stack
                justify="center"
                direction={{ base: "column", md: "row" }}
                mt="10"
                mb="30px"
                spacing="4"
              ></Stack>
              <Stack alignItems="center"></Stack>
            </Box>
          </Stack>
          <Flex
            direction="column"
            gap="4"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Stack>
              <Text mb="8px">Paste Your Text Here: </Text>
              <Box
                key="{member.name}"
                bg="#858d9d"
                p="6"
                w="500px"
                h="500px"
                boxShadow={mode("sm", "sm-dark")}
                borderRadius="md"
              >
                <Textarea placeholder="" size="sm" h="100%" />
              </Box>
            </Stack>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="solid"
              mt="8"
            >
              Convert
            </Button>
            <Stack>
              <Text mb="8px">Corrected Text: </Text>
              <Box
                key="{member.name}"
                bg="#858d9d"
                p="6"
                w="500px"
                h="500px"
                boxShadow={mode("sm", "sm-dark")}
                borderRadius="md"
              >
                <Textarea value="" placeholder="" size="sm" h="100%" disabled />
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
