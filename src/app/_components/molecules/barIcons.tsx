import DropdownBar from "../atoms/dropdown";
import SearchBar from "../atoms/search";
import LogoSoundSpace from "../atoms/soundspacelogo";

const BarComponents = () =>{
    return <>
        <div className="flex justify-between py-4 px-4">
            <DropdownBar></DropdownBar>
            <LogoSoundSpace></LogoSoundSpace>
            <SearchBar></SearchBar>
        </div>    
    </>
}

export default BarComponents;