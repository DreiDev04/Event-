"use client"
import React,{useState} from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const JoinInput = () => {
  const [values, setValues] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value)
  }

  return (
    <>
    <Input type="text" placeholder="enter code" onChange={handleChange} />
    <Button asChild>
      <Link href={`/home/joincreate/join/${values}`}>Join</Link>
    </Button>
    </>
  )
}

export default JoinInput