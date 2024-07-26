'use client'
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useState } from "react"


export default function Dialog2({url , viewControl}){

    const [view,setView] = useState(viewControl)

    const { toast } = useToast()


    function copyOnClick(){
        navigator.clipboard.writeText(url)
        toast({
            description: "Copy Link",
        })
        // setView(false)
    }

    return (
    <Dialog open={view} onOpenChange={setView} className="min-w-[600px]" >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Meet Link</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="flex border-2 px-2 py-2 gap-3 rounded-2xl">
                <img width={20}  src="/meet.png" alt="" />
                <input
                    id="link"
                    defaultValue={url}
                    readOnly
                    className="outline-none border-none w-[350px]"
                />
              </div>
            </div>
            <Button type="" onClick={copyOnClick} variant="outline" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" onClick={()=>setView(false)} variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>)
}