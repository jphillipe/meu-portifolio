'use client'

import { useState, useRef } from 'react' // Adicionado useState
import Image from 'next/image' // Adicionado para o preview
import { CldUploadWidget } from 'next-cloudinary' // Adicionado componente do Cloudinary
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProjectAction } from '../_actions/addProjectAction'
import { useAction } from 'next-safe-action/hooks'
import { Loader2, UploadCloud } from 'lucide-react' // Adicionado UploadCloud
import { toast } from 'sonner'
import { ProjectWithYear } from './projects-tabs'
import { editProjectAction } from '../_actions/editProjectAction'
import { useTranslations } from 'next-intl'

type ProjectFormProps = {
  onSuccess?: () => void
  initialData?: ProjectWithYear
}

export function ProjectForm({ onSuccess, initialData }: ProjectFormProps) {
  const t = useTranslations('Admin')
  const inputClass =
    'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600'
  const MOCK_CATEGORIES = ['Front-end', 'Back-end', 'Full Stack', 'Mobile']

  const formRef = useRef<HTMLFormElement>(null)

  // ESTADO ADICIONADO: Guarda a URL da imagem atual
  const [uploadedImage, setUploadedImage] = useState(
    initialData?.imageUrl || '',
  )

  const createAction = useAction(createProjectAction)
  const editAction = useAction(editProjectAction)

  const isPending = createAction.isPending || editAction.isPending
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = initialData ? editAction.result : createAction.result

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (initialData) {
      formData.append('id', initialData.id)
    }

    const toastId = toast.loading(
      initialData ? t('toastUpdating') : t('toastSaving'),
    )

    const response = initialData
      ? await editAction.executeAsync(formData)
      : await createAction.executeAsync(formData)

    if (response?.data?.success) {
      toast.success(
        initialData ? t('toastUpdateSuccess') : t('toastCreateSuccess'),
        { id: toastId },
      )
      formRef.current?.reset()
      setUploadedImage('')
      if (onSuccess) onSuccess()
    } else {
      toast.error(t('toastSaveError'), { id: toastId })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-zinc-100">
          {initialData ? t('formEditTitle') : t('formNewTitle')}
        </h2>
        <Separator className="bg-zinc-800/50" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">{t('fieldTitle')}</Label>

            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              className={inputClass}
            />
            {result?.validationErrors?.title && (
              <p className="text-xs text-red-500">
                {result.validationErrors.title._errors}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">{t('fieldTitleEN')}</Label>

            <Input
              id="titleEN"
              name="titleEN"
              defaultValue={initialData?.titleEN ?? ''}
              className={inputClass}
            />
            {result?.validationErrors?.title && (
              <p className="text-xs text-red-500">
                {result.validationErrors.title._errors}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t('fieldCategory')}</Label>
            <Select
              name="category"
              defaultValue={initialData?.category || undefined}
            >
              <SelectTrigger
                id="category"
                className="bg-zinc-800/50 border-zinc-700 w-full text-zinc-100"
              >
                <SelectValue placeholder={t('selectPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                {MOCK_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-zinc-300">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {result?.validationErrors?.category && (
              <p className="text-xs text-red-500">
                {result.validationErrors.category._errors}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">{t('fieldTags')}</Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={initialData?.tags.join(', ')}
              placeholder={t('tagsPlaceholder')}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{t('fieldDescription')}</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description ?? ''}
            className={`${inputClass} min-h-30`}
          />
          {result?.validationErrors?.description && (
            <p className="text-xs text-red-500">
              {result.validationErrors.description._errors}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">{t('fieldDescriptionEN')}</Label>
          <Textarea
            id="descriptionEN"
            name="descriptionEN"
            defaultValue={initialData?.descriptionEN ?? ''}
            className={`${inputClass} min-h-30`}
          />
          {result?.validationErrors?.descriptionEN && (
            <p className="text-xs text-red-500">
              {result.validationErrors.descriptionEN._errors}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="repoUrl">{t('fieldRepo')}</Label>
            <Input
              id="repoUrl"
              name="repoUrl"
              defaultValue={initialData?.repoUrl || ''}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">{t('fieldLive')}</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              defaultValue={initialData?.liveUrl || ''}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('fieldCover')}</Label>

          <input type="hidden" name="imageUrl" value={uploadedImage} />

          <div className="flex items-center gap-4">
            {uploadedImage && (
              <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-zinc-700">
                <Image
                  src={uploadedImage}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <CldUploadWidget
              uploadPreset="meu-portifolio"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSuccess={(result: any) => {
                setUploadedImage(result?.info?.secure_url)
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => open()}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  {uploadedImage ? t('replaceImage') : t('uploadImage')}
                </Button>
              )}
            </CldUploadWidget>
          </div>
        </div>
        {/* -------------------------------------- */}

        <div className="flex items-center gap-3">
          <Switch
            id="featured"
            name="featured"
            value="on"
            defaultChecked={initialData?.featured}
          />
          <Label htmlFor="featured">{t('fieldFeatured')}</Label>
        </div>

        <Separator className="bg-zinc-800/50" />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            className="border-zinc-700 text-zinc-400"
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-white text-zinc-900 hover:bg-zinc-200"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> {t('saving')}
              </span>
            ) : initialData ? (
              t('saveChanges')
            ) : (
              t('createProject')
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
