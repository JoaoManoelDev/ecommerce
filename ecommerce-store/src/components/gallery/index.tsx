import Image from "next/image"

import { Image as ImageEntity } from "@/entities/image"
import { GalleryTab } from "./gallery-tab"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"

interface GalleryProps {
  images: ImageEntity[]
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <Tabs defaultValue={images[0].id} className="flex flex-col-reverse gap-y-8">
      <div className="flex">
        <TabsList
          className="h-full p-0 flex space-x-2 bg-background overflow-auto"
        >
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabsList>
      </div>
      
      {images.map((image) => (
        <TabsContent value={image.id} key={image.id}>
          <div
            className="aspect-square relative h-full w-full overflow-hidden
            rounded-xl "
          >
            <Image
              alt="image"
              src={image.url}
              fill  
              className="object-cover object-center"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
