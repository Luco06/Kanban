import { NextResponse } from "next/server"
import { tasks } from "@/app/mocks/Tasks"

export async function GET (){
    return NextResponse.json(tasks)
}