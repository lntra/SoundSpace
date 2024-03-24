import Link from "next/link";
import DropdownBar from "../atoms/dropdown";
import SearchBar from "../atoms/search";
import LogoSoundSpace from "../atoms/soundspacelogo";

//use client 
const BarComponents = () =>{
    return <>
        <div className="flex justify-between py-4 px-4 bg-indigo-50">
            <DropdownBar></DropdownBar>
            <Link href="/pages/home" prefetch={false}>
                <LogoSoundSpace></LogoSoundSpace>
            </Link>
            <SearchBar></SearchBar>
        </div>    
    </>
}

export default BarComponents;