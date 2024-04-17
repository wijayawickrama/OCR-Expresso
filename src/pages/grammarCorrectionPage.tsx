// Importing necessary React and Chakra UI components
import React, { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Heading,
  Text,
  IconButton,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

// Defining the props for the TextCorrection component
export type AppProps = BoxProps & {
  children: React.ReactNode;
};

// TextCorrection component for handling and displaying text corrections
export function TextCorrection({ className, children, ...rest }: AppProps) {
  // State for storing the input and corrected text
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");

  // Function to handle text conversion/correction
  const handleConvert = async () => {
    try {
      // Capturing the current input text
      const text = inputText;

      // Making a POST request to the conversion endpoint
      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      // Handling the response and setting the corrected text
      if (response.ok) {
        const data = await response.json();
        setCorrectedText(data.corrected_text);
      } else {
        // Handling request errors
        console.error("Failed to convert text:", response.statusText);
      }
    } catch (error) {
      // Handling unexpected errors
      console.error("Error converting text:", error);
    }
  };

  // Rendering the component UI
  return (
    <Box className={className}>
      {/* Navigation back button */}
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
      {/* Main content container */}
      <Box
        as="section"
        h="100vh"
        bg="#1a202c"
        color="white"
        py="7.5rem"
        height="fit-content"
      >
        {/* Responsive box for content alignment */}
        <Box maxW={{ base: "xl", md: "5xl" }} mx="auto" h="100%" px={{ base: "6", md: "8" }}>
          {/* Heading and subheading */}
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

          {/* Flex container for text areas and conversion button */}
          <Flex direction="column" gap="4" w="100%" alignItems="center" justifyContent="center">
            {/* Input text area */}
            <Box>
              <Text mb="8px">Paste Your Text Here: </Text>
              <Box
                bg="#858d9d"
                p="6"
                w="500px"
                h="500px"
                borderRadius="md"
              >
                <Textarea
                  placeholder=""
                  size="sm"
                  h="100%"
                  value={inputText}
                  style={{ fontSize: "20px" }}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </Box>
            </Box>
            {/* Button to trigger text conversion */}
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="solid"
              mt="8"
              onClick={handleConvert}
            >
              Convert
            </Button>
            {/* Display area for corrected text */}
            <Box>
              <Text mb="8px">Corrected Text: </Text>
              <Box
                bg="#858d9d"
                p="6"
                w="500px"
                h="500px"
                borderRadius="md"
              >
                <Textarea
                  value={correctedText}
                  placeholder=""
                  size="sm"
                  h="100%"
                  style={{ fontSize: "20px", color:"white" }}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
