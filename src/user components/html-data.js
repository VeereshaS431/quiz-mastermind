import { get, getDatabase, ref } from "firebase/database"
import { useCallback, useEffect, useState } from "react"
import { app } from "../firebase/firebaseConfig"

export const HtmlData = () => {
    const [data, setData] = useState([])
    const [index, setIndex] = useState(null)
    const [quiz, setQuiz] = useState({
        question: "",
        options: [],
        answer: "",
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const db = getDatabase(app)
        const dbRef = ref(db, "quize/html");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const mydata = snapshot.val()
            console.log(mydata)
            const tempArry = Object.keys(mydata).map(each => {
                return {
                    ...mydata[each], id: each
                }
            })
            console.log(tempArry)
            setData(tempArry)

            console.log(data)
        } else {
            alert("No data")
        }
    }

    const update = (index) => {
        setQuiz({
            question: data[index].question,
            options: data[index].options,
            answer: data[index].answer,
        })
    }

    const increment = () => {
        document.getElementsByClassName("options")[0].style.color = "black"
        document.getElementsByClassName("options")[1].style.color = "black"
        document.getElementsByClassName("options")[2].style.color = "black"
        document.getElementsByClassName("options")[3].style.color = "black"
        setIndex(index + 1)
        console.log(index)
        update(index)
    }

    const checkAnswer = (each, index) => {
        if (each === quiz.answer) {
            document.getElementsByClassName("options")[index].style.color = "green"
        } else {
            document.getElementsByClassName("options")[index].style.color = "red"
        }
    }
    console.log(index)
    console.log(quiz)
    return (
        <>
            {
                data.length === index ?
                    <>
                        <h1>result</h1>
                        <button onClick={() => {setIndex(0) 
                        update(0)
                        }}>Reset</button>
                    </>
                    :
                    <>
                        <button onClick={() => {setIndex(0)  
                            update(0)}}>start</button>
                        <div>
                            <h1>{quiz.question}</h1>

                            {
                                quiz.options.map((eachOption, index) => {
                                    return (
                                        <p className="options" onClick={() => { checkAnswer(eachOption, index) }}>{index + 1}.{eachOption}</p>
                                    )
                                })
                            }
                            {
                                index >= 0 && <button onClick={increment}>next</button>
                            }

                        </div>
                    </>
            }


        </>
    )
}