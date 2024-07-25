require("dotenv").config();
const express = require("express")

const app = express()

const cors = require('cors')

const {google} = require("googleapis")

const passport = require("passport")

const fs = require("fs")

const GoogleStrategy = require("passport-google-oauth20").Strategy

app.use(cors())
app.use(express.json())
const Meeting = require('google-cal-meet-api').meet;
let control = false 

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.SECRET_ID,
    callbackURL:"http://localhost:3000/auth/callback"
},async function (accessToken, refreshToken, profile, cb) {
    console.log("refreshToken : ", refreshToken)
    let getData =fs.readFileSync('data.json')
    getData = JSON.parse(getData)
    console.log("DATA::"+getData.date)
    console.log("DATA::"+getData.startTime)
    await Meeting({
        clientId:process.env.CLIENT_ID,
        clientSecret : process.env.SECRET_ID,
        refreshToken:refreshToken,
        date : getData.date,
        startTime :getData.startTime ,
        endTime : getData.startTime,
        summary : 'summary',
        location : 'location',
        description : 'description',
        attendees : [{email:"xyz@gmail.com"}],
        alert:10 
    }).then(function (result) {
        control = true

        if(control){
            console.log("İşlem yapıldı");
        }
        // console.log("RES::"+result);
        fs.writeFileSync("url.json",JSON.stringify({url:result}),function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        })
        // meetUrl=result
    })
    return cb();
}))

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.SECRET_ID,
    process.env.REDIRECT_URL
)

app.get('/auth/callback',passport.authenticate('google', { failureRedirect: '/' }));

app.get('/auth',
    passport.authenticate('google', {
        scope: ['profile', 'https://www.googleapis.com/auth/calendar'],
        accessType: 'offline',
        prompt: 'consent'
    }
    
));

app.get("/",(req,res)=> {
    console.log(control)
    let meetUrl = ""
    

    meetUrl =fs.readFileSync('url.json')
    meetUrl = JSON.parse(meetUrl)
            

    console.log("GET::"+meetUrl.url);
    res.redirect(`http://localhost:3001?url=${meetUrl.url}`);
    
    
})

app.post('/',(req,res)=> {

        // date : "2020-12-01",
        // startTime : "10:59",
        // endTime : "10:59",
    
    console.log(req.body.date);
    console.log(req.body.startTime);
    console.log(req.body.endTime);
    // res.sendFile(path.join(__dirname, 'file_name.json'));

    const data = {
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime
    }

    fs.writeFileSync("data.json",JSON.stringify(data),function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    })
    res.status(201).json({message:"succes"})
})




// app.get('/',passport.authenticate('google', {
//     scope: ['profile', 'https://www.googleapis.com/auth/calendar'],
//     accessType: 'offline',
//     prompt: 'consent'
// }),
// passport.authenticate('google', { failureRedirect: '/' })
// , function (req, res) {
//     // res.send({url:meetUrl})
//     res.redirect("http://localhost:3001")
// })



// app.get("/redirect",async(req,res) => {
//     const code = req.query.code
//     oAuth2Client.getToken(code,async(err,tokens) => {
//         if(err){
//             console.error('Couldn\'t get token', err);
//             res.send('Error');
//         }else{
//                 oAuth2Client.setCredentials({
//                         refresh_token : tokens.refresh_token,
//                         access_token:tokens.access_token
//                 });

//                 const meeting = new SpacesServiceClient({auth:oAuth2Client})
//                 const r =await meeting.createSpace({})
//                 console.log(r[0].meetingUri);
//                 res.send('Successfully logged in');

//         }
//     })
// })


// app.get("/calendar",(req,res) => {
//     const calendar = google.calendar({version :"v3",auth:oAuth2Client})
//     calendar.calendarList.list({},(err,response)=> {
//         if(err){
//             console.error('Error fetching calendars', err);
//             res.end('Error!');
//         }else{
//             const calendars = response.data.items;
//             res.json(calendars);
//         }
//     })
// })

// app.get("/events",(req,res) => {
//     const calendarId = req.query.calendar ?? "primary"
    
//     const calendar = google.calendar({version:"v3" , auth:oAuth2Client})
//     calendar.events.list({
//         calendarId,
//         timeMin:(new Date().toISOString()),
//         maxResults:15,
//         singleEvents:true,
//         orderBy:"startTime",
//     },(err,response) => {
//         if(err){
//             console.error('Can\'t fetch events');
//             res.send('Error');
//         }else{
//             const events = response.data.items;
//             res.json(events);
//         }
//     })
// })

// app.get("/meet",(req,res) => {
//     res.status(201).json({message:"succes"})
// })

app.listen(3000,() => {
    console.log("Server runing...")
})