// @ts-nocheck

'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function Avatar({ userId }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    }
  )
  const [file, setfile] = useState([])
  const [avatarPath, setAvatarPath] = useState()
  const [publicUrlsArray, setPublicUrlsArray] = useState([])

  const handleFileSelected = (e) => {
    setfile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const filePathFolder = `${userId}/${Math.random()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePathFolder, file, {
        cacheControl: '3600',
        upsert: false,
      })
    if (error) throw new Error(error.message)

    setAvatarPath(data?.path)
  }

  useEffect(() => {
    listAllFileUrlsFromBucket()
  }, [avatarPath])

  async function listAllFileUrlsFromBucket() {
    const { data, error } = await supabase.storage
      .from('avatars')
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })
    if (error) throw new Error(error.message)

    const urls = await publicUrls(data)
    setPublicUrlsArray(urls)
    return urls

    async function publicUrls(data) {
      const urls = await Promise.all(
        data.map(async (file) => {
          const { data: fileData, error: fileError } = supabase.storage
            .from('avatars')
            .getPublicUrl(`${userId}/${file.name}`)

          if (fileError) throw new Error(fileError.message)
          return fileData.publicUrl
        })
      )
      const filteredUrls = urls.filter((url) => url !== null)
      return filteredUrls
    }
  }
  useEffect(() => {
    listAllFileUrlsFromBucket()
  }, [])
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="signUp-form"
        // style={{ display: publicUrlsArray.length < 3 ? 'flex' : 'none' }}
      >
        <h6 className="text-xl md:text-2xl">
          Upload 3 Fotos of yourself here:
        </h6>
        <input type="file" name="image" onChange={handleFileSelected} />
        <button type="submit" className="button-gray max-w-[300px]">
          Upload image
        </button>
      </form>
      <div style={{ display: publicUrlsArray.length > 0 ? 'flex' : 'none' }}>
        {publicUrlsArray.length > 0 &&
          publicUrlsArray.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index}`}
              style={{ width: '200px', height: '200px', margin: '5px' }}
              className="object-cover"
            />
          ))}
      </div>
    </div>
  )
}
