import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity} from 'react-native';

import colors from '../config/stylesheet/colors';

import { Rating } from 'react-native-ratings';
import { ImageSlider } from "react-native-image-slider-banner";
import Icon from 'react-native-vector-icons/Ionicons'

const handleSeeOnMap = () => console.log("See On Map clicked");
const handleShare = () => console.log("Share clicked");
const handleSeeStatistics = () => console.log("See Statistics clicked");
const handleBookmark = () => console.log("Bookmark clicked");

function PinDefaultScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);

    function renderImageCarousel() {
        return (
            <ImageSlider 
                data={[
                    {img: 'https://fisica.upc.edu/ca/graus/centres-i-estudis/imatges-escoles/fib.jpeg/@@images/image.jpeg'},
                    {img: 'https://pbs.twimg.com/media/Eh3E26xXYAITese.jpg'},
                ]}
                backgroundColor={colors.green1}
                showHeader
                showIndicator
                onItemChanged={(item) => console.log("item", item)}
                caroselImageStyle={{height: 250}}
                inActiveIndicatorStyle={{backgroundColor:colors.lightgrey}}
                activeIndicatorStyle={{backgroundColor:colors.white}}
                indicatorContainerStyle={{top: 15}}
                >
            </ImageSlider>
        )
    }    

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <View style={{height: 250, marginTop: 10}}>
                    {renderImageCarousel()}
                </View>    
                <View style={[styles.stroke, styles.shadow]}/>
                <View style={styles.containerTop}>
                    <Text style={styles.title}> Pin Name</Text>
                    <TouchableOpacity style={{marginStart:175}} onPress={handleBookmark}>
                        <Icon name="bookmark-outline" style={{alignSelf:'center'}} color={colors.secondary} size={30}/>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.body, {alignSelf:'flex-start', marginStart: 30}]}> Pin Description</Text>
                <View style={styles.containerTop}>
                    <Icon name="ios-location-sharp" style={{alignSelf:'center'}} color={colors.secondary} size={30}/>
                    <Text style={styles.body}> Pin Ubication</Text>
                    <TouchableOpacity style={styles.containerImage} onPress={handleSeeOnMap}>
                        <Text style={styles.greenhighlight}> See On Map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTop}>
                    <Icon name="md-calendar" style={{alignSelf:'center'}} color={colors.secondary} size={25}/>
                    <Text style={styles.body}> dd/mm/yyyy</Text>
                </View>
                <View style={styles.containerTop}>
                    <Rating imageSize={20} fractions={0}/>
                </View>
                <View style={styles.containerTop}>
                    <TouchableOpacity style={{marginStart:15}} onPress={handleShare}>
                        <Icon name="share-social" style={{alignSelf:'center'}} color={colors.secondary} size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginStart:180, flexDirection: 'column'}} onPress={handleSeeStatistics}>
                        <Icon name="bar-chart" style={{alignSelf:'center'}} color={colors.green1} size={35}/>
                        <Text style={styles.greenhighlight}> See Statistics</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </SafeAreaView>        
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "flex-start",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        alignItems: "flex-start"
    },
    container: {
        width: "100%",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        position: 'absolute',
        flex: 1,     
        flexDirection: "column",
        justifyContent: "flex-start", //main
        alignItems: "flex-start", //secondary
        alignItems: "center",
    },
    containerBtn: {
        backgroundColor: colors.green1,
        alignSelf: "flex-start",
        marginTop: 25,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        //padding: 10,
    },
    containerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        padding: 10,
    },
    containerTop: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    containerEditBtn: {
        flexDirection: 'row',
        alignSelf: "center",
        justifyContent: "flex-start",
        width: 90,
        marginLeft: 75,
        borderRadius: 7,
        padding: 5,
        backgroundColor: colors.green1,
    },
    pinImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    image: {
        alignSelf: "center",
        justifyContent: "flex-start",
        padding: 10,
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    stroke: {
        backgroundColor: colors.secondary,
        alignSelf: "center",
        marginBottom: 10,
        width: "100%",
        height: "0.5%",
    },
    title: { 
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingTop: 10,
        marginStart: 20,
        fontWeight: 'bold',
        color: '#12161b',
    },
    body: {
        textAlignVertical: 'center',
        alignSelf: 'center',
        justifyContent: "center",
        fontSize: 15,
        marginStart: 10,
        color: '#12161b',
    },
    greenhighlight: { 
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.green1,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default PinDefaultScreen;