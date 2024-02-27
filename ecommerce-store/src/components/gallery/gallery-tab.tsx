import Image from "next/image"

import { Image as ImageEntity } from "@/entities/image"
import { TabsTrigger } from "@/components/ui/tabs"

interface GalleryProps {
  image: ImageEntity
}

export const GalleryTab = ({
  image
}: GalleryProps) => {
  return (
    <TabsTrigger
      className="p-0 border-2 data-[state=active]:border-primary"
      value={image.id}
    >
      <div className=" p-[2px] rounded-md">
        <Image
          alt="image"
          src={image.url}
          width={100}
          height={100}
        />
      </div>
    </TabsTrigger>
  )
}