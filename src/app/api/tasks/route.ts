import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET (){
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks);
    }catch (error){
        console.error("Erreur lors du chargement des tâches:", error);
        return NextResponse.json({error: "Erreur lors du chargement des tâches"})
    }
}

export async function POST(request: Request){
    const {title, description, status, createdById, assigneeId } = await request.json();
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                createdById,
                assigneeId
            },
        });
        return NextResponse.json(newTask, {status: 201});
    }catch (error) {
        console.error("Échec de la création de la tâche", error);
        return NextResponse.json({error: "Échec de la création de la tâche"}, {status: 500});
    }
}
