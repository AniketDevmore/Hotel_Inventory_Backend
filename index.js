const app = require('./app');
const db = require('./db/postgrsql')
// env module import
require('dotenv').config({ quiet: true })
const port = process.env.PORT;

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running on port ${port}`);
    } else {
        console.log('err=>', err);
    }
});

db.connect()
    .then(() => console.log("PostgreSQL connected"))
    .catch(err => console.error("Connection error", err));