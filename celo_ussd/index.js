const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();
let phoneMapper = require('../blockDash/index').main;
let create_wallet = require('../blockDash/createAndFundAccount').main;
let verifier = require('../blockDash/index').verification;



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
        create_wallet().then(function (result) {
            menu.end('Your Wallet Address is ' + result.wallet.created_account);
            phoneMapper(result.wallet.created_account_private_key, menu.args.phoneNumber).then(function () {

            })
        });

    }
});

menu.state('verifyWallet', {
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
        var amount = String(menu.val);
        console.log('amount:', amount)
        verifier('0x6a24b7704ccf9b00a3bbcb8a15133956feaf31917e7a2cfa213783808f8f2cb1', amount, menu.args.phoneNumber).then(function (res) {
            menu.end('Airtime bought successfully.');
        });
    }

});
// 0x1CEc8464f4B700F8eaa2Ea2b04c0c8654B8dEC11

// menu.state('showBalance', {
//     run: () => {
//         // fetch balance
//         fetchBalance(menu.args.phoneNumber).then(function (bal) {
//             // use menu.end() to send response and terminate session
//             menu.end('Your balance is KES ' + bal);
//         });
//     }
// });

menu.state('buyAirtime', {
    run: () => {
        menu.con('Enter amount:');
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'buyAirtime.amount'
    }
});

// nesting states
menu.state('buyAirtime.amount', {
    run: () => {
        // use menu.val to access user input value
        // var amount = Number(menu.val);
        // buyAirtime(menu.args.phoneNumber, amount).then(function (res) {
        // menu.end('Airtime bought successfully.');
        // });
        menu.end('Airtime bought successfully.');
    }
});

// Registering USSD handler with Express




module.exports = {
    ussd: menu
}