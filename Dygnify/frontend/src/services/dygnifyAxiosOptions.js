function dygnifyBearerTokenOption() {

    var data = JSON.stringify({
        "email": process.env.REACT_APP_DYGNIFY_USERNAME,
        "password": process.env.REACT_APP_DYGNIFY_PWD,
        "returnSecureToken": true
    });

    var api_options = {
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_DYGNIFY_KEY}`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: data
    }

    return api_options;

}

function dygnifyBusinessOwnerCreationOption(ownerDetails, bearerToken) {

    var data = JSON.stringify(ownerDetails);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessOwner',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyOwnerKycOption(ownerkycDetails, bearerToken) {

    var data = JSON.stringify(ownerkycDetails);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessownerkyc',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifycreateBusinessOptions(createBusinessDetails, bearerToken) {

    var data = JSON.stringify(createBusinessDetails);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'business',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifycreateKYBOptions(createKYBDetails, bearerToken) {

    var data = JSON.stringify(createKYBDetails);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businesskyb',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifycreateCoBorrowerOptions(createCoBorrowerDetails, bearerToken) {

    var data = JSON.stringify(createCoBorrowerDetails);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'coborrower',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifycreateKarzaAPIDumpOptions(karzaApiDump, bearerToken) {

    var data = JSON.stringify(karzaApiDump);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'karzaAPIDump',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyBusinessOwnerUpdationOption(ownerDetails, bearerToken, businessOwnerId) {

    var data = JSON.stringify(ownerDetails);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessOwner/' + businessOwnerId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyUpdateOwnerKycOption(ownerkycDetails, bearerToken, businessOwnerId) {

    var data = JSON.stringify(ownerkycDetails);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessownerkyc/' + businessOwnerId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyUpdateBusinessOptions(createBusinessDetails, bearerToken, businessId) {

    var data = JSON.stringify(createBusinessDetails);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'business/' + businessId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyUpdateKYBOptions(createKYBDetails, bearerToken, businessId) {

    var data = JSON.stringify(createKYBDetails);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businesskyb/' + businessId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyUpdateCoBorrowerOptions(createCoBorrowerDetails, bearerToken, co_borrowerId) {

    var data = JSON.stringify(createCoBorrowerDetails);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'coborrower/' + co_borrowerId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyUpdateCoborrowerKycOption(ownerkycDetails, bearerToken, co_borrowerId) {

    var data = JSON.stringify(ownerkycDetails);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessownerkyc/' + co_borrowerId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyUpdatekarzaAPIDumpOption(karzaAPIDump, bearerToken, karzaAPIDumpId) {

    var data = JSON.stringify(karzaAPIDump);

    var api_options = {
        method: 'put',
        url: process.env.REACT_APP_DYGNIFY_URL + 'karzaAPIDump/' + karzaAPIDumpId,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyGetBusinessOwnerOption(panNo, bearerToken) {

    var data = JSON.stringify();

    var api_options = {
        method: 'get',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessOwner?pan=' + panNo,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyGetBusinessOption(panNo, bearerToken) {

    var data = JSON.stringify();

    var api_options = {
        method: 'get',
        url: process.env.REACT_APP_DYGNIFY_URL + 'business?businesspan=' + panNo,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyGetCoBorrowerOption(panNo, bearerToken) {

    var data = JSON.stringify();

    var api_options = {
        method: 'get',
        url: process.env.REACT_APP_DYGNIFY_URL + 'coborrower?pan=' + panNo,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyGetOwnerKycOption(panNo, bearerToken) {

    var data = JSON.stringify();

    var api_options = {
        method: 'get',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businessownerkyc?pan=' + panNo,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyGetKYBOptions(panNo, bearerToken) {

    var data = JSON.stringify();

    var api_options = {
        method: 'get',
        url: process.env.REACT_APP_DYGNIFY_URL + 'businesskyb?pan=' + panNo,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyGetKarzaAPIDumpOptions(panNo, bearerToken) {

    var data = JSON.stringify();

    var api_options = {
        method: 'get',
        url: process.env.REACT_APP_DYGNIFY_URL + 'karzaAPIDump?pan=' + panNo,
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifySendOwnerConsent(consent, BusinessOwnerId, bearerToken) {

    var data = JSON.stringify({
        "BusinessOwnerId": BusinessOwnerId,
        "ConsentDate": new Date(),
        "HasGivenConsent": consent
    });

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'consent',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifySendCoBorrowerConsent(consent, CoBorrowerId, bearerToken) {

    var data = JSON.stringify({
        "CoBorrowerId": CoBorrowerId,
        "ConsentDate": new Date(),
        "HasGivenConsent": consent
    });

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'consent',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;

}

function dygnifyFileUpload(stream, bearerToken) {
    const data = new FormData();
    data.append('file', stream);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'uploadImage',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'multipart/form-data'
        },
        data: data
    }

    return api_options;
}

function dygnifyKycOCR(stream, bearerToken) {
    const data = new FormData();
    data.append('file', stream);

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'utility/kycOCR',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'multipart/form-data'
        },
        data: data
    }

    return api_options;
}

function dygnifySendMobileOTP(countryCode, phoneNo) {
    var data = JSON.stringify({
        "mobile": phoneNo,
        "countryCode": countryCode
    });

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'utility/getOTP',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;
}

function dygnifyValidateMobileOTP(reqId, otp, phoneNo) {
    var data = JSON.stringify({
        "reqId": reqId,
        "otp": otp,
        "mobile": phoneNo
    });

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'utility/validateOTP',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;
}

function dygnifyGetMobileDetails(reqId, phoneNo, bearerToken) {
    var data = JSON.stringify({
        "reqId": reqId,
        "mobile": phoneNo
    });

    var api_options = {
        method: 'post',
        url: process.env.REACT_APP_DYGNIFY_URL + 'utility/getMobileDetails',
        headers: {
            'Authorization': bearerToken,
            'Content-Type': 'application/json'
        },
        data: data
    }

    return api_options;
}

module.exports = {
    dygnifyBusinessOwnerCreationOption,
    dygnifycreateBusinessOptions,
    dygnifycreateKYBOptions,
    dygnifycreateCoBorrowerOptions,
    dygnifycreateKarzaAPIDumpOptions,
    dygnifyBearerTokenOption,
    dygnifyOwnerKycOption,
    dygnifyBusinessOwnerUpdationOption,
    dygnifyUpdateOwnerKycOption,
    dygnifyUpdateBusinessOptions,
    dygnifyUpdateKYBOptions,
    dygnifyUpdateCoBorrowerOptions,
    dygnifyUpdatekarzaAPIDumpOption,
    dygnifyGetBusinessOwnerOption,
    dygnifyGetBusinessOption,
    dygnifyGetCoBorrowerOption,
    dygnifyGetOwnerKycOption,
    dygnifyGetKYBOptions,
    dygnifyGetKarzaAPIDumpOptions,
    dygnifySendOwnerConsent,
    dygnifySendCoBorrowerConsent,
    dygnifyUpdateCoborrowerKycOption,
    dygnifyFileUpload,
    dygnifyKycOCR,
    dygnifySendMobileOTP,
    dygnifyValidateMobileOTP,
    dygnifyGetMobileDetails
}