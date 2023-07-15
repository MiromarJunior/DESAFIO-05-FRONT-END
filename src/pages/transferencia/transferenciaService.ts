import axios from "axios";
import { baseURL } from "../../service/serviceBanco";




export const getApiTransferencia = async<T>(data:object,uri: string) => {
    try {
      const response = await axios.get(`${baseURL}${uri}`,{params : data});
      return response.data as T[];
    } catch (error) {
      console.error(error);
      alert(error);
      return false;
    }
  };
  