import { Dimensions, StyleSheet } from 'react-native';

const navbarHeight = Dimensions.get('screen').height - Dimensions.get('window').height;

let headerHeight = 60;
let footerHeight = 60;

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    containerSetup: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: `black`
    },
    header: {
        width: Dimensions.get("window").width,
        height: headerHeight,
        backgroundColor: "black",
        borderBottomColor: "#FFC000",
        borderBottomWidth: 2
    },
    main: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - (headerHeight + footerHeight),
        backgroundColor: "black",
    },
    mainSub: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - (headerHeight),
        backgroundColor: "black",
    },
    footer: {
        width: Dimensions.get("window").width,
        height: footerHeight,
        backgroundColor: "black",
    },
    button: {
        borderRadius: 100,
        backgroundColor: "#32d180",
        padding: 10,
        width: "80%"
    },
    buttonBig: {
        borderRadius: 10,
        backgroundColor: "#32d180",
        padding: 10,
        width: "40%",
        height: "36%",
        marginVertical: 30
    },
    buttonDisabled: {
        borderRadius: 100,
        backgroundColor: "#32d18077",
        padding: 10,
        width: "80%"
    },
    buttonFooter: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonFooterSelected: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#FFC000",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Helvetica",
        textShadowColor: "black",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6
    },
    simpleText: {
        color: "white",
        textAlign: "center",
        fontFamily: "Helvetica",
        width: "96%"
    },
    simpleTextPhrase: {
        color: "white",
        textAlign: "center",
        fontFamily: "Helvetica"
    }
});

export default GlobalStyles;