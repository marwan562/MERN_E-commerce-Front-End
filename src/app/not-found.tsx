"use client"
import LottieHandler from '@/components/Feedback/Lottiefiles/LottieHandler'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'

 
export default function NotFound() {
  return (
    <div>
      <LottieHandler type={"pageNotFound"} colorMessage='text-gray-600' message='Page Not Found.' Button={<Link href="/"><Button variant={"link"}> <Home className=' mr-2'/> Back To Home Page</Button></Link>}/>
    </div>
  )
}