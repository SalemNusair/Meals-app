import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "../components/MealItem";
import { MEALS } from "../data/dummy-data";
import { CATEGORIES } from "../data/dummy-data";
const MealOverviewScreen = ({ route, navigation }) => {
    const catId = route.params.categoryId;
    const displayedMeals = MEALS.filter((item) => {
        return item.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(({ id }) => id === catId).title;
        // other way to use the styling of naviagtion
        navigation.setOptions({ title: categoryTitle });
    }, [catId, navigation]);
    const renderMealItem = (itemData) => {
        const item = itemData.item;
        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            complexity: item.complexity,
            affordability: item.affordability,
        };
        return <MealItem {...mealItemProps} />;
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
};
export default MealOverviewScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
