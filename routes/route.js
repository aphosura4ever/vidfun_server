const express = require('express')
const router = express.Router()
const connection = require('../database/db')
const passport = require('../passport')
const IncomingForm = require('formidable').IncomingForm
const fs = require('fs');
const bcrypt = require("bcrypt");
const saltRounds = 10;
var uploadPath = `D:/home/vidfun_videos/`
var index = 0;
var user_index = 0;

router.post('/', (req, res) => {
    console.log('user signup');

    const { name, username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      connection.query(
        `insert into users(Name,Username,Email,Password) values('${name}','${username}','${email}','${hash}')`,
        function(error) {
          if (error) console.error(error);
          else {
            console.log('User signed up succesfully')
            res.send({msg : 'User signed up succesfully'})
          }
      
        }
      
      
        );
  
  
    });
  });

router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        console.log("username "+req.body.username)
        console.log("password "+req.body.password)
        var userInfo = {
            username: req.user.Username
        };
        console.log(req.user.Username)
        console.log(req.session)
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
   
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

router.post('/upload',(req,res)=>{
       
    if (!fs.existsSync(uploadPath+`${req.user.Username}`)) {
        fs.mkdirSync(uploadPath+`${req.user.Username}`)
    }
    


        var form = new IncomingForm({uploadDir: uploadPath+`${req.user.Username}` })


    form.on ('fileBegin', function(name, file){
        //rename the incoming file to the file's name
        file.path = form.uploadDir + "/" + file.name;
    })

    form.on('file', (field, file) => {
      // Do something with the file
      // e.g. save it to the database
      // you can access it using file.path

        console.log(file)
        // destination.txt will be created or overwritten by default.
        // fs.copyFile(file.path, `C:/Users/Denis/Desktop/vidfun_videos/${file.name}`, (err) => {
        //     if (err) throw err;
        //      console.log('vieo was copied to destination');
        // });
        
    })
    

    form.on('end', () => {
      res.send('File tranfer succesfull')
    })
    form.parse(req)



})


router.get('/video1',(req,res)=>{
    
    let video_paths = []

    let videos = []
    let users = []
    fs.readdirSync("D:/home/vidfun_videos").forEach(user => {
        console.log(user);
        users.push(user)

        fs.readdirSync(`D:/home/vidfun_videos/${user}`).forEach(video => {
            console.log(video);
            videos.push(video)
            video_paths.push(`D:/home/vidfun_videos/${user}/${video}`)
        });    

       
    });
  
    console.log(video_paths) 

    

    const path = video_paths[Math.floor(Math.random() * Math.floor(video_paths.length))];
    console.log("random video " + path);
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }//
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }

})

router.get('/video2',(req,res)=>{
    
    let video_paths = []

    let videos = []
    let users = []
    fs.readdirSync("D:/home/vidfun_videos").forEach(user => {
        console.log(user);
        users.push(user)

        fs.readdirSync(`D:/home/vidfun_videos/${user}`).forEach(video => {
            console.log(video);
            videos.push(video)
            video_paths.push(`D:/home/vidfun_videos/${user}/${video}`)
        });    

       
    });
  
    console.log(video_paths) 

    

    const path = video_paths[Math.floor(Math.random() * Math.floor(video_paths.length))];
    console.log("random video " + path);
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }//
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }

})

router.get('/video3',(req,res)=>{
    
    let video_paths = []

    let videos = []
    let users = []
    fs.readdirSync("D:/home/vidfun_videos").forEach(user => {
        console.log(user);
        users.push(user)

        fs.readdirSync(`D:/home/vidfun_videos/${user}`).forEach(video => {
            console.log(video);
            videos.push(video)
            video_paths.push(`D:/home/vidfun_videos/${user}/${video}`)
        });    

       
    });
  
    console.log(video_paths) 

    

    const path = video_paths[Math.floor(Math.random() * Math.floor(video_paths.length))];
    console.log("random video " + path);
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }//
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }

})

router.get('/video4',(req,res)=>{
    
    let video_paths = []

    let videos = []
    let users = []
    fs.readdirSync("D:/home/vidfun_videos").forEach(user => {
        console.log(user);
        users.push(user)

        fs.readdirSync(`D:/home/vidfun_videos/${user}`).forEach(video => {
            console.log(video);
            videos.push(video)
            video_paths.push(`D:/home/vidfun_videos/${user}/${video}`)
        });    

       
    });
  
    console.log(video_paths) 

    

    const path = video_paths[Math.floor(Math.random() * Math.floor(video_paths.length))];
    console.log("random video " + path);
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }//
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }

})



router.get("/videoscheck", (req,res)=>{
    let users_dir = []
    fs.readdirSync("D:/home/vidfun_videos").forEach(file => {
       console.log(file);
       users_dir.push(file)
     });
     
     console.log(users_dir);

     if(!users_dir){
        res.send({videosInFeed : false})
     }
     else{
        res.send({videosInFeed : true})
        res.status(200);
     }
})


module.exports = router