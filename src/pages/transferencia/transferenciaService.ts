import axios from "axios";
import { baseURL } from "../../service/serviceBanco";




export const getApiTransferencia = async(data:object,uri: string) => {
    try {
      const response = await axios.get(`${baseURL}${uri}`,{params : data});
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      console.error(error);
      alert(error);
      return false;
    }
  };
  

  export const getApiTransferenciaSaldo = async(data:object,uri: string) => {
    try {
      const response = await axios.get(`${baseURL}${uri}`,{params : data});
      return response.data as number;
    } catch (error) {
      console.error(error);
      alert(error);
      return false;
    }
  };

