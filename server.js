const express = require("express");
const dgram = require("dgram");

const app = express();
const PORT = process.env.PORT || 3001;
const socket = dgram.createSocket("udp4");

app.post("/discovery", (req, res) => {
const discoveryMessage =
`M-SEARCH * HTTP/1.1\r\n` +
`HOST: 239.255.255.250:1900\r\n` +
`MAN: "ssdp:discover"\r\n` +
`ST: roku:ecp\r\n\r\n`;

socket.send(
discoveryMessage,
0,
discoveryMessage.length,
1900,
"239.255.255.250"
);

socket.on("message", (message, rinfo) => {
res.send(message.toString());
});
});

socket.bind(0, "0.0.0.0", () => {
console.log("UDP socket is listening");
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
