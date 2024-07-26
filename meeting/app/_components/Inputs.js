'use client'
import axios from "axios"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Dialog from "./Dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import Dialog2 from "./Dialog2"
import { useToast } from "@/components/ui/use-toast"


export default function Inputs(){
    const searchParams = useSearchParams()
  
  const search = searchParams.get('url')
  console.log(search);
    const [view,setView] = useState(false)

    const [timePeriod , setTimePeriod] = useState("24h")
    const [timeList,setTimeList] = useState([])
    const [timeGap,setTimeGap] = useState(20)
    const [timeGapList,setTimeGapList] = useState([])
    const [timeFinish , setTimeFinish ] = useState(14)
    const [userSelectedTime,setUserSelectedTime] = useState("")
    const [token,setToken] = useState("")
    const { toast } = useToast()

    const [inputDate , setInputDate] = useState("")
    const [inputTime,setInputTime] = useState("")

    let formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const localDate = `${year}-${month}-${day}`;
        return localDate;
      };


    function setTimeGapCreate(){
        let timeGapArr = []
        let i = 1
        while (i<=60) {
            timeGapArr.push(i)
            i = i + 1
        }
        setTimeGapList(timeGapArr)
    }

    function setTimeListCreate(){
        // console.log(timeGap);
        let timeArr = []
        let i = 10
        if(timePeriod === "12h"){
            timeArr = []
            while(i < timeFinish){
                let j = 0
                while(  j < 60 ){
                    if(i <= 12 ){
                        if(i === 12){
                            if(j === 0){
                                timeArr.push(`${i} : 00 pm`)
                            }else{
                                // console.log(i +"  "+ j);
                                if(j<10){
                                    timeArr.push(`${i} : 0${j} pm`)
                                }else{
                                    timeArr.push(`${i} : ${j} pm`)
                                }
    
                            }
                        }else{
                            if(j === 0){
                                timeArr.push(`${i} : 00 am`)
                            }else{
                                if(j<10){
                                    timeArr.push(`${i} : 0${j} pm`)
                                }else{
                                    timeArr.push(`${i} : ${j} pm`)
                                }
                            }
                        }
                    }else{
                        timeArr.push(`${i-12} : ${j} pm`)
                    }
                    j = j + Number.parseInt(timeGap)
                }
                i = i + 1
            }
        }else{
            i = 10
            timeArr = []
            while(i < timeFinish){
                let j = 0
                while(  j < 60 ){
                    if(j === 0){
                        timeArr.push(`${i}:00`)
                    }else{
                        // console.log(i +"  "+ j);
                        if(j<10){
                            timeArr.push(`${i}:0${j}`)
                        }else{
                            timeArr.push(`${i}:${j}`)
                        }
                    }
                    j = j + Number.parseInt(timeGap)
                }
                i = i + 1
            }
        }
        setTimeList(timeArr)
    }

    
    useEffect(() => {
        // console.log(timePeriod)
        setTimeListCreate()
        setTimeGapCreate()
    },[timePeriod , timeGap])

    useEffect(() => {
        if(search !== null){
            setView(true)
        }
    },[search])

    async function handleClick(){
        if(inputDate !== "" && userSelectedTime !== "" ){
            
            const d = new Date(inputDate)
            let n = d.getFullYear()
            if(d.getMonth()<10){
                n = n +"-"+ "0"+d.getMonth() 
            }else{
                n = n + d.getMonth()
            }

            if(d.getDay<10){
                n = n + "-" +"0"+d.getDay()
            }else{
                n = n + "-" +"0"+d.getDay()
            }
            // console.log("Date:" + n  + " Time: " +userSelectedTime);
            
            const r = await axios.post("http://localhost:3000",{
                date:n,
                startTime:userSelectedTime,
                endTime:userSelectedTime
            })
            //Yönlendirme işlemi
            window.location.href = "http://localhost:3000/auth"
        }else{
            toast({
                variant: "destructive",
                title : "Not leave blank"
            })
        }

     }

    function timeOnClick(e){
        e.preventDefault()
        // console.log("Time:"+userSelectedTime);
    }
    
    return(<div className="">

        <form className="flex items-start gap-5">
            <Calendar
                mode="single"
                selected={inputDate}
                onSelect={setInputDate}
                className="rounded-md border inline"
            />
            <div className="w-64 gap-3">
                {
                    timeList.map((item,index) => <button onClick={(e) => {
                        setUserSelectedTime(item)
                        timeOnClick(e)
                        // handleClick()
                    }} className={`text-black w-24 bg-white border-2 hover:border-black focus:ring-1 focus:border-black rounded-lg  px-5 py-2.5 me-2 mb-2 duration-300`} key={index} >{item}</button>)
                }
            </div>
        </form>
            <div className="text-center" >
                <button onClick={handleClick} className=" text-black px-4 py-2 rounded-xl border-2 hover:border-black hover:text-black duration-300" >Add Meet</button>
                {view && <Dialog2 url={search} viewControl={view}  />}
            </div>           
    </div>)
}