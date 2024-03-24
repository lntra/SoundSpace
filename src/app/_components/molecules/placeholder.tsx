import Button from "../atoms/button"
import Barlist from "../atoms/barlist"
import CommunityBackground from "../atoms/communitybackground"

const PlaceholderComunidade = () =>{
    return <>
        <CommunityBackground>
            <div className="text-gray-900 text-xl font-bold font-['Lato']">Destaques da Semana</div>
            <Barlist></Barlist>
            <Button></Button>
        </CommunityBackground>
    </>
}

export default PlaceholderComunidade