
import { create } from "zustand";

interface StroreType{
    merchant : string,
    setMerchant : (dataMerchant: string) => void,
    decodedMerchant : string,
    setDecodedMerchant : (dataMerchant: string) => void,
    imageBase64 :string,
    setImageBase64 : (dataImage: string) => void,
    nominal: number,
    setNominal : (dataNominal : number) => void;
}

export const useStore = create<StroreType>((set) => ({
    merchant: "" ,
    setMerchant: (dataMerchant ) => set(() => ({merchant: dataMerchant})), // setLoading menerima satu parameter yaitu isLoading,
    decodedMerchant: "",
    setDecodedMerchant: (decodedDataMerchant) => set(() => ({decodedMerchant: decodedDataMerchant})),
    imageBase64: "",
    setImageBase64: (dataImage) => set(()=>({imageBase64: dataImage})),
    nominal: 0,
    setNominal: (dataNominal) => set(()=> ({nominal: dataNominal}))
}))

