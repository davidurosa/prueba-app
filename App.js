import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Author from "./components/Author";
import Publishing from "./components/Publishing";
import {
  Box,
  HStack,
  Icon,
  NativeBaseProvider,
  Text,
  VStack,
  Divider,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@native-base/icons";



export default function App() {
  const [datos, setDatos] = useState([]);

  const MyTheme = {
    dark: true,
    colors: {
      primary: "#0891b2",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };

  const Drawer = createDrawerNavigator();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}  safeArea>
        <VStack space="6" my="2" mx="1">
          <Box px="4">
            <Text bold color="gray.700">
              Mail
            </Text>
            <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
              urosaclawred21@gmail.com
            </Text>
          </Box>
          <VStack divider={<Divider />} space="4">
            <VStack space="3">
              {props.state.routeNames.map((name, index) => (
                <Pressable
                  px="5"
                  py="3"
                  key={index}
                  rounded="md"
                  bg={
                    index === props.state.index
                      ? "rgba(6, 182, 212, 0.1)"
                      : "transparent"
                  }
                  onPress={(event) => {
                    props.navigation.navigate(name);
                  }}
                >
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index ? "primary.500" : "gray.500"
                      }
                      size="5"
                      as={<MaterialIcons name="favorite" />}
                    />
                    <Text
                      fontWeight="500"
                      color={
                        index === props.state.index ? "primary.500" : "gray.700"
                      }
                    >
                      {name}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    );
  }

  function MyDrawer() {
    return (
      <Box safeArea flex={1}>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0891b2",
            },
            headerTintColor: "#fff",
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Author" component={Author} />
          <Drawer.Screen name="Publishing" component={Publishing} />
        </Drawer.Navigator>
      </Box>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <NativeBaseProvider>
        <MyDrawer />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
