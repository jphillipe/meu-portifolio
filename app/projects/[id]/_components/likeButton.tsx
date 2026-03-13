'use client'

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toggleLikeAction } from '../_actions/likeAction'

export function LikeButton({
  projectId,
  initialLikes,
  initialHasLiked,
}: {
  projectId: string
  initialLikes: number
  initialHasLiked: boolean
}) {
  const [likesCount, setLikesCount] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(initialHasLiked)
  const [isPending, setIsPending] = useState(false)

  const handleLike = async () => {
    if (isPending) return

    setHasLiked(!hasLiked)
    setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1))

    setIsPending(true)

    try {
      await toggleLikeAction(projectId)
    } catch {
      setHasLiked(initialHasLiked)
      setLikesCount(initialLikes)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center gap-1.5 transition-colors ${
        hasLiked ? 'text-red-400' : 'text-zinc-500 hover:text-red-400'
      }`}
    >
      <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
      {likesCount}
    </button>
  )
}
