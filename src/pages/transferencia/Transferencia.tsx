import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiTransferencia, getApiTransferenciaSaldo } from "./transferenciaService";
import { Pagination, Stack, TextField, Typography } from "@mui/material";
import { dataBRCompleta, valorBR } from "../../service/serviceBanco";


interface ContaProps {
    idConta: number;
    nomeResponsavel: string;
    saldoTotal: number;
}

interface TransferenciaProps {
    
  
   conta: ContaProps;
    dataInicio: string;
    dataFim: string;
    nomeOperadorTransacao: string;
    dataTransferencia: string;
    id: number;
    tipo: string;
    valor: number;
    totalElements:number;


}





export const Transferencia = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { idConta } = location.state as { idConta: number };
    const [lista, setLista] = useState([]);

    const [page, setPage] = useState(1);
    
    const [totalPages,setTotalPages] = useState(1);
    const dataInicialRef = useRef<HTMLInputElement>(null);
    const dataFinalRef = useRef<HTMLInputElement>(null);
    const nomeOperadorTransacaoRef = useRef<HTMLInputElement>(null);
    const [saldo, setSaldo] = useState<number>(0);
    const saldoNoPerido = valorBR(lista.reduce((acc, v:TransferenciaProps) => acc + v.valor, 0));


  
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    
    };
    useEffect(() => {   
        if(lista.length > 0){
            buscaTransferencia();
        }       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [lista.length, page]);
      
console.log(lista)

    const buscaTransferencia = () => {
        const dados = {
            page: page -1 , size:10,
            idConta,
            dataInicio: dataInicialRef.current?.value,
            dataFim: dataFinalRef.current?.value,
            nomeOperadorTransacao: nomeOperadorTransacaoRef.current?.value            
        } 
        getApiTransferencia(dados, "transferencia/conta").then((resp) => { 
    
     
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setLista(resp.content);   
             
           // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
           setTotalPages(resp.totalPages)       
        }).catch((error) => {
            console.error(error);
        })

    }

    useEffect(() => {
        getApiTransferenciaSaldo({}, `transferencia/conta/saldo/${idConta}`).then((resp) => {
            setSaldo(resp ? resp : 0);
        })
            .catch((error) => {
                console.error(error);
            });
    }, [idConta]);

    const sairConta = () => {
        navigate("/conta");
    }

    return (

        <div className="container">
            <h1 className="titulo"> TRANSFERÊNCIAS</h1>
            <div className="botaoPesquisaTransferencia container">
                <button className="botaoSair" onClick={sairConta}>
                    SAIR
                </button>

            </div>

            <div className="formContainer container">
                <TextField
                    type="date"
                    inputRef={dataInicialRef}
                    label={"Data de Início"}
                    variant="outlined" InputLabelProps={{ shrink: true }}
                    id="dataInicial"
                    required                   
                    sx={{ minWidth: "25%", margin: "1rem" }}
                />

                <TextField
                    type="date"
                    inputRef={dataFinalRef}
                    label={"Data de Fim"}
                    variant="outlined" InputLabelProps={{ shrink: true }}
                    id="dataFim"
                    required
                    sx={{ minWidth: "25%", margin: "1rem" }}
                />

                <TextField
                    type="text"
                    inputRef={nomeOperadorTransacaoRef}
                    label={"Nome Do Operador Transacionado"}
                    variant="outlined" InputLabelProps={{ shrink: true }}
                    id="nomeOperadorTransacao"
                    required
                    sx={{ minWidth: "39%", margin: "1rem" }}
                />

            </div>


            <div className="botaoPesquisaTransferencia container">
                <button className="botaoPesquisa" onClick={buscaTransferencia}>
                    PESQUISAR CONTA BANCARIA
                </button>

            </div>

            <div className="container" style={{ width: "96.2%", marginLeft: "1.5%", marginTop: "1%" }}>
                <table className="table table-hover  table-bordered ">
                    <thead>
                        <tr>
                            <th colSpan={2}>Saldo Total : {valorBR(saldo)}</th>
                            <th colSpan={2}>Saldo no Período Total :  {saldoNoPerido}</th>
                        </tr>
                        <tr>
                            <th>Data da Transferência</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Nome do Operador transacionado</th>
                        </tr>
                    </thead>
                    <tbody>
                     
                        {
                        lista.map((l:TransferenciaProps) =>
                            <tr key={l.id}>
                                <td>{dataBRCompleta(l.dataTransferencia)}</td>
                                <td>{valorBR(l.valor)}</td>
                                <td>{l.tipo}</td>
                                <td>{l.nomeOperadorTransacao}</td>
                            </tr>
                            
                        )}
                    

                    </tbody>
                </table>
                <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination color="primary" count={totalPages} page={page} onChange={handleChange} />
    </Stack>

            </div>



        </div>

    )
}