import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(request: NextRequest, {params}: {params : Promise <{id:string} >}) {
    const { id } =  await params;

    if(!id){
        return NextResponse.json({error : "ID manquant"}, {status: 400})
    }

    try {
        await prisma.task.delete({
            where: { id: id},
        });
        return NextResponse.json({message: 'Tâche supprimé avec succès'});
    }catch (error){
        console.error("Échec de la suppression de la tâche:", error);
        return NextResponse.json({error: "Échec de la suppression de la tâche"}, {status: 500})
    }
}