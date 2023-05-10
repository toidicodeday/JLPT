import React, { useCallback } from 'react'

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>
}

const useScrollToBottom = ({ scrollRef }: Props) => {
  return useCallback(() => {
    const ref: any = scrollRef.current
    if (ref) ref?.scrollToBottom()
  }, [scrollRef])
}

export default useScrollToBottom
