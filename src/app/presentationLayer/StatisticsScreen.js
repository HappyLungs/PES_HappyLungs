import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity} from 'react-native';

import colors from '../config/stylesheet/colors';

const onPress = (option) => {console.log(option)};

const TimeOptionsBtn = (props) => {
    return (
        <TouchableOpacity onPress={onPress.bind(this, props.option)} style={styles.btn}>
            <Text style={styles.btnText}>{props.value}</Text>
        </TouchableOpacity>
    )
}


function renderOptions() {
    return (
        <View style={styles.containerBtn}>
            <TimeOptionsBtn option={'1'} value='Last 24h'/>                
            <TimeOptionsBtn option={'2'} value='Last Week'/>                
            <TimeOptionsBtn option={'3'} value='Last Month'/>                
            <TimeOptionsBtn option={'4'} value='Last Year'/> 
        </View>
    )
}
/*
function renderChart() {
    
    let chartData = [ 526, 520, 470, 440, 250, 240, 170, 150, 120, 110, 80, 40 ]
    let labels = ["NO2", "NO", "O3", "SO2", "CO", "NOX", "PM10", "H2S", "HCT", "PS", "HNCM", "C6H6"]
    const reducer = (accumulator, curr) => accumulator+curr;
    let totalPollution = chartData.reduce(reducer);

    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <VictoryPie
                data={chartData}
                innerRadius={70}
                //labels={chartData}
                labels={labels}
                style={{
                    labels: { fontWeight: 'bold'},
                    parent: {
                        ...styles.shadow
                    }
                }}
                width={350}
                height={350}
        />
        <View style={{position: 'absolute', top: '42%', left: '41%'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>
                {totalPollution}</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>Total</Text>
        </View>
        </View>
    )
}
*/
function StatisticsScreen(props) {

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Text style={styles.title}> Statistics</Text>
            <View style={styles.stroke}/>
            <Text style={styles.subtitle}> Location-based data recorded over time</Text>
            {renderOptions()}
            <Text style={styles.subtitle}> Pollutants to which you have been most exposed</Text>
            <View style={styles.containerBtn}>
                <View style={styles.CircleShape} />
                <View style={styles.CircleShape} />
                <View style={styles.CircleShape} />
            </View>
    </SafeAreaView>        
    );      
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        position: 'absolute',
        flex: 1,     
        flexDirection: "column",
        justifyContent: "flex-start", //main
        alignItems: "flex-start", //secondary
        alignItems: "center"
    },
    btnText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    CircleShape: {
        width: 50,
        height: 50,
        margin: 15,
        borderRadius: 150 / 2,
        backgroundColor: colors.secondary,
    },
    btn: {
        marginStart: 5,
        marginEnd: 5,
        justifyContent: 'center',
        borderRadius: 5,
        borderBottomWidth: 5,
        borderRadius: 5,
        width: 80,
        height: 35,
        borderBottomColor: colors.green2,
        backgroundColor: colors.green1,
    },
    containerBtn: {
        //backgroundColor: colors.green1,
        alignSelf: "center",
        marginTop: 25,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        //padding: 10,
    },
    stroke: {
        backgroundColor: "black",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
        width: "80%",
        height: "0.5%",
    },
    title: { 
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 30,
        paddingTop: 35,
        fontWeight: 'bold',
        color: '#12161b',
    },
    subtitle: { 
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 15,
        paddingTop: 10,
        paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    },
    body: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 10,
        //paddingTop: 10,
        //paddingStart: 25,
        fontWeight: 'bold',
        color: '#12161b',
    }
})

export default StatisticsScreen;