import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealOverviewScreen from "./screens/MealOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavouritesScreen from "./screens/FavoritesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IconButton from "./components/IconButton";
import { Ionicons } from "@expo/vector-icons";
// import FavoritesContextProvider from "./store/context/favoritesContext";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

export default function App() {
    const Drawer = createDrawerNavigator();
    const Stack = createNativeStackNavigator();
    const DrawerNavigator = () => {
        return (
            <Drawer.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: "#351401" },
                    headerTintColor: "white",
                    sceneContainerStyle: { backgroundColor: "#3f2f25" },
                    drawerContentStyle: { backgroundColor: "#351401" },
                    drawerInactiveTintColor: "white",
                    drawerActiveTintColor: "#351401",
                    drawerActiveBackgroundColor: "#E9A982",
                }}
            >
                <Drawer.Screen
                    name="Categories"
                    component={CategoriesScreen}
                    options={{
                        title: "All Categories",
                        drawerIcon: ({ size, color }) => (
                            <Ionicons color={color} size={size} name={"list"} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Favorites"
                    component={FavouritesScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons color={color} size={size} name="star" />
                        ),
                    }}
                />
            </Drawer.Navigator>
        );
    };
    return (
        <>
            <StatusBar style="light" />
            {/* <FavoritesContextProvider> */}
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: "#351401" },
                            headerTintColor: "white",
                            contentStyle: { backgroundColor: "#3f2f25" },
                        }}
                    >
                        <Stack.Screen
                            name="Drawer"
                            component={DrawerNavigator}
                            options={{
                                headerShown: false, // this is to hide the navigation header from this screen
                            }}
                        />
                        <Stack.Screen
                            name="MealOverview"
                            component={MealOverviewScreen}
                            options={{ title: "Meal Overview" }}
                        />
                        <Stack.Screen
                            name="MealDetail"
                            component={MealDetailScreen}
                            options={{ title: "About The Meal" }}
                            // options={{
                            //     headerRight: () => {
                            //         return <Button title="Tap me!" />;
                            //     },
                            // }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
            {/* </FavoritesContextProvider> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
