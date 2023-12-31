"use client"

import Image from "next/image"
import { CldUploadWidget, CldUploadWidgetPropsOptions } from "next-cloudinary"

import { useMounted } from "@/hooks/use-mounted"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { textPtBr } from "@/configs/cloudinary/text-pt-br"

interface ImageUploadProps {
  value: string[]
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const options: CldUploadWidgetPropsOptions = {
  text: textPtBr,
}

export const ImageUpload = ({
  value,
  disabled,
  onChange,
  onRemove
}: ImageUploadProps) => {
  const { mounted } = useMounted()

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!mounted) return null

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(url => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Icons.trash className="w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>

      <CldUploadWidget options={options} onUpload={onUpload} uploadPreset="lnoometl">
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className="gap-2"
            >
              <Icons.imagePlus className="w-4 h-4" />
              <span>Carregar imagem</span>
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
