import {
  Box,
  BoxProps,
  Button,
  Circle,
  Heading,
  Image,
  LightMode,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
  VisuallyHidden,
  AspectRatio,
  Skeleton,
  Flex,
  Avatar,
  HStack,
  Textarea,
  IconButton,
  Input,
  Icon,
} from "@chakra-ui/react";
import * as React from "react";
import { FaPlay } from "react-icons/fa";
import { ReactNode, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiFile, FiX } from "react-icons/fi";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@chakra-ui/icons";

export type AppProps = BoxProps & {
  children: ReactNode;
};

export function ImageUpload({ className, children, ...rest }: AppProps) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  //
  const [extractedText, setExtractedText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  //
  const handleUpload = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
    try {
      const imgString = 'Temp Img String';
     // console.log("Text From Text box 1:", extractedText);

      const response = await fetch("http://localhost:5000/img_string", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: imgString }),
      });

      console.log("Request:", response);

      if (response.ok) {
        const data = await response.json();
        setExtractedText(data.extract_txt);
      } else {
        console.error("Failed to convert text:", response.statusText);
      }
    } catch (error) {
      console.error("Error converting text:", error);
    }
  };

  const handleCorrect = async () => {
    try {
      const text = extractedText;

      console.log("Text to send:", text);

      const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      //console.log("Request:", response);

      if (response.ok) {
        const data = await response.json();
        setCorrectedText(data.corrected_text);
      } else {
        console.error("Failed to convert text:", response.statusText);
      }
    } catch (error) {
      console.error("Error converting text:", error);
    }
  };

 
  const handleRemoveImage = () => {
    setUploadedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
                Grammar Correction of handwritten Documents
                </Text>
              </Box>

              <Stack
                justify="center"
                direction={{ base: "column", md: "row" }}
                mt="10"
                mb="30px"
                spacing="4"
              >
                <LightMode>
                <Button
                    leftIcon={<Icon as={FiFile} />}
                    size="lg"
                    colorScheme="blue"
                    px="8"
                    fontWeight="bold"
                    fontSize="md"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </LightMode>
              </Stack>
              <Stack alignItems="center">
              {uploadedImage && (
                  <Stack w="full" spacing={4} alignItems="center">
                    <Text>{URL.createObjectURL(uploadedImage)}</Text>
                    <AspectRatio w="100%">
                      <Image
                        src={URL.createObjectURL(uploadedImage)}
                        objectPosition="top"
                        objectFit="cover"
                        fallback={<Skeleton />}
                        alt="uploaded picture"
                        borderRadius="xl"
                      />
                    </AspectRatio>
                    <IconButton
                      mx="auto"
                      colorScheme="red"
                      aria-label=""
                      onClick={handleRemoveImage}
                      size="xs"
                      icon={<CloseIcon />}
                    />
                  </Stack>
                )}
              </Stack>
              <Input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                name="uploadedImage"
                accept="image/*"
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    console.log(event.target.files[0]);
                    setUploadedImage(event.target.files[0]);
                  }
                }}
              />
            </Box>
          </Stack>
          <Flex
            direction="row"
            gap="4"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Stack>
              <Text mb="8px">Extracted Text: </Text>
              <Box
                bg="#858d9d"
                p="6"
                w="500px"
                h="500px"
                boxShadow={mode("sm", "sm-dark")}
                borderRadius="md"
              >
                <Textarea value={extractedText}
                  placeholder="" 
                  size="sm" 
                  h="100%" 
                  style={{ fontSize: "20px" }}
                  onChange={(e) => setExtractedText(e.target.value)}
                 />
              </Box>
            </Stack>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="solid"
              mt="8"
              px={20}
              onClick={handleCorrect}
            >
              Correct
            </Button>
            <Stack>
              <Text mb="8px">Corrected Text: </Text>
              <Box
                bg="#858d9d"
                p="6"
                w="500px"
                h="500px"
                boxShadow={mode("sm", "sm-dark")}
                borderRadius="md"
              >
                <Textarea  value={correctedText} 
                           onChange={(e) => setCorrectedText(e.target.value)} 
                           placeholder="" 
                           size="sm" 
                           h="100%" 
                           style={{ fontSize: "20px" }}
                           disabled />
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
