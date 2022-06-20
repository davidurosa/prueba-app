import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Heading,
  Avatar,
  Spacer,
  Container,
  useDisclose,
  Fab,
  Icon,
  Modal,
  FormControl,
  Input,
  Button,
  Menu,
  Pressable,
  HamburgerIcon,
  Divider,
  Spinner,
} from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import image from "../assets/miamor.jpg";
import axios from "axios";
const API = "https://bibliotecadavid.herokuapp.com/api/authors";

import { MaterialIcons } from "@native-base/icons";
import { EdgeInsetsPropType } from "react-native";

const Author = ({ navigation }) => {
  const [AuthorData, setAuthorData] = useState([]);
  const [authorSelect, setAuthorSelect] = useState({
    id: "",
    name: "",
    last_name: "",
  });
  useEffect(() => {
    getAllAuthors();
   
  }, []);

  const getAllAuthors = async () => {
    const response = await axios.get(`${API}`);
    setAuthorData(response.data);
    setLoading(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (name, value) => {
    setAuthorSelect({ ...authorSelect, [name]: value });
  };
  const SelectAuthor = (element, caso) => {
    setAuthorSelect(element);
    caso === "editar" ? setModalEdit(true) : setModalDelete(true);
  };

  const deleteAuthor = async (id) => {
    await axios.delete(`${API}/${id}`);
    setLoading(true);
    getAllAuthors();
  };

  const clear = () => {
    authorSelect.id = "";
    authorSelect.name = "";
    authorSelect.last_name = "";
  };
  /* Crear Autores */
  const store = async () => {
    if (authorSelect.name === "") {
      alert("introduce un nombre");
    } else {
      await axios.post(`${API}`, {
        name: authorSelect.name,
        last_name: authorSelect.last_name,
      });
      setLoading(true);
      getAllAuthors();
      clear();
      setShowModal(false);
    }
  };

  const edit = (element) => {
    authorSelect.id = element.id;
    authorSelect.name = element.name;
    authorSelect.last_name = element.last_name;
    setEditModal(true);
  };

  const update = async () => {
    if (authorSelect.name === "") {
      alert("introduce un nombre");
    } else {
      await axios.put(`${API}/${authorSelect.id}`, {
        name: authorSelect.name,
        last_name: authorSelect.last_name,
      });
      setLoading(true);

      getAllAuthors();
      setEditModal(false);
    }
  };

  if (loading) {
    return (
      <Center>
        <HStack space={8} justifyContent="center" h="50%" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      </Center>
    );
  }

  return (
    <Center>
      <Box>
        <Heading fontSize="xl" p="4" pb="3">
          Authors
        </Heading>
        <FlatList
          data={AuthorData}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar size="48px" source={image} />
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name} {item.last_name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {"escritor reconocido"}
                  </Text>
                </VStack>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Box h="80%" w="100%" alignItems="flex-start">
                  <Menu
                    w="100%"
                    trigger={(item) => {
                      return (
                        <Pressable
                        
                          accessibilityLabel="More options menu"
                          {...item}
                        >
                          <HamburgerIcon size="lg" />
                        </Pressable>
                      );
                    }}
                  >
                    <Menu.Item onPress={() => deleteAuthor(item.id)}>
                      delete
                    </Menu.Item>
                    <Menu.Item onPress={() => edit(item)}>Edit</Menu.Item>
                  </Menu>
                </Box>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>

      <Fab
        renderInPortal={false}
        placement="bottom-right"
        shadow={4}
        onPress={() => setShowModal(true)}
        size="lg"
        icon={<Icon color="white" as={MaterialIcons} name="add" />}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Authors</Modal.Header>

          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input onChangeText={(value) => handleChange("name", value)} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                onChangeText={(value) => handleChange("last_name", value)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => store()}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* editar Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Authors</Modal.Header>

          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                onChangeText={(value) => handleChange("name", value)}
                value={authorSelect.name}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                onChangeText={(value) => handleChange("last_name", value)}
                value={authorSelect.last_name}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setEditModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => update()}>update</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default Author;
