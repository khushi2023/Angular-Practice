// const express = require('express');
// const ping = require('ping');
// const app = express();

// app.get('/ping', async (req, res) => {
//     const target = 'www.mytaxprepoffice.com'; // replace with your target server
//     const startTime = Date.now();

//     try {
//         const response = await ping.promise.probe(target);
//         const latency = Date.now() - startTime;
//         console.log(response);
//         res.json({
//             target: target,
//             time: response.time,
//             latency: latency,
//             alive: response.alive
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Ping failed', details: error.message });
//     }
// });
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const ping = require('ping');
// const axios = require('axios');
// const app = express();
// app.use(bodyParser.json());

// app.get('/ping', async (req, res) => {
//     console.log(req.body);
//     const userIp = req.body.ip;
//     console.log(userIp);

//     try {
//         const locationResponse = await axios.get(`https://ipinfo.io/${userIp}/json`);
//         console.log(locationResponse);
//         const location = locationResponse.data.city;

//         const targetServer = 'www.google.com';

//         const startTime = Date.now();
//         const pingResponse = await ping.promise.probe(targetServer);
//         const latency = Date.now() - startTime;

//         res.json({
//             target: targetServer,
//             time: pingResponse.time,
//             latency: latency,
//             alive: pingResponse.alive,
//             location: location,
//             ip: userIp
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Ping failed', details: error.message });
//     }
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// Import required modules
// const express = require('express');
// const requestIp = require('request-ip');

// // Initialize Express app
// const app = express();

// // Middleware to get client's IP address
// app.use(requestIp.mw());

// // Define API endpoint to get private IP address
// app.get('/ping', (req, res) => {
//     // Get client's IP address
//     const clientIp = req.clientIp;
//     console.log(clientIp);
//     // Send the private IP address as response
//     try{
//         const locationResponse = axios.get(`https://ipinfo.io/${clientIp}/json`);
//         console.log(locationResponse);
//         const location = locationResponse.data.city;
//         console.log(location);
//         res.send(`${clientIp}`);
//     }catch(error){
//         res.status(500).json({error});
//     }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const axios = require('axios');
const express = require('express');
const requestIp = require('request-ip');
const app = express();

app.use(requestIp.mw());

app.get('/ping', async (req, res) => {
    // Get client's IP address
    const clientIp = req.clientIp;
    console.log(clientIp);
    // res.send(`${clientIp}`);
    try {
        console.log('Client IP:', clientIp);
        // Fetch public IP based on private IP
        const result = await axios.get('https://api64.ipify.org/');
        // console.log(response);
        // const publicIp = response.data;
        // console.log('Public IP:', publicIp);
        // res.send(res);
        res.send(`${clientIp}`);

        // Respond with public IP
        // res.json({ id: publicIp });
    } catch (error) {
        console.error('Error fetching public IP:', error);
        res.status(500).json({ error: 'Failed to fetch public IP based on private IP' });
    }
});

// Example of starting the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



