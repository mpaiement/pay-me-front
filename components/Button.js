import { Text, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors'

const Button = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    // Détermination de la couleur de fond en fonction du survol
    const bgColor = isHovered ? COLORS.blue : (props.filled ? props.color || COLORS.blue : COLORS.white);

    // Détermination de la couleur du texte
    const textColor = props.filled ? COLORS.white : COLORS.blue;

    return (
        <TouchableHighlight
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
            onHideUnderlay={() => setIsHovered(false)}
            onShowUnderlay={() => setIsHovered(true)}
        >
            <Text style={{ fontSize: 18, color: textColor }}>{props.title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.white,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Button
