import React from 'react';
import { Vibration, StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';

const workTime = 20 * 60;
const breakTime = 5 * 60;

const Mode = (props) => {
        if (props.breakModeNext) {
            return ("Work!");
        } else {
            return ("Break!");
        }
    }

export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            utime: workTime,
            timerPlay: true,
            breakModeNext: true,
        }
    }

    render() {
        return (
            <View>
            <View style={styles.timerContainer}>
            <Text style={[styles.timerTextContainerSmall, styles.center]}>
            <Mode breakModeNext={this.state.breakModeNext}/>
            </Text>
            <Text style={[styles.timerTextContainerLarge, styles.center]}>
            {timeConvert(this.state.utime)}
            </Text>
            </View>
            <View style={[styles.buttonContainer, styles.center]}>
            <View style={styles.buttonSpacing}>
            <Button onPress={this.playHandler} title="Play" />
            </View>
            <View style={styles.buttonSpacing}>
            <Button onPress={this.pauseHandler} title="Pause" />
            </View>
            <View style={styles.buttonSpacing}>
            <Button onPress={this.resetHandler} title="Reset" />
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

    resetHandler = () => {
        this.setState({
            utime: workTime,
            timerPlay: true,
            breakModeNext: true,
        });
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
            time = breakTime;
            nextModeIsBreak = false;
        } else {
            time = workTime;
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
            Vibration.vibrate([500, 500, 500])
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
        borderColor: "lightblue",
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 5,
        marginTop: Constants.statusBarHeight * 2.5,
    },
    timerTextContainerSmall: {
        fontSize: 16,
    },
    timerTextContainerLarge: {
        fontSize: 60,
    },
    center: {
        alignSelf: "center",
    },
    buttonContainer: {
        // flexDirection: "row",
        width: "90%",
        fontSize: 30,
        margin: 10,
    },
    buttonSpacing: {
        margin: 5,
    },
})
