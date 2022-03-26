import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/stylesheet/colors';

const Input = ({
    label,
    iconName,
    error,
    onFocus = () => { },
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>{label}
                <Text style={styles.highlight}> *</Text>
            </Text>
            <View style={[
                styles.inputContainer,
                {
                    borderColor: error
                        ? colors.red1
                        : isFocused
                            ? colors.secondary
                            : colors.lightGrey,
                    alignItems: 'center',
                }]}>
                <Icon name={iconName}
                    style={{ fontSize: 22, color: colors.green1, marginRight: 10 }}
                />
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{ color: colors.secondary, flex: 1 }}
                    {...props}
                />
            </View>
            {error && (<Text style={{ color: colors.red1, fontSize: 12, marginTop: 7 }}>
                {error}
            </Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    highlight: {
        marginBottom: 5,
        fontSize: 14,
        color: colors.green1,
        fontWeight: 'bold',
    },
    inputContainer: {
        borderRadius: 5,
        height: 55,
        backgroundColor: colors.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
    },
});

export default Input;