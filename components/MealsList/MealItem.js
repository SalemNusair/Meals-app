import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    Platform,
} from "react-native";
// we use this hook to navigate as we can't get from the function as it's not added as screen
import { useNavigation } from "@react-navigation/native";
import MealDetails from "../MealDetails";
const MealItem = ({
    id,
    title,
    imageUrl,
    duration,
    complexity,
    affordability,
}) => {
    const navigation = useNavigation();
    const selectMealHandler = () => {
        navigation.navigate("MealDetail", { mealId: id });
    };

    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectMealHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealDetails
                        affordability={affordability}
                        complexity={complexity}
                        duration={duration}
                    />
                </View>
            </Pressable>
        </View>
    );
};
export default MealItem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },

    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
        backgroundColor: "white",
        elevation: 4,
        backgroundColor: "white", // we should add color to make the shadow work in ios
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden",
    },
    image: { width: "100%", height: 200 },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 8,
    },
});
