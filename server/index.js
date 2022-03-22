const express = require('express');
const fs = require('fs');

const app = express();

require('./plugins/db')(app);

app.set('secret', fs.readFileSync('./token.key'));

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(require('cors')());
app.use('/', require('./routers/admin/index')(app))
require('./routers/web/index')(app);

app.listen(3000, () => {
    console.log('http://localhost:3000');
})