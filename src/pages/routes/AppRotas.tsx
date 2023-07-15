import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Conta } from "../conta/Conta"
import { Transferencia } from "../transferencia/Transferencia"

export const AppRotas = ()=>{
    return(
        <BrowserRouter>
        
        <Routes>
        <Route path="/*" element={<Conta/>}/>
        <Route path="/transferencia" element={<Transferencia/>}  /> 
        {/* <Route path="/*" element={<HomeInit/>}  /> 
        <Route path="/" element={<LoginUsuario/>}  />  */}
            {/* <Route path="/pessoaFisica" element={<PessoaFisica/>}  />         
            <Route path="/cadastroPessoaFisica" element={<CadastroPessoaFisica/>}  />         
            <Route path="/pessoaJuridica" element={<PessoaJuridica/>}  />         
            <Route path="/cadastroPessoaJuridica" element={<CadastroPessoaJuridica/>}  />          */}
          
        </Routes>
       
        
        </BrowserRouter>
    )
}