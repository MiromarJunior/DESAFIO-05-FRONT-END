import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiTransferencia, getApiTransferenciaSaldo } from "./transferenciaService";
import { TextField } from "@mui/material";
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

}






export const Transferencia = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { idConta } = location.state as { idConta: number };
    const [lista, setLista] = useState<TransferenciaProps[]>([]);



    const buscaTransferencia = () => {
        const dados = {
            idConta,
            dataInicio: dataInicialRef.current?.value,
            dataFim: dataFinalRef.current?.value,
            nomeOperadorTransacao: nomeOperadorTransacaoRef.current?.value
        }

        getApiTransferencia<TransferenciaProps>(dados, "transferencia/conta").then((resp) => {
            setLista(resp ? resp : []);

        }).catch((error) => {
            console.error(error);
        })

    }
    const [saldo, setSaldo] = useState<number>(0);

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



    const dataInicialRef = useRef<HTMLInputElement>(null);
    const dataFinalRef = useRef<HTMLInputElement>(null);
    const nomeOperadorTransacaoRef = useRef<HTMLInputElement>(null);

    const saldoNoPerido = valorBR(lista.reduce((acc, v) => acc + v.valor, 0));
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
                    sx={{ minWidth: "30%", margin: "1rem" }}
                />

                <TextField
                    type="date"
                    inputRef={dataFinalRef}
                    label={"Data de Fim"}
                    variant="outlined" InputLabelProps={{ shrink: true }}
                    id="dataFim"
                    required
                    sx={{ minWidth: "30%", margin: "1rem" }}
                />

                <TextField
                    type="text"
                    inputRef={nomeOperadorTransacaoRef}
                    label={"Nome Do Operador Transacionado"}
                    variant="outlined" InputLabelProps={{ shrink: true }}
                    id="nomeOperadorTransacao"
                    required
                    sx={{ minWidth: "30%", margin: "1rem" }}
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
                            <th>Saldo Total : {valorBR(saldo)}</th>
                            <th>Saldo no Período Total :  {saldoNoPerido}</th>
                        </tr>
                        <tr>
                            <th>Data da Transferência</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Nome do Operador transacionado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((l) =>
                            <tr key={l.id}>
                                <td>{dataBRCompleta(l.dataTransferencia)}</td>
                                <td>{valorBR(l.valor)}</td>
                                <td>{l.tipo}</td>
                                <td>{l.nomeOperadorTransacao}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>



        </div>

    )
}