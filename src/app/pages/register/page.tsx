import Link from "next/link";
import SymbolLogo from "../../_components/atoms/symbol";

const RegisterPage = () => {

    const background = {
        background: 'linear-gradient(90deg, #53337B 0%, #96429A 121.92%)'
    };

    return <>
        <div className="grid grid-cols-12 h-[100vh] font-['Lato']">
            <div className="col-span-5 flex flex-col items-center">
                    <div className="flex flex-wrap flex-col w-[75%] h-[100%] py-[76px] items-center">
                        <div className="h-2.5 w-[60%] rounded-[20px]" style={{background: `linear-gradient(270deg, #53337B -107.14%, #96429A 100%)`}}></div>
                        <div className=" mt-2 text-black text-4xl font-bold w-[100%] text-center">Criar Conta</div>
                        <div className="text-black text-center mt-2 text-3xl font-light">Preencha o formulário abaixo e clique em &quot;Registrar&quot; para criar sua conta. Estamos ansiosos para tê-lo conosco!</div>
                    
                        <form className="w-[100%]" action="#" method="">
                            <div className="w-[100%] p-[1px] mt-16 rounded-[20px]" style={{background: `linear-gradient(270deg, #53337B 0%, #96429A 100%)`}}>
                                <input placeholder="Email ou Usuário" type="text" className="pl-[40px] w-[100%] h-20 rounded-[20px] text-2xl font-light text-black bg-indigo-50"></input>
                            </div>
                            <div className="w-[100%] p-[1px] mt-8 rounded-[20px]" style={{background: `linear-gradient(270deg, #53337B 0%, #96429A 100%)`}}>
                                <input placeholder="Senha" type="text" className="pl-[40px] w-[100%] h-20 rounded-[20px] text-2xl font-light text-black bg-indigo-50"></input>
                            </div>
                            <div className="w-[100%] p-[1px] mt-12 rounded-[20px]" style={{background: `linear-gradient(270deg, #53337B 0%, #96429A 100%)`}}>
                                <button placeholder="Senha" type="submit" className="w-[100%] h-20 rounded-[20px] text-2xl font-light text-black bg-indigo-50">
                                    <p className="text-purple-900 text-2xl font-bold">Prosseguir</p>
                                </button>
                            </div>
                        </form>
                    
                        <div className="text-center mt-16">
                            <div className="text-black text-2xl font-light">Já possui uma conta?</div>
                            <Link prefetch={false} href="/pages/login" className="text-purple-900 text-2xl font-bold">Login</Link>
                        </div>
                        <div className="text-center mt-8">
                            <div className="text-black text-2xl font-light">Esqueceu a senha?</div>
                            <Link href="#" className="text-purple-900 text-2xl font-bold">Clique Aqui</Link>
                        </div>
                    </div>
            </div>
            <div className="absolute right-[5%] top-[5%]">
                    <p className="text-pink-200 text-opacity-30 text-[40px] font-black">Soundspace</p>
            </div>
            <div style={background} className="h-[100vh] col-span-7 grid grid-rows-auto grid-cols-5 justify-items-center content-center">
                <div className="col-start-2 col-end-5 row-start-2 row-end-5">
                    <SymbolLogo/>
                </div>
            </div>
            
        </div>
    </>
}

export default RegisterPage