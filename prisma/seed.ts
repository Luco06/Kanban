import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user =   await prisma.user.create({
        data :{
            name : "John Doe",
            avatar: "../public/bobMartin.svg"
        }
    })

    await prisma.task.create({
        data :{
            title: "Persistance des données avec Prisma",
            description: "ça va fonctionné",
            status: "todo",
            createdById: user.id,  // L'utilisateur a créé la tâche
            assigneeId: user.id,
        }
    });
    console.log( "Données insérées avec relation")
}

main()
.catch((e)=> console.error(e))
.finally(async ()=> await prisma.$disconnect())