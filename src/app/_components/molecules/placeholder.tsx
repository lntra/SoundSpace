import Button from "../atoms/button"
import Barlist from "../atoms/barlist"

const PlaceholderComunidade = () =>{
    return <>
        <div className=" min-h-full	p-3 bg-indigo-50 rounded-[20px] border border-fuchsia-700 flex flex-col items-start justify-centers">
            <div className="text-gray-900 text-xl font-bold font-['Lato']">Destaques da Semana</div>
            <Barlist></Barlist>
            <Button></Button>
        </div>
    </>
}

export default PlaceholderComunidade