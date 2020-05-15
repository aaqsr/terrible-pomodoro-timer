import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            utime: 6,
            // utime: 20 * 60,
            timerPlay: true,
            breakModeNext: true,
        }
    }

    render() {
        return (
            <View>
            <View style={styles.timerContainer}>
            <Text style={styles.timerTextContainer}>
            {timeConvert(this.state.utime)}
            </Text>
            </View>
            <View style={styles.buttonContainer}>
            <View style={styles.buttonSpacing}>
            <Button onPress={this.playHandler} title="Play" />
            </View>
            <View style={styles.buttonSpacing}>
            <Button onPress={this.pauseHandler} title="Pause" />
            </View>
            </View>
            </View>
        )
    }

    timerTick = () => {
        this.setState( (prevState) => {
            return ({
                utime: prevState.utime - 1,
                timerPlay: prevState.timerPlay,
                breakModeNext: prevState.breakModeNext,
            });
        });
        console.log("timer tick!");
    }

    playHandler = () => {
        if (this.state.timerPlay === false) {
            this.setState( (prevState) => {
                return ({
                    utime: prevState.utime,
                    timerPlay: true,
                    breakModeNext: prevState.breakModeNext,
                });
            });
            this.intervalId = setInterval(this.timerTick,1000);
        }
    }

    pauseHandler = () => {
        if (this.state.timerPlay) {
            this.setState( (prevState) => {
                return ({
                    utime: prevState.utime,
                    timerPlay: false,
                    breakModeNext: prevState.breakModeNext,
                });
            });
            clearInterval(this.intervalId);
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timerTick,1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    modeSwitcher() {
        let time = null;
        let nextModeIsBreak = null;
        if (this.state.breakModeNext) {
            time = 5
            nextModeIsBreak = false;
        } else {
            time = 8
            nextModeIsBreak = true;
        }
        // if (this.state.breakModeNext) { time = 5 * 60 } else { time = 20 * 60 }

        this.setState( (prevState) => (
            {
                utime: time,
                timerPlay: prevState.timerPlay,
                breakModeNext: nextModeIsBreak,
            }
        ));
    }


    shouldComponentUpdate() {
        if (this.state.utime <= 0) {
            this.modeSwitcher()
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
        borderColor: "blue",
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 5,
        marginTop: Constants.statusBarHeight * 2.5,
    },
    timerTextContainer: {
        fontSize: 60,
        alignSelf: "center",

    },
    buttonContainer: {
        // flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        fontSize: 30,
        margin: 10,
    },
    buttonSpacing: {
        margin: 5,
    },
})
