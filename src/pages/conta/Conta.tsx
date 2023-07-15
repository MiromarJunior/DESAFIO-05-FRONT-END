import TextField from "@mui/material/TextField/TextField"
import { useRef } from "react";
import { getApiConta } from "./contaService";
import { useNavigate } from "react-router-dom";


export const Conta = () => {
    const contaRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const buscaConta =  (e: React.FormEvent) => {
        e.preventDefault();
        const idConta:string = contaRef.current?.value || "";   
    
           getApiConta(`conta/${idConta}`).then((resp)=>{
            if(resp === true){
                navigate("/transferencia",{state:{idConta}});              
            }else{
                alert("Conta inválida !!!");
            }
            
           }).catch((error)=>{
            console.log(error);
           })
        
      };
    return (
        <div>
            <h1 className="titulo">INFORME O NR DA CONTA PARA ACESSAR</h1>

            <div className="centralizaDiv">
                <form onSubmit={buscaConta} id="formConta" >
                    <TextField
                        inputRef={contaRef}
                        label={"Nr Conta"}
                        variant="outlined" InputLabelProps={{ shrink: true }}
                        id="idConta"
                        type="number"
                        required
                       
                        inputProps={{ style: { textAlign: "right" } }}
                    />


                </form>
                <button form="formConta" type="submit" className="botaoPesquisa">
                    PESQUISAR CONTA BANCARIA
                </button>
            </div>
        </div>
    )
}