import { useContext, useLayoutEffect } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Button,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/mealDetail/SubTitle";
import List from "../components/mealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favoritesContext";
const MealDetailScreen = ({ route, navigation }) => {
    const favoriteMealsContext = useContext(FavoritesContext);
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);
    const mealIsFavorite = favoriteMealsContext.ids.includes(mealId);
    const changeFavoriteStatusHandler = () => {
        if (mealIsFavorite) {
            favoriteMealsContext.removeFavorite(mealId);
        } else {
            favoriteMealsContext.addFavorite(mealId);
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={mealIsFavorite ? "star" : "star-outline"}
                    color="white"
                    onPress={changeFavoriteStatusHandler}
                />
            ),
        });
    }, [navigation, changeFavoriteStatusHandler]);

    return (
        <ScrollView style={styles.root}>
            <Image
                style={styles.image}
                source={{ uri: selectedMeal.imageUrl }}
            />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                textStyle={styles.detailText}
                affordability={selectedMeal.affordability}
                complexity={selectedMeal.complexity}
                duration={selectedMeal.duration}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <SubTitle>Ingredians</SubTitle>
                    <List data={selectedMeal.ingredients} />
                    <SubTitle>Steps</SubTitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
};
export default MealDetailScreen;
const styles = StyleSheet.create({
    root: {
        marginBottom: 32,
    },
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listOuterContainer: {
        alignItems: "center",
    },
    listContainer: {
        width: "80%",
    },
});
