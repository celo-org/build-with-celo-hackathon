import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class IotReciever extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: false
        }
        this.mqttClient = ""
        this.mqttClientReady = false
        this.mount = true
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.publish.topic !== this.props.publish.topic && this.props.publish.topic !== "") {
            this.mqttClient.publish(this.props.publish.topic, this.props.publish.message);
            this.props.callbackPublish()
        }
    }

    async componentDidMount() {
        var AWS = require('aws-sdk');
        var AWSIoTData = require('aws-iot-device-sdk');
        var AWSConfiguration = require('./aws-configuration.js');
        AWS.config.region = AWSConfiguration.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: AWSConfiguration.poolId });
        var cognitoIdentity = new AWS.CognitoIdentity();
        var messageHistory = '';
        var refresh = 0;
        var clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1));

        this.mqttClient = AWSIoTData.device({
            region: AWS.config.region,
            host: AWSConfiguration.host,
            clientId: clientId,
            protocol: 'wss',
            maximumReconnectTimeMs: 1000,
            accessKeyId: '',
            secretKey: '',
            sessionToken: ''
        });
        console.log("Connecting...")
        await new Promise((resolve) => {
            AWS.config.credentials.get((err, data) => {
                if (!err) {
                    var params = { IdentityId: AWS.config.credentials.identityId };
                    cognitoIdentity.getCredentialsForIdentity(params, (err, data) => {
                        if (!err) {
                            this.mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId, data.Credentials.SecretKey, data.Credentials.SessionToken);
                            resolve("ok")
                        }
                        else {
                            console.log('error retrieving credentials: ');
                        }
                    });
                }
                else { console.log('error retrieving identity:'); }
            });
        })

        this.mqttClient.mqttClientConnectHandler = () => {
            console.log("Connected")
            console.log(this.props.sub_topics)
            for (let i = 0; i < this.props.sub_topics.length; i++) {
                this.mqttClient.subscribe(this.props.sub_topics[i]);
            }
            messageHistory = '';
            this.mount && this.setState({
                connect: true
            })
        }

        this.mqttClient.mqttClientReconnectHandler = () => {
            console.log('reconnect : times : ' + refresh.toString());
            this.mount && this.setState({
                connect: false
            })
        };

        this.mqttClient.mqttClientMessageHandler = (topic, payload) => {
            for (let i = 0; i < this.props.sub_topics.length; i++) {
                if (topic === this.props.sub_topics[i]) {
                    messageHistory = payload.toString()
                    this.props.callback([topic, messageHistory])
                }
            }
            messageHistory = "";
        }

        this.mqttClient.updateSubscriptionTopic = function () {

        };

        this.mqttClient.clearHistory = () => {

        };

        this.mqttClient.updatePublishTopic = () => { };

        this.mqttClient.updatePublishData = () => {

        };

        this.mqttClient.on('connect', this.mqttClient.mqttClientConnectHandler);
        this.mqttClient.on('reconnect', this.mqttClient.mqttClientReconnectHandler);
        this.mqttClient.on('message', this.mqttClient.mqttClientMessageHandler);
        this.mqttClient.on('close', () => {
            console.log('close');
        });
        this.mqttClient.on('offline', () => {
            console.log('offline');
        });
        this.mqttClient.on('error', (error) => {
            console.log('error', error);
        });
    }

    componentWillUnmount() {
        this.mount = false
        this.mqttClient.end();
    }

    render() {
        return (
            <View>
                <Icon name="dot-circle-o" size={24} color={this.state.connect ? "#32d180" : "red"} />
            </View>
        );
    }
}


export default IotReciever;