import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(request: Request, { params } : {params : {id:string} }) {
    const { id } = params;

    try {
        await prisma.task.delete({
            where: { id: id},
        });
        return NextResponse.json({message: 'Tâche supprimé avec succès'});
    }catch (error){
        return NextResponse.json({error: "Échec de la suppression de la tâche"}, {status: 500})
    }
}