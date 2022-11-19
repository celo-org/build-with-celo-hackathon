import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-simple-toast'
import commonStyles from '../commonStyles'

const TextToClipBoard = ({ text, textFormatter = (t) => t, toastMsg = 'Text copied to clipboard!' }) => {
    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Toast.show(toastMsg)
    }

    return (
        <TouchableOpacity onPress={() => copyToClipboard(text)}>
            <Text style={commonStyles.activeText}>{textFormatter(text)}</Text>
        </TouchableOpacity>
    )
}

export default TextToClipBoard