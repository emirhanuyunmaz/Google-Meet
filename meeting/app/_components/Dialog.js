'use client'
import { useState } from "react"


export default function Dialog({url , viewControl}){

    const [view,setView] = useState(viewControl)//Bu değişken dialog penceresinin görünüp görünmemesini belirler.


    function closeHandleClick(){
        setView(!view)
    }

    return(<>
        {
            view && <>
                <div className="pt-5  flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative flex justify-center items-center w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Meet Url
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-slate-400 hover:text-slate-500 float-right text-xl leading-none font-semibold outline-none focus:outline-none" onClick={closeHandleClick} >
                        X
                      </button>
                    </div>
                    {/*body*/}
                        <h3 className="min-h-32 flex justify-start items-center min-w-72" >{url}</h3>  
                    </div>
                    {/*footer*/}
                    <div className="flex items-center gap-5 justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-slate-400 hover:text-slate-500"
                        type="button"
                        onClick={closeHandleClick}
                      >
                        Close
                      </button>
                      
                    </div>
                  </div>
                </div>
                
              
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        }
        </>)
}