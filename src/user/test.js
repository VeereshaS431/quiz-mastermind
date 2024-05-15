import { useEffect } from "react"

const Test=()=>{

    useEffect(()=>{
        fetchData()
      },[])
      const fetchData=async()=>{
        const db=getDatabase(app)
        const dbRef=ref(db, "quize/html");
        const snapshot= await get(dbRef);
        if(snapshot.exists()){
            const mydata=snapshot.val()
            console.log(mydata)
            const tempArry=Object.keys(mydata).map(each=>{
                return {
                    ...mydata[each],id:each
                }
            })
            console.log(tempArry)
            setRows(tempArry)
        }else{
            alert("No data")
        }
    }

    return(
        <h1></h1>
    )
}