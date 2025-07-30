import Image from "next/image";
import {  useState } from "react";
import html2canvas from 'html2canvas-pro';
import { useStore } from "@/lib/store/globalMerchant";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function QrisImage() {
    const { decodedMerchant, imageBase64, nominal } = useStore()
    const [isPrint, setPrint] = useState<boolean>(false)

    let merchantName = ""
    let merchant_id = ""
    let terminal_label = ""
    try {
        if (decodedMerchant !== "") {
            const parsedData = JSON.parse(decodedMerchant)
            merchantName = parsedData.merchant_name || "Unknown"
            merchant_id = parsedData.merchant_information_51.merchant_id || "Unknown"
            terminal_label = parsedData.additional_data_field?.terminal_label || ""
        }
    } catch (error) {
        console.error("Error parsing decodedMerchant:", error)
    }

    //currency
    const formattedCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(nominal);

    const handleGenerate = async () => {
        try {
            const element = document.getElementById('print');
            if (!element) {
                console.error("Element with id 'print' not found.");
                return;
            }
            const canvas = await html2canvas(element),
                data = canvas.toDataURL('image/jpg'),
                link = document.createElement('a');

            link.href = data;
            link.download = 'downloaded-image.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error("Failed to print :", e)
        } finally {
            setPrint(true)
        }
    }
    return (
        <div className="border rounded-md">
            <div className=" w-full items-center justify-between pt-5 px-5 inline-flex">
                <div className=" font-semibold">Preview </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={handleGenerate} className='p-2 hover:bg-muted rounded-sm cursor-pointer'>
                            {isPrint ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                </svg>
                            }
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isPrint ? "Already download" : "Download"}</p>
                    </TooltipContent>
                </Tooltip>


            </div>
            <div id="print" className="relative w-[350px] font-sans h-[450px] mx-auto my-2" >
                <Image width={794} height={1123} src="/template_qris.png" alt="QRIS Template" className="  w-full h-full block" />

                <div className="absolute top-[84px] left-1/2 -translate-x-1/2 text-black dark:text-black font-extrabold whitespace-nowrap overflow-hidden text-center text-[15px] w-[400px]">
                    {merchantName}
                </div>

                <div className="absolute top-[110px] left-1/2 -translate-x-1/2 text-black dark:text-black font-semi whitespace-nowrap overflow-hidden text-center text-[13px] w-[500px]">
                    NMID : {merchant_id}
                </div>

                <div className="absolute top-[135px] left-1/2 -translate-x-1/2 text-black dark:text-black font-semibold whitespace-nowrap overflow-hidden text-center text-[14px] w-[300px]">
                    {terminal_label ? (terminal_label+" | ") : ""} {formattedCurrency ?? ""}
                </div>

                <div className="absolute top-[160px] left-1/2 -translate-x-1/2 text-black dark:text-black font-semibold whitespace-nowrap overflow-hidden text-center text-[14px] w-[210px]">
                    {imageBase64 &&
                        <Image key={imageBase64} width={220} height={220} src={imageBase64} alt="QR Merchant" />
                    }
                </div>
            </div>
        </div >
    )
}