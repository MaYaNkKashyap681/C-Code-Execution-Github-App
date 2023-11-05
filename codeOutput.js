const axios = require('axios')
const fs = require('fs')
const dotenv = require('dotenv');

dotenv.config();

// Define access parameters
const accessToken = process.env.SPHERE_API_KEY;
const endpoint = process.env.SPHERE_ENDPOINT;

const getOutput = async (url) => {
    console.log(url);
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    } catch (err) {
        throw new Error('Failed to fetch output: ' + err.message);
    }
}

async function codeExecutorScript(cppCode) {
    try {
        // const cppCode = fs.readFileSync('cpp_code.cpp', 'utf8');

        const submissionResponse = await axios.post(`https://${endpoint}/submissions?access_token=${accessToken}`, {
            source: cppCode,
            compilerId: 41 // Use the appropriate compiler ID for C++ (e.g., 11 for C++14)
        });

        const submissionId = submissionResponse.data.id;

        // console.log(submissionId);

        let outputUri = null;
        do {
            const resultResponse = await axios.get(`https://${endpoint}/submissions/${submissionId}?access_token=${accessToken}`);
            const result = resultResponse.data;
            if (!result.executing) {
                // console.log(result.result.streams.output.uri);
                outputUri = result.result.streams.output.uri;
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        } while (true);

        if (outputUri) {
            const output = await getOutput(outputUri);
            // console.log(output);
            return output;
        }
        // You can add more error handling and specific checks as needed.
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}


module.exports = {codeExecutorScript}
