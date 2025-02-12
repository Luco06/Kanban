import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
  }catch (error) {
    return NextResponse.json({error: "Erreur lo'rs du chargement des utilisateurs"}, {status:500})
  }
}

export async function POST(req: Request){
  const {name, avatar} = await req.json();
  try {
    const newUser = await prisma.user.create({
      data :{
        name,
        avatar
      },
    });
    return NextResponse.json(newUser, {status: 201});
  }catch (error){
    return NextResponse.json({error: "Erreur l'ors de la création d'un utilisateur"}, {status: 500})
  }
}