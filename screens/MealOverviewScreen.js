import { useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import { CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
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

    return <MealsList items={displayedMeals} />;
};
export default MealOverviewScreen;
