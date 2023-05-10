import { useCallback } from 'react'

interface DynamicParams {
  scrollRef: React.RefObject<HTMLDivElement>
}

function useCheckScrollBottom({ scrollRef }: DynamicParams): () => boolean {
  return useCallback(() => {
    let isBottom = true
    if (scrollRef && scrollRef?.current) {
      try {
        const ref = scrollRef.current
        isBottom = ref.scrollHeight <= ref.scrollTop + ref.clientHeight
      } catch (error) {
        // logger.error('OpenChannel | useCheckScrollBottom', error)
      }
    }
    return isBottom
  }, [scrollRef])
}

export default useCheckScrollBottom
