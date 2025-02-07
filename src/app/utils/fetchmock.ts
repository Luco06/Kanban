export const fetchTasks = async()=>{
    const res =  await fetch("/api/task")
    return res.json();
}