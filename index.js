const app = require('./app');
const port = 8080;

app.listen(port, (err)=>{
    if(!err){
        console.log(`Server running on port ${port}`);
    }else{
        console.log('err=>', err);
    }
})