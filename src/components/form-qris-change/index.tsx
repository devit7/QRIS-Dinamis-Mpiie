"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store/globalMerchant"
import qrisDynamicGenerator from "qris-dynamic-generator"

const formSchema = z.object({
    nominalqrcode: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),  
})

export default function QrisDinamisChange() {
    const { merchant, decodedMerchant, setImageBase64, setNominal } = useStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nominalqrcode: "" ,
        },
    })

    let merchantName = ""
    try {
        const parsedData = JSON.parse(decodedMerchant)
        merchantName = parsedData.merchant_name || "Unknown"
    } catch (error) {
        console.error("Error parsing decodedMerchant:", error)
        merchantName = "Invalid Data"
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        //console.log(values)
        const nominal = parseInt(values.nominalqrcode)
        const QRIS = new qrisDynamicGenerator(merchant)
        const QRISNewBarcode = await QRIS.generateBase64(nominal, 220);
        setNominal(nominal)
        setImageBase64(QRISNewBarcode)
    }

    return (
        <div className=" p-7 rounded-md border ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 " >
                    <div className=" font-semibold text-center">
                        Merchant : {merchantName}
                    </div>
                    <FormField
                        control={form.control}
                        name="nominalqrcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" font-semibold">Nominal</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ex : 2000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Generate</Button>
                </form>
            </Form>
        </div>
    )
}