import { Input, Text, View, Box, VStack, Icon, Link, Button, KeyboardAvoidingView, Divider, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Keyboard, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faLock, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { normalize } from '../function/responsiveText';
import LoginWithGoogle from '../components/LoginWithGoogle';
import Google from '../assets/google.png';
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedLoader from 'react-native-animated-loader';


export default function Login({ navigation }) {
    // const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('');
    const [showConfirmButton, setShowConfirmButton] = useState(false)

    

    const login = async () => {
        const URL = 'http://192.168.8.100:8080/user?'+new URLSearchParams({ emailId: email }).toString();
        // setShowAlert(true)
        // await fetch('http://192.168.8.102:8080/user')
        //     .then((response) => { console.log(response.formData) })
        await fetch(URL)
            .then((response) => response.json())
            .then((json) => checkValidity(json));

    }

    function checkValidity(user) {
        // console.log(user.password)
        if (user.password == password && user.emailId == email) {
            // alert("login done")
            setLoading(true)

            setTimeout(() => {

                navigation.navigate("Vehicles",{
                    User:user,
                })
                setLoading(false)
            }, 3000);

        } else {
            setAlertMsg("Login Falied")
            setShowConfirmButton(true)
            setShowAlert(true)
        }
    }

    function hideAlert() {
        setShowAlert(false)
    };


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
    const [loading, setLoading] = useState(false)


    const [bottomHide, setBottomHide] = useState('flex');

    return (
        <ImageBackground source={require('../assets/login-cover2.png')} resizeMode={'cover'} style={styles.container}>
            {loading && <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,251,1)"
                source={require("../assets/loaders/47393-rocket-launch.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
            </AnimatedLoader>}
            <StatusBar hidden />
            <View style={styles.imageArea}>
                {/* <ImageBackground source={require('../assets/business-deal.png')} resizeMode={'center'} style={styles.image}>
                </ImageBackground> */}
                <Text color={'#e9ebef'} fontWeight={'bold'} fontSize={normalize(20)}>Sign in</Text>
            </View>
            <KeyboardAvoidingView h={{
                base: "400px",
                lg: "auto"
            }} behavior={Platform.OS === "android" ? "padding" : "height"} style={styles.inputArea}>
                <VStack space={'2'} alignItems={'center'} style={styles.inputAreaInner}>

                    <Input onChangeText={(e) => setEmail(e)} value={email} backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faAt} style={styles.icon} />} style={styles.input} size={normalize(13)} variant="rounded" placeholder="Email ID" />
                    <Input onChangeText={(e) => setPassword(e)} value={password} backgroundColor={'white'} type='password' InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faLock} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Password" />
                    <Button onPress={login} marginTop={normalize(8)} borderRadius={15} style={styles.button} size={normalize(32)} variant="solid" backgroundColor={'#0065ff'}>
                        LOGIN
                    </Button>
                    {/* <Box alignItems={'center'} marginBottom={8}> */}
                    <Text color='#e9ebef'>OR</Text>
                    {/* </Box> */}
                    {/* <Button marginTop={normalize(1)} style={styles.button} size={normalize(30)} variant="solid" bg={'#0065ff'}>
                        CONTINUE#e9ebef
                    </Button> */}
                    <Button size={normalize(30)} marginTop={normalize(1)} style={styles.button} borderRadius={10} bg={'#f4f5f7'} variant={"unstyled"} startIcon={<Image style={styles.icon} size={normalize(15)} source={Google} alt={""} />}><Text fontWeight={560} color={'#939dad'}>Login with Google</Text></Button>

                    {/* <LoginWithGoogle/> */}
                </VStack>

            </KeyboardAvoidingView>
            <View style={styles.footer} display={bottomHide}>

                <Text color={'#96a0af'} fontSize={normalize(12)} style={styles.loginText}>New to VehicleManager? <Link onPress={() => alert('login')} isExternal _text={{
                    color: "blue.400"
                }} mt={-0.5} _web={{
                    mb: -2
                }}>
                    <Text fontSize={normalize(12)} onPress={() => navigation.navigate("Register")} color={'#0065ff'}>Register</Text>
                </Link></Text>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title={alertMsg}
                    // message={alertMsg}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={showConfirmButton}
                    confirmText="Try Again"
                    confirmButtonColor="#DD6B55"

                    onConfirmPressed={() => {
                        hideAlert()
                    }}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    imageArea: {
        flex: 2,
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingBottom: 48
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
        alignItems: 'center'
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
        width: '70%',
    },
    googleButton: {
        width: '70%',
    },
    loginText: {
        position: 'absolute',
        bottom: 0
    },
    lottie: {
        flex: 1
    },
});

