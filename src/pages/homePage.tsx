import {
  Box,
  BoxProps,
  Button,
  Heading,
  Text,
  LightMode,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type AppProps = BoxProps & {
  children: ReactNode;
};

/**
 * Home component represents the landing page of the application.
 * It displays the title, description, and buttons to navigate to different pages.
 * @param {AppProps} props - Props for the Home component.
 * @returns {JSX.Element} - JSX element representing the Home component.
 */
export function Home({ className, children, ...rest }: AppProps) {
  return (
    <Box className={className}>
      {/* Main section */}
      <Box as="section" h="100vh" bg="gray.800" color="white" py="7.5rem">
        {/* Container for content */}
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          px={{ base: "6", md: "8" }}
        >
          <Box>
            {/* Title and description */}
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
                Grammar Correction of handwritten Documents
              </Text>
            </Box>

            {/* Button group for navigation */}
            <Stack
              justify="center"
              direction={{ base: "column", md: "row" }}
              mt="10"
              mb="20"
              spacing="4"
            >
              {/* Button to navigate to Image Upload page */}
              <LightMode>
                <Button
                  as={Link}
                  to="/page1"
                  size="lg"
                  colorScheme="blue"
                  px="8"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Image Upload
                </Button>
                {/* Button to navigate to Text Correction page */}
                <Button
                  as={Link}
                  to="/page2"
                  size="lg"
                  colorScheme="blue"
                  px="8"
                  fontWeight="bold"
                  fontSize="md"
                >
                  Text Correction
                </Button>
              </LightMode>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
