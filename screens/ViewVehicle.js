import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Actionsheet, Button, Box, FlatList, HStack, Image, Input, ScrollView, Text, useDisclose, VStack } from 'native-base';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { normalize } from '../function/responsiveText';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

import Swiper from 'react-native-swiper'
import { useIsFocused } from '@react-navigation/native';
import AnimatedLoader from 'react-native-animated-loader';


export default function ViewVehicle({user}) {


    const [data, setData] = useState([])

    const [chassi, setChassi] = useState('');

    const [vehicles, setVehicles] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('');
    const [showConfirmButton, setShowConfirmButton] = useState(false)
    const [loading, setLoading] = useState(false)

    function hideAlert() {
        setShowAlert(false)
    };

    function excuteDelete() {
        fetch('http://192.168.8.100:8080/user/vehicles', {
            method: 'DELETE',
            body: JSON.stringify({
                email: user.User.emailId,
                chassiNo: chassi,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        loadData
    }

    const loadData = () => {
        setLoading(true)

        const URL = 'http://192.168.8.100:8080/user/vehicles?' + new URLSearchParams({ emailId: user.User.emailId }).toString();
        fetch(URL)
            .then((response) => response.json())
            .then((response) => setVehicles(response))
            .then(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 3000);

            })

    }

    function deleteVehicle(chassi) {

        setChassi(chassi);
        setShowAlert(true)

    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadData()
        }

    }, [isFocused])
    const LeftContent = props => <Avatar.Icon {...props} icon={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faPhone} />} />


    renderItem = ({ item }) => {
        let images = [];
        if (item.images) {

            // console.log(item.images)
            images = item.images.map(image => {
                // console.log(item.images);
                // console.log(path) 
                return <Card.Cover key={image.path} source={{ uri: 'http://192.168.8.100:8080/' + image.path.slice(7) }} />

            })
        }

        return (
            <Card height={normalize(300)}>
                <Card.Title title={item.ownerName} subtitle={item.ownerAdrress} left={LeftContent} />
                <Card.Content>
                    <Paragraph>Contact - {item.ownerContact}</Paragraph>
                    <Paragraph>Registration No - {item.vehicleRegistrationNumber}</Paragraph>
                    <Paragraph>Chassi No - {item.vehicleChassiNumber}</Paragraph>
                </Card.Content>
                <Swiper height={normalize(400)} style={styles.wrapper} showsButtons={true}>

                    {/* <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
                                <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
                                <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} /> */}
                    {images}
                </Swiper>
                <Card.Actions>
                    <Button variant='solid' borderRadius={15} colorScheme="secondary" onPress={() => deleteVehicle(item.vehicleChassiNumber)} >Delete</Button>
                    {/* <Button>Ok</Button> */}
                </Card.Actions>

            </Card>
        )
    }

    return (
        <SafeAreaView  >
            {loading &&  <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../assets/loaders/98304-bouncing-ball-loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
            </AnimatedLoader>}
            {/* <ScrollView> */}
            <FlatList
                data={vehicles}
                renderItem={renderItem}

            //     <Card height={normalize(300)}>
            //         <Card.Title title={item.ownerName} subtitle={item.ownerAdrress} left={LeftContent} />
            //         <Card.Content>
            //             <Paragraph>Contact - {item.ownerContact}</Paragraph>
            //             <Paragraph>Registration No - {item.vehicleRegistrationNumber}</Paragraph>
            //             <Paragraph>Chassi No - {item.vehicleChassiNumber}</Paragraph>
            //         </Card.Content>
            //         <Swiper height={normalize(400)} style={styles.wrapper} showsButtons={true}>

            //             <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
            //             <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
            //             <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
            //         </Swiper>
            //         <Card.Actions>
            //             <Button >Cancel</Button>
            //             <Button>Ok</Button>
            //         </Card.Actions>

            //     </Card>
            // }
            />

            {/* </ScrollView> */}
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={"Are you sure you want to delete ?"}
                // message={alertMsg}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showConfirmButton={true}
                showCancelButton={true}
                confirmText="Yes"
                cancelText='No'
                confirmButtonColor="#2ecc71"
                cancelButtonColor="#c0392b"

                onCancelPressed={() => {
                    hideAlert()
                }}
                onConfirmPressed={() => {
                    excuteDelete()
                    hideAlert()
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        wrapper: {
            height: '30%'
        },
        slide1: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9DD6EB'
        },
        slide2: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#97CAE5'
        },
        slide3: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#92BBD9'
        },
        text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold'
        }
    }
})