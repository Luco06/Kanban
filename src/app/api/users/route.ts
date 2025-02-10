import { NextResponse } from "next/server";
import { users } from "@/app/mocks/Users";

export function GET () {
return NextResponse.json(users)
}