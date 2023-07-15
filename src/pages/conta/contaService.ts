import axios from "axios";
import { baseURL } from "../../service/serviceBanco";


export const getApiConta = async(uri: string) => {
    try {
      const response = await axios.get(`${baseURL}${uri}`);
      return response.data as boolean;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  