import React,{useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar
} from "react-native";
import COLORS from "../config/stylesheet/colors";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PresentationCtrl = require("./PresentationCtrl.js");

function SignUpScreen({ navigation, route }) {
    let presentationCtrl = new PresentationCtrl();

    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        birthdate:"",
        errorMsg:"",
        checkNameInputChange:false,
        checkEmailInputChange:false,
        checkBirthdateInputChange:false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        accepted:false,
    });
    const [birthdate, setDate] = useState(data.birthdate);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const validateEmail = (emailAdress) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailAdress.match(regexEmail)) {
            return true; 
        } else {
            return false; 
        }
    };
    const getAge = (DOB) => {
        var today = new Date();
        var birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }    
        return age;
    }
    const nameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                name: val,
                checkNameInputChange: true
            });
        } else {
            setData({
                ...data,
                name: val,
                checkNameInputChange: false
            });
        }
    };
    const emailChange = (val) => {
        if( validateEmail(val) ) {
            setData({
                ...data,
                email: val,
                checkEmailInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                checkEmailInputChange: false
            });
        }
    };
    const passwordChange = (val) => {
        setData({
            ...data,
            password:val
        })
    };
    const confirmPasswordChange = (val) => {
        setData({
            ...data,
            confirmPassword:val
        })
    };
    const birthdateChange = (val) => {
        if( val.length !== 0 && getAge(val) >= 16 ) {
            setData({
                ...data,
                birthdate: val,
                checkBirthdateInputChange: true
            });
        } else {
            setData({
                ...data,
                birthdate: val,
                errorMsg: "You must be +16 to use our app",
                checkBirthdateInputChange: false
            });
        }
    };
    const errorMsgChange = (val) => {
        setData({
            ...data,
            errorMsg: val
        })
    };
    const setAccepted = (val) => {
        setData({
            ...data,
            accepted: !val
        })
    };
    const registerUser = async () => {
        if (data.accepted) {
            const { name, email, password, confirmPassword, birthdate } = data;
            let response = await presentationCtrl.registerUser(
                name,
                email,
                password,
                confirmPassword,
                birthdate
            );
            if (response.status == 200) {
                navigation.navigate("SignInScreen");
            } else {
                errorMsgChange(response.message);
            }
        } else {
            errorMsgChange("You must accept the Terms and conditions")
        }               
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

    const handleConfirmDate = (birthdate) => {
		hideDatePicker();
		setDate(transformDate(birthdate));
        birthdateChange(birthdate);
	};
    
    const transformDate = (birthdate) => {
		var formattedDate =
			"" + birthdate.getDate() < 10
				? "0" + birthdate.getDate() + "/"
				: birthdate.getDate() + "/";
		formattedDate +=
            birthdate.getMonth() < 10 ? "0" + (birthdate.getMonth() + 1) : birthdate.getMonth() + 1;
		return formattedDate.concat("/", birthdate.getFullYear());
	};

    const standarizeDate = () => {
		var standarizedDate = "";
		return standarizedDate.concat(
			birthdate.slice(3, 5),
			"/",
			birthdate.slice(0, 2),
			"/",
			birthdate.slice(6, 10)
		);
	};

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };

    const renderMessage = () => {
        if (data.errorMsg != "") {
            return <Text style={styles.errorMsg}>{data.errorMsg}</Text>
        }
        return;
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInLeft"
                style={styles.footer}>
                <View>
                    { renderMessage() }
                </View>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: COLORS.primary
                    }]}>Name</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <FontAwesome
                                name="user-o"
                                color={COLORS.primary}
                                size={20}
                            />
                            <TextInput
                                placeholder={"Your Name"}
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: COLORS.primary
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val)=>nameChange(val)}
                            />
                        </View>

                        {data.checkNameInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                </View>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: COLORS.primary
                    }]}>Email</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <Feather
                                name="mail"
                                color={COLORS.primary}
                                size={20}
                            />
                            <TextInput
                                placeholder={"Your Email"}
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: COLORS.primary
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val)=>emailChange(val)}
                            />
                        </View>

                        {data.checkEmailInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                </View>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: COLORS.primary
                    }]}>Password</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <Feather
                                name="lock"
                                color={COLORS.primary}
                                size={20}
                            />
                            <TextInput
                                placeholder={"Your Password"}
                                placeholderTextColor="#666666"
                                secureTextEntry={data.secureTextEntry ? true:false}
                                style={styles.textInput}
                                onChangeText={(val)=>passwordChange(val)}
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: COLORS.primary
                    }]}>Confirm Password</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <Feather
                                name="lock"
                                color={COLORS.primary}
                                size={20}
                            />
                            <TextInput
                                type={"password"}
                                placeholder={"Your Password"}
                                placeholderTextColor="#666666"
                                secureTextEntry={data.confirm_secureTextEntry ? true:false}
                                style={[styles.textInput, {
                                    color: COLORS.primary
                                }]}
                                onChangeText={(val)=>confirmPasswordChange(val)}
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.confirm_secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: COLORS.primary
                    }]}>Birthdate</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <FontAwesome
                                    name="calendar"
                                    color={COLORS.primary}
                                    size={20}
                                />
                                <DateTimePickerModal
                                    mode="date"
                                    birthdate={new Date(standarizeDate())}
                                    onConfirm={handleConfirmDate}
                                    onCancel={hideDatePicker}
                                    isVisible={isDatePickerVisible}
                                />
                            </TouchableOpacity>
                            <Text
                                placeholder={"Your Birthdate"}
                                onPress={showDatePicker}
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: COLORS.primary,
                                    marginTop: 0
                                }]}
                            >
                                {" "}
                                {birthdate}
                            </Text>
                                
                        </View>

                        {data.checkBirthdateInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                </View>
                <View style={[styles.textPrivate, {paddingTop: 10}]} >
                    <BouncyCheckbox 
                        onPress={(isChecked: boolean) => {setAccepted(data.accepted)}}
                        fillColor={COLORS.green1}
                        unfillColor={COLORS.white}
                    />
                    <Text style={styles.color_textPrivate}>
                        I've read and accept the
                    </Text>
                    <Text style={[{color: '#0000EE', fontWeight: 'bold', textDecorationLine: 'underline'}]} onPress={() => navigation.navigate('TermsAndConditionsScreen')}>{" "}Terms and conditions</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignInScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {registerUser()}}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    );
};

SignUpScreen.navigationOptions = nav => {
    return{
        headerTitle:"Register"
    }
};

const styles = StyleSheet.create({
    style1:{
        flexDirection:"row",
        marginTop:10,
        justifyContent:"space-between"
    },
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    footer: {
        flex: 11,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    color_textPrivate: {
        color: 'grey'
    },
    action: {
        marginTop:10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        marginTop: -5,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 16,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SignUpScreen;