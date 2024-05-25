import * as React from 'react';
import { View, Text, Pressable, Image, ScrollView, StyleSheet }from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[COLORS.blue1, COLORS.blue]}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1}}>
                    <View style={styles.imagesContainer}>
                        {/* <Image
                            source={require("../assets/hero1.jpg")}
                            style={styles.image1}
                        /> */}
                        {/* <Image
                            source={require("../assets/welcome3.png")}
                            style={styles.image2}
                        /> */}
                        {/* <Image
                            source={require("../assets/hero3.jpg")}
                            style={styles.image3}
                        /> */}
                        <Image
                            source={require("../assets/welcome3.png")}
                            style={styles.image4}
                        />
                    </View>

                   
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Let's Get</Text>
                        <Text style={styles.subtitle}>Started</Text>

                        <View style={{ marginVertical: 22 }}>
                            <Text style={styles.description}>
                            Connect instantly by scanning and paying
                            </Text>
                            <Text style={styles.description}>
                            Scan, Enjoy Secure and Instant Payments
                            </Text>
                        </View>

                        <Button
                            title="Join Now"
                            onPress={() => navigation.navigate("Signup")}
                            style={{ marginTop: 22, width: "100%" }}
                        />

                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <Pressable onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.loginText}>Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    imagesContainer: {
        flex: 1,
        height: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // image1: {
    //     height: 100,
    //     width: 100,
    //     borderRadius: 20,
    //     position: "absolute",
    //     top: 0,
    //     transform: [
    //         { translateX: -100 },
    //         { translateY: 50 },
    //         { rotate: "-15deg" }
    //     ]
    // },
    // image2: {
    //     height: 100,
    //     width: 100,
    //     borderRadius: 20,
    //     position: "absolute",
    //     top: 0,
    //     left: 100,
    //     transform: [
    //         { translateX: 80 },
    //         { translateY: 30 },
    //         { rotate: "-5deg" }
    //     ]
    // },
    // image3: {
    //     width: 100,
    //     height: 100,
    //     borderRadius: 20,
    //     position: "absolute",
    //     top: 170,
    //     left: -50,
    //     transform: [
    //         { translateX: 50 },
    //         { translateY: 50 },
    //         { rotate: "15deg" }
    //     ]
    // },
    image4: {
        height: 200,
        width: 200,
        borderRadius: 20,
        position: "absolute",
        top: 0,
        left: 10,
        transform: [
            { translateX: 50 },
            { translateY: 50 },
            // { rotate: "-15deg" }
        ]
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 220, // Adjusted to start content below images
        width: "100%"
    },
    title: {
        fontSize: 50,
        fontWeight: '800',
        color: COLORS.white
    },
    subtitle: {
        fontSize: 46,
        fontWeight: '800',
        color: COLORS.white
    },
    description: {
        fontSize: 16,
        color: COLORS.white,
        marginVertical: 4
    },
    footerContainer: {
        flexDirection: "row",
        marginTop: 12,
        justifyContent: "center"
    },
    footerText: {
        fontSize: 16,
        color: COLORS.white
    },
    loginText: {
        fontSize: 16,
        color: COLORS.white,
        fontWeight: "bold",
        marginLeft: 4
    }
});

export default Welcome;