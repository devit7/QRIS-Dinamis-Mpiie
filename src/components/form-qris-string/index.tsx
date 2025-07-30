"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { useStore } from "@/lib/store/globalMerchant"
import {
    decodeFromString,
} from '@/lib/qris-decoder'
import { useState } from "react"

const formSchema = z.object({
    stringqrcode: z.string().min(150, {
        message: "Nominal must be at least 2 characters.",
    }),
})

export default function QrisDinamisForm() {
    const [isLoading, setLoading] = useState<boolean>(false)
    const { setMerchant, setDecodedMerchant, setImageBase64 } = useStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stringqrcode: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        try {
            setLoading(true)
            //reset all global state
            setMerchant("")
            setDecodedMerchant("")
            setImageBase64("")

            setMerchant(values.stringqrcode)
            //decode
            const dfs = decodeFromString(values.stringqrcode)
            const jsonParser = JSON.stringify(dfs, null, 2) // Add indentation for pretty printing
            setDecodedMerchant(jsonParser) // simpant ke global state
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 " >
                <FormField
                    control={form.control}
                    name="stringqrcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" font-semibold">QRIS Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: 00020101021126640017ID.CO...." {...field} />
                            </FormControl>
                            <FormDescription>
                                Please enter valid QRIS code.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit"> {isLoading ? "Loading ..." : "Submit"}</Button>
            </form>
        </Form>
    </div>
)
}