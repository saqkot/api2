const app = require('./app');
const cors = require('cors');


app.use(cors());
app.listen(app.get('port'), () =>{

    console.log("servidor escuchando en el puerto", app.get('port'));
});
