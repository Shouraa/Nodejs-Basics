const http = require("http");
const fs = require("fs");
const url = require("url");
const os = require("os");
const dt = require("./modules");
const nodemailer = require("nodemailer");

http
  .createServer((req, res) => {
    const username = os.hostname();
    const ip = req.connection.remoteAddress;
    const pageUrl = req.url;
    const checkingTime = dt.displayDateTime();
    const content = `User: ${username} User-ip:${ip}  Time:${checkingTime}  Page Visited: ${pageUrl} \r\n`;
    if (req.url === "/" || req.url === "/home") {
      fs.readFile("Home.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end();
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      fs.appendFile("track.user.txt", content, function(err) {
        if (err) throw err;
        console.log("Updated!");
      });
    } else if (req.url === "/about") {
      fs.readFile("About.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end();
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      fs.appendFile("track.user.txt", content, function(err) {
        if (err) throw err;
        console.log("Updated!");
      });
    } else if (req.url === "/contact") {
      fs.readFile("Contact.html", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end();
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      });
      fs.appendFile("track.user.txt", content, function(err) {
        if (err) throw err;
        console.log("Updated!");
      });
    }
  })
  .listen(8070);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
});

const mailOptions = {
  from: "",
  to: "shoura_djafar@yahoo.com",
  subject: "Email with Node.js",
  text: "whatever"
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent: " + info.response);
  }
});
