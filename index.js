const mysql=require('mysql');
const expres=require('express');
const app=expres();
const bodyparser=require('body-parser');
app.use(bodyparser.json());
var ans= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'prem0131',
    database:'employeedb',
    insecureAuth : true
});
ans.connect((err)=>{
    if(!err)
    {
        console.log('Connection Success')
    }else{
        console.log('failed to connect to database',err)
    }
});
//get all employees
app.get('/employees',(req,res)=>{
    ans.query("select * from employee  ",(err,rows,fields)=>{
       if(err)
       {
       console.log('There is an error')
       }
       else{
           console.log(rows)
       }

   })
})
//get single employee by it's id
app.get('/employees/:id',(req,res)=>{
     ans.query("select * from employee where id = ?",[req.params.id],(err,rows,fields)=>{
        if(err)
        {
        console.log('There is an error')
        }
        else{
            console.log(rows)
        }

    })
})
//insert new employee
app.post('/employees',(req,res)=>{  
    ans.query("insert into employee values(?,?,?,?)",[req.body.id,req.body.name,req.body.code,req.body.salary],(err,rows,fields)=>{
        if(err)
        {
        console.log('There is an error',err)
        }
        else{
            console.log(rows)
        }

    })
})
//update employee's name on basis of code
app.patch('/employees',(req,res)=>{
    ans.query("update employee set name=?  WHERE code=?",[req.body.name,req.body.code],(err,rows,fields)=>{
        if(err)
        {
        console.log('There is an error',err)
        }
        else{
            console.log(rows)
        }

    })
})

//delete employee by it's name
app.delete('/employees',(req,res)=>{
    ans.query("delete from employee where name =  ? ",[req.body.name],(err,rows,fields)=>{
        if(err)
        {
        console.log('There is an error')
        }
        else{
            console.log(rows)
        }

    })
})
app.listen(3000,()=>{
    console.log('Server is Up and Running')
})