import { useState, useEffect, useContext } from "react";
// import { StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Text, View, TouchableOpacity } from "../components/Themed";
import * as WebBrowser from "expo-web-browser";
import Web3 from "web3";
// import Colors from "../constants/Colors";
import { ThemeContext } from "../context/ThemeProvider";
import { digesuAddress } from "../fetchDeploymentData/digesu";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

export default function Account() {
	const connector = useWalletConnect();
	const { styles } = useContext(ThemeContext);
	const [accountLink, setAccountLink] = useState("");
	const [contractLink, setContractLink] = useState("");

	useEffect(() => {
		setAccountLink(
			`https://alfajores-blockscout.celo-testnet.org/address/${connector.accounts[0]}`
		);
		if (digesuAddress) {
			setContractLink(
				`https://alfajores-blockscout.celo-testnet.org/address/${digesuAddress}`
			);
		}
	}, [connector]);

	function handleAccountInfoPress() {
		WebBrowser.openBrowserAsync(accountLink);
	}

	function handleContractInfoPress() {
		WebBrowser.openBrowserAsync(contractLink);
	}

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>Account Info</Text>
				<TouchableOpacity
					style={styles.externalLink}
					onPress={handleAccountInfoPress}>
					<Text style={styles.externalLink}>
						{`${connector.accounts[0].substr(
							0,
							5
						)}...${connector.accounts[0].substr(-5)}`}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.separator}></View>
			<TouchableOpacity onPress={() => connector.killSession()}>
				<Text>Disconnect Wallet</Text>
			</TouchableOpacity>
			<View style={styles.separator}></View>
			<TouchableOpacity
					style={styles.externalLink}
					onPress={handleContractInfoPress}>
					<Text style={styles.externalLink}>
						{`${digesuAddress.substr(
							0,
							5
						)}...${digesuAddress.substr(-5)}`}
					</Text>
			</TouchableOpacity>
		</View>
	);
}
