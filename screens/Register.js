import { Input, Text, View, Box, VStack, Icon, Link, Button, KeyboardAvoidingView, FormControl } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert, ImageBackground, Keyboard, StatusBar, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faLock, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { normalize } from '../function/responsiveText';
import axios from 'axios';
import AnimatedLoader from 'react-native-animated-loader';



export default function Register({ navigation }) {


    const baseUrl = "http://192.168.8.100:8080/"

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setBottomHide('none'); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setBottomHide('flex'); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const [bottomHide, setBottomHide] = useState('flex');

    const [email, setEmail] = useState('');
    const [fullName, setFullname] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false)

    const registerUser = async () => {
        setLoading(true)
        fetch(baseUrl + 'user', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                fullName: fullName,
                mobile: mobile,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                setTimeout(() => {
                    setLoading(false)
                    navigation.navigate("Login")
                }, 3000);


            })
            .catch((err) => { Alert.alert("Error occured !") })



    }


    return (
        <View style={styles.container}>
           {loading &&  <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,251,1)"
                source={require("../assets/loaders/48643-launch.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
            </AnimatedLoader>}
            <StatusBar hidden />
            <View style={styles.imageArea}>
                <ImageBackground source={require('../assets/business-deal.png')} resizeMode={'center'} style={styles.image}>
                </ImageBackground>
            </View>
            <KeyboardAvoidingView h={{
                base: "400px",
                lg: "auto"
            }} behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.inputArea}>
                <VStack space={'2'} style={styles.inputAreaInner}>
                    <Text color={'#223555'} fontWeight={'bold'} fontSize={normalize(20)}>Sign up</Text>
                    <Input InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faAt} style={styles.icon} />} style={styles.input} size={normalize(13)} variant="rounded" value={email} onChangeText={(e) => setEmail(e)} placeholder="Email ID" />
                    <Input InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faUserTie} style={styles.icon} />} size={normalize(13)} variant="rounded" value={fullName} onChangeText={(e) => setFullname(e)} placeholder="Full name" />
                    <Input InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faPhone} style={styles.icon} />} size={normalize(13)} variant="rounded" value={mobile} onChangeText={(e) => setMobile(e)} placeholder="Mobile" />
                    <Input type='password' InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faLock} style={styles.icon} />} size={normalize(13)} variant="rounded" value={password} onChangeText={(e) => setPassword(e)} placeholder="Password" />
                </VStack>
                <Text color={'#71747a'} display={bottomHide} fontSize={normalize(10)}>By signing up, you're agree to the <Link href="https://nativebase.io" ><Text fontSize={normalize(10)} color="blue.400">
                    Terms & Condition

                </Text>
                </Link>  and <Link href="https://nativebase.io">
                        <Text fontSize={normalize(10)} color="blue.400">
                            Privacy Policy

                        </Text>

                    </Link></Text>
            </KeyboardAvoidingView>
            <View style={styles.footer} display={bottomHide}>
                <VStack alignItems={'center'} style={styles.footerInner}>
                    <Button isLoading={loading} isLoadingText="Submitting" style={styles.button} size="md" variant="solid" bg={'#0065ff'} onPress={registerUser}>
                        CONTINUE
                    </Button>
                    <Text color={'#96a0af'} fontSize={normalize(12)} style={styles.loginText}>Joined us before? <Link onPress={() => alert('login')} isExternal _text={{
                        color: "blue.400"
                    }} mt={-0.5} _web={{
                        mb: -2
                    }}>
                        <Text onPress={() => navigation.navigate("Login")} fontSize={normalize(12)} color={'#0065ff'}>Login</Text>
                    </Link></Text>
                </VStack>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    imageArea: {
        flex: 2.8,
    },
    inputArea: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAreaInner: {
        flex: 1,
        width: '70%',
    },
    footer: {
        flex: 1.2,
    },
    image: {
        flex: 1
    },
    icon: {
        marginRight: 10,
        marginLeft: 20,
        borderRadius: 20
    },
    footerInner: {
        flex: 1,
        paddingTop: 15
    },
    button: {
        width: '70%'
    },
    loginText: {
        position: 'absolute',
        bottom: 0
    },
    lottie: {
        flex:1
    },

});

