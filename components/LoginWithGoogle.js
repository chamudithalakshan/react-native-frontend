import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Box, Button, Icon, Image } from 'native-base'
import { normalize } from '../function/responsiveText'
import Google from '../assets/google.png';


export default function LoginWithGoogle() {


    return (

        <Box width={'49%'} alignItems="center">
            <Button borderRadius={10} bg={'#c1cfe3'} variant={"unstyled"} style={styles.button} startIcon={<Image style={styles.icon} size={normalize(15)} source={Google} alt={""}/>}><Text fontWeight={800} color={'#939dad'}>Login with Google</Text></Button>
            
        </Box>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
    
    },
    icon: {
        marginRight: '20%',
    }
})