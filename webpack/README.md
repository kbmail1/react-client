$ npx mkcert create-ca  
$ npx mkcert create-cert


these commands generated the following files:

ca.key
ca.crt
cert.key
cert.crt

NOW - adding these in webpack.config.js:
 https: {
        key: fs.readFileSync("cert.key"),
        cert: fs.readFileSync("cert.crt"),
        ca: fs.readFileSync("ca.crt"),
    },