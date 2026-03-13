'use client'

import { useEffect } from 'react'
import { viewAction } from '../_actions/viewAction'

export const ViewTracker = ({ projectId }: { projectId: string }) => {
  useEffect(() => {
    viewAction(projectId)
  }, [projectId])

  return null
}
