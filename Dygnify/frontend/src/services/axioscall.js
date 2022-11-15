import axios from 'axios';

async function axiosHttpService(options) {

    let d1 = new Date();

    try {
        let response = await axios(options);
        console.log("RESPONSE DATA " + JSON.stringify(response.data));

        return {
            url: options.url,
            res: response.data,
            code: response.status,
            responsetime: timeConversion(d1, new Date())
        }

    } catch (error) {

        console.error("RESPONSE DATA " + JSON.stringify(error));

        if (error.response && error.response.data.Status === 'Error') {

            return {
                url: options.url,
                res: error.response.data ? error.response.data : error.response,
                code: error.response.status,
                error: error.response.message,
                responsetime: timeConversion(d1, new Date())
            }

        } else {

            return {
                url: options.url,
                res: error.response.data ? error.response.data : error.response,
                code: 500,
                error: "error",
                responsetime: timeConversion(d1, new Date())
            }

        }

    }

}

function timeConversion(start, end) {

    let millisec = Math.abs(end - start);

    var seconds = (millisec / 1000).toFixed(1);
    var minutes = (millisec / (1000 * 60)).toFixed(1);
    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) { return seconds + " Sec"; }
    else if (minutes < 60) { return minutes + " Min"; }
    else if (hours < 24) { return hours + " Hrs"; }
    else { return days + " Days" }

}

export default axiosHttpService;