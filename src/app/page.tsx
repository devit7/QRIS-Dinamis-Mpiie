'use client'
import QrisDinamisChange from "@/components/form-qris-change";
import QrisDinamisFormImage from "@/components/form-qris-image";
import QrisDinamisForm from "@/components/form-qris-string";
import JsonTemplate from "@/components/json-template";
import QrisImage from "@/components/qris-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store/globalMerchant"
import { generateJsonLd } from "@/lib/seo-utils"

export default function Home() {
  const { merchant } = useStore()

  // Generate JSON-LD for homepage
  const jsonLd = generateJsonLd({
    type: 'WebApplication'
  })

  return (
    <>
          <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full  lg:max-w-[1200px] flex lg:flex-row  flex-col justify-between mt-8 ">
        <div className=" w-full lg:w-[50%] px-10 lg:px-20 space-y-4">
          <Tabs defaultValue="account">
            <TabsList className="w-full">
              <TabsTrigger value="account">Text Code</TabsTrigger>
              <TabsTrigger value="password">Image</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <QrisDinamisForm />
            </TabsContent>
            <TabsContent value="password">
              <QrisDinamisFormImage />
            </TabsContent>
          </Tabs>
          <JsonTemplate />
        </div >
        <div className=" w-full lg:w-[50%] px-0 sm:px-5 lg:px-0 sm:mt-10 lg:mt-0">
          <div className=" flex flex-col gap-4">
            {/* Input Nominal */}
            {merchant ?
              (<QrisDinamisChange />)
              :
              <div className="p-7 rounded-md border text-center">
                Please Input Qris Code or Image
              </div>
            }
            {/* Image */}
            <QrisImage />
          </div>
        </div>
      </div >
    </>
  );
}
