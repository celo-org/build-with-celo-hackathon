const UssdMenu = require('ussd-menu-builder');
const getSession = require('ussd-menu-builder');
const mongo = require('mongodb').MongoClient;
const CryptoJS = require('crypto-js');

const url = 'mongodb://localhost:27017'
const dbName = 'celodb'
let menu = new UssdMenu();

let phoneMapper = require('../blockDash/index').main;
let create_wallet = require('../blockDash/createAndFundAccount').main;
let verifier = require('../blockDash/index').verification;
let getWalletBalance = require('../blockDash/utils').getWalletBalance;
// let sendCELO = require('../blockDash/utils').sendCELO;



// Define menu states
menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Welcome. Choose option:' +
            '\n1. Create Wallet' +
            '\n2. Verify Wallet' +
            '\n3. Check Balance' +
            '\n4. Transfer');
    },
    // next object links to next state based on user input
    next: {
        '1': 'createWallet',
        '2': 'verifyWallet',
        '3': 'checkBalance',
        '4': 'transfer'

    }
});

menu.state('createWallet', {
    run: () => {
        menu.con('Enter PassPhrase:');
        console.log('PassPhrase')
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'createWallet.create'
    }
});

menu.state('createWallet.create', {
    run: () => {
        create_wallet().then(function (result) {
            menu.end('Your Wallet Address is ' + result.wallet.created_account);
            var PrivateKey = result.wallet.created_account_private_key;
            var passphrase = menu.val;
            var encrypted_private_key = CryptoJS.AES.encrypt(PrivateKey, passphrase).toString();

            mongo.connect(url, (err, client) => {
                if (err) {
                    console.error(err)
                    return
                }
                console.log('Connected successfully to server')
                const db = client.db(dbName)
                const collection = db.collection('collectionname')

                collection.insertOne({ Number: menu.args.phoneNumber, PrivateKey: encrypted_private_key }, ((error, item) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    console.log(item)
                }))
            })
            // phoneMapper(result.wallet.created_account_private_key, menu.args.phoneNumber).then(function () {

            // })
        });

    }
});

menu.state('verifyWallet', {
    run: () => {
        menu.con('Enter PassPhrase:');
        console.log('PassPhrase')
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'verifyWallet.OTP'
    }
});

menu.state('verifyWallet.OTP', {
    run: () => {
        menu.con('Enter OTP:');
        console.log('OTP 1')
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'verifyWallet.verify'
    }
});

menu.state('verifyWallet.verify', {

    run: () => {
        // use menu.val to access user input value
        console.log('verifyWallet.verify')
        var code = String(menu.val);
        var passphrase = menu.states['verifyWallet.OTP'].val
        console.log('code:', code)
        console.log('pass', menu.states['verifyWallet.OTP'].val)

        mongo.connect(url, (err, client) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Connected successfully to server')
            const db = client.db(dbName)
            const collection = db.collection('collectionname')

            collection.find({ Number: menu.args.phoneNumber }).toArray((error, items) => {
                console.log(items[0].PrivateKey)
                const bytes = CryptoJS.AES.decrypt(items[0].PrivateKey, passphrase);
                const privateKey = bytes.toString(CryptoJS.enc.Utf8)
                if (privateKey.length == 0) {
                    menu.end('Wrong PassPhrase')
                }
            })
        })
        verifier(privateKey, code, menu.args.phoneNumber).then(function (res) {
            menu.end('Successfully Verified');
        });
    }

});

menu.state('checkBalance', {
    run: () => {
        getWalletBalance(menu.args.phoneNumber).then(function (result) {
            menu.end(`Your Celo Balance is ${result.celoBalanceConv} and Your cUSD Balance is  ${result.cUSDBalanceConv} `)
        });

    }
});

menu.state('transfer', {
    run: function () {
        menu.con('Enter Recipient Number:');

    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'transfer.value'
    }
});

menu.state('transfer.value', {
    run: function () {
        menu.con('Enter Value:');
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'transfer.transfer'
    }
});

menu.state('transfer.transfer', {
    run: () => {
        // console.log('menu', menu.states['transfer.value'].val)
        // console.log('menu.value', menu.val)
        sendCELO('0x3dacc82ae2c0a787d31f0c0271c850d3f8a2ccc185c4ecfdc4144334660c974e', menu.states['transfer.value'].val, menu.val).then(function (result) {
            console.log(result)
            menu.end('end')
        });

    }
});



module.exports = {
    ussd: menu
}