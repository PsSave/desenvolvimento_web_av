import { useEffect, useState } from "react"

function App() {
  const [number, setNumber] = useState<number>(0)


  useEffect(() => {
    setTimeout(()=> {
      setNumber(number+1);
    }, 1100)
  }, [number]) 

  return (
    <>
      <div className="bg-slate-400 h-screen flex justify-center items-center selection:bg-none" >
        <p className="text-8xl font-semibold text-slate-200 drop-shadow-xl animate-bounce ">{number}</p>
      </div>
    </>
  )
}

export default App
