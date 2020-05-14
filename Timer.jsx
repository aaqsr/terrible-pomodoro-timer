import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            utime: 8,
        }
    }

    render() {
        return (
            <View>
            <Text style={styles.timerContainer}>
            {timeConvert(this.state.utime)}
            </Text>
            </View>
        )
    }

    timerTick = () => {
        this.setState( (prevState) => {
            return ({
                utime: prevState.utime - 1
            });
        });
        console.log("timer tick!");
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timerTick,1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    shouldComponentUpdate() {
        if (this.state.utime <= 0) {
            clearInterval(this.intervalId);
            return false;
        }
        return true;
    }
}

function timeConvert(num) {
    let minutes = Math.floor(num / 60);
    let seconds = num % 60;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return (minutes + ":" + seconds);
}


const styles = StyleSheet.create({
    timerContainer: {
        fontSize: 60,
        paddingTop: Constants.statusBarHeight * 2.5,
        alignSelf: "center",
    }
})
