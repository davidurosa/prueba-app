import {
  AspectRatio,
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "native-base";
import React from "react";
import image from "../assets/miamor.jpg";

const Publishing = ({ navigation }) => {
  return (
    <Center>
      <Container>
      <Heading fontSize="xl" p="4" pb="3">
          Publishing
        </Heading>
        
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={image} h="100%" w="100%" alt="image" />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                MI amor
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                2021 junio 11
              </Text>
            </Stack>
            <Text fontWeight="400">
              Le propuse que fuera mi novia en el 2021
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  6 mins jun
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
      </Container>
    </Center>
  );
};

export default Publishing;
