import React, { useCallback, useEffect, useRef } from 'react'

interface Props {
  audioSrc: string
  loadPlayer: boolean
  setLoadPlayer: React.Dispatch<React.SetStateAction<boolean>>
  isFetchingRecord: boolean
}

const AudioPlayer = ({
  audioSrc,
  loadPlayer,
  setLoadPlayer,
  isFetchingRecord,
}: Props) => {
  const player = useRef<HTMLAudioElement | null>(null)
  const reloadAudioPlayer = useCallback(() => {
    if (player.current) {
      player.current?.load()
    }
  }, [])
  useEffect(() => {
    if (loadPlayer && !isFetchingRecord) reloadAudioPlayer()
  }, [reloadAudioPlayer, loadPlayer, isFetchingRecord])
  return <audio ref={player} controls src={audioSrc} />
}

export default AudioPlayer
