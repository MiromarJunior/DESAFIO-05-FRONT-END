export const baseURL = "http://localhost:8080/";

export const valorBR = (data:number) => {
    if (data) {
      return data.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    } else {
      return " "
    }
  
  };

  export const dataBRCompleta = (data: string) => {
    const dataFormat = new Date(data);

    const dataBrFormatada = (
        dataFormat.getDate().toString().padStart(2, "0") +
        "/" +
        (dataFormat.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        dataFormat.getFullYear().toString()

        + " " +
        dataFormat.getHours().toString().padStart(2, "0")

        + ":" +
        dataFormat.getMinutes().toString().padStart(2, "0")


    );
    return dataBrFormatada;

};