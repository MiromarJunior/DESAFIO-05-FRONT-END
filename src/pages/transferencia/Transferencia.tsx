import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getApiTransferencia } from "./transferenciaService";

interface TransferenciaProps{
    idConta:string;
    dataInicio:string;
    dataFim:string;
    nomeOperadorTransacao:string;
}




export const Transferencia = ()=>{
    const location = useLocation();
    const { idConta } = location.state as { idConta: number };
    const [lista,setLista] = useState<TransferenciaProps[]>([]);
    
    const buscaTransferencia = ()=>{
        const dados = {idConta,dataInicio:"2019-01-01",dataFim:"2019-05-04",nomeOperadorTransacao:""}

        getApiTransferencia<TransferenciaProps>(dados,"transferencia/conta").then((resp)=>{
           setLista(resp ? resp : []);

           
        }).catch((error)=>{
            console.log(error);
        })

    }

    console.log(lista);



    return(
       
        <div>
            <h1 className="titulo"> TRANSFERÊNCIAS</h1>
            <button onClick={buscaTransferencia} >busca</button>

        </div>
       
    )
}