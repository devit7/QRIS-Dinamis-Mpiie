"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import QrScanner from "qr-scanner"
import {
    decodeFromString,
} from '@/lib/qris-decoder'
import { useStore } from "@/lib/store/globalMerchant"

const formSchema = z.object({
    imageqrcode: z.file().max(3_000_000).mime(["image/jpeg", "image/png"])
})

export default function QrisDinamisFormImage() {
    const render = new FileReader();
    const [isLoading, setLoading] = useState<boolean>(false)
    const { setMerchant, setDecodedMerchant, setImageBase64 } = useStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageqrcode: undefined,
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            setLoading(true)
            //console.log(values)
            render.onload = (e) => {
                localStorage.setItem("file", e.target?.result as string)
            }

            render.readAsDataURL(values.imageqrcode)

            const result = await QrScanner.scanImage(values.imageqrcode)
            //console.log(result)

            if (result) {
                //reset all global state
                setMerchant("")
                setDecodedMerchant("")
                setImageBase64("")

                setMerchant(result)
                //decode
                const dfs = decodeFromString(result)
                const jsonParser = JSON.stringify(dfs,null,2) // Add indentation for pretty printing
                setDecodedMerchant(jsonParser) // simpant ke global state
            }
        } catch (e) {
            console.error('Failed to submit: ', e)
        } finally {
            setLoading(false)
            form.reset()
        }


    }

    return (
        <div className=" p-7 rounded-md border ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="imageqrcode"
                        render={({ field: { onChange, name, ref } }) => (
                            <FormItem>
                                <FormLabel className="font-semibold">QRIS Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        name={name}
                                        ref={ref}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            onChange(file)
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please insert your valid QRIS image.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} type="submit">{isLoading ? "Loading..." : "Submit"}</Button>
                </form>
            </Form>


        </div>
    )
}