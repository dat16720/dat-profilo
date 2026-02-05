'use client'

import {
  ChevronLeft,
  Clock,
  FileText,
  Heart,
  ImageIcon,
  Info,
  MessageCircle,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  User,
  Volume2
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

export type MemoryItem = { id: number; title: string; date: string; desc: string }

export type FullMusicPlayerProps = {
  song: {
    id: string
    title: string
    artist: string
    coverUrl?: string | null
  }
  lyrics?: string | null
  quotes?: string[]
  memories?: MemoryItem[]
  album?: string
  releaseDate?: string
  description?: string
}

function formatTime(time: number) {
  if (!time || isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const DEFAULT_QUOTES = [
  'Cảm ơn bạn đã lắng nghe.',
  'Âm nhạc là ngôn ngữ của cảm xúc.',
  'Chúc bạn một ngày tốt lành.',
]

const DEFAULT_MEMORIES: MemoryItem[] = []

const TABS: { id: 'player' | 'lyrics' | 'gallery' | 'info' | 'quotes'; label: string; Icon: typeof Music2 }[] = [
  { id: 'player', label: 'Nhạc', Icon: Music2 },
  { id: 'lyrics', label: 'Lời bài', Icon: FileText },
  { id: 'gallery', label: 'Ảnh', Icon: ImageIcon },
  { id: 'info', label: 'Chi tiết', Icon: Info },
  { id: 'quotes', label: 'Lời nhắn', Icon: MessageCircle },
]

export function FullMusicPlayer({
  song,
  lyrics,
  quotes = DEFAULT_QUOTES,
  memories = DEFAULT_MEMORIES,
  album,
  releaseDate,
  description,
}: FullMusicPlayerProps) {
  const { data: session, status } = useSession()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'gallery' | 'info' | 'quotes'>('player')
  const [showQuote, setShowQuote] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const smoothRef = useRef<number[]>([])

  const streamUrl = `/api/music/${song.id}/stream`
  const isVip =
    session?.user?.vipUntil && new Date(session.user.vipUntil) > new Date()
  const canPlay = !!session

  const durationDisplay = formatTime(duration)

  useEffect(() => {
    const interval = setInterval(() => setShowQuote((p) => !p), 8000)
    return () => clearInterval(interval)
  }, [])

  const initAudioContext = useCallback(() => {
    if (!audioRef.current || analyserRef.current) return
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return
      const audioContext = new AudioContextClass()
      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => { })
      }
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(audioContext.destination)
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      analyserRef.current = analyser
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
      smoothRef.current = new Array(analyser.frequencyBinCount).fill(0)
    } catch {
      // Visualizer optional
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => {
      initAudioContext()
      setIsPlaying(true)
    }
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [initAudioContext, canPlay])

  // Fallback: cập nhật thời gian theo chu kỳ khi đang phát (tránh lỗi timeupdate không fire sau reload)
  useEffect(() => {
    if (!isPlaying || !canPlay) return
    const interval = setInterval(() => {
      const audio = audioRef.current
      if (audio && !isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime)
        if (audio.duration && !isNaN(audio.duration)) {
          setDuration((d) => (d && d > 0 ? d : audio.duration))
        }
      }
    }, 150)
    return () => clearInterval(interval)
  }, [isPlaying, canPlay])

  const VISUALIZER_HEIGHT = 72
  const BAR_COUNT = 64
  const SMOOTH = 0.35

  useEffect(() => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current || !isPlaying) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const w = canvas.parentElement?.clientWidth ?? window.innerWidth
      canvas.width = w
      canvas.height = VISUALIZER_HEIGHT
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      requestAnimationFrame(draw)
      analyserRef.current!.getByteFrequencyData(dataArrayRef.current! as Uint8Array<ArrayBuffer>)
      const data = dataArrayRef.current!
      const smooth = smoothRef.current
      const step = Math.max(1, Math.floor(data.length / BAR_COUNT))
      const barGap = 3
      const barTotalWidth = (canvas.width - (BAR_COUNT - 1) * barGap) / BAR_COUNT
      const barWidth = Math.max(2, barTotalWidth - barGap)
      const maxBarHeight = VISUALIZER_HEIGHT * 0.65
      const centerY = VISUALIZER_HEIGHT / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < BAR_COUNT; i++) {
        const idx = Math.min(i * step, data.length - 1)
        const v = data[idx]! / 255
        smooth[idx] = smooth[idx] !== undefined ? smooth[idx] * (1 - SMOOTH) + v * SMOOTH : v
        const normalized = Math.min(1, smooth[idx]!)
        const barHeight = 4 + normalized * maxBarHeight
        const x = i * (barTotalWidth + barGap)
        const y = centerY - barHeight / 2

        const gradient = ctx.createLinearGradient(x, 0, x + barWidth, 0)
        gradient.addColorStop(0, 'rgba(192, 132, 252, 0.35)')
        gradient.addColorStop(0.5, 'rgba(216, 180, 254, 0.6)')
        gradient.addColorStop(1, 'rgba(192, 132, 252, 0.35)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, 4)
        ctx.fill()
      }
    }
    draw()
    return () => window.removeEventListener('resize', resize)
  }, [isPlaying])

  const togglePlay = () => {
    if (!canPlay) return
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => { })
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) audioRef.current.currentTime = newTime
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const currentQuote = quotes[Math.floor(currentTime / 45) % quotes.length] ?? quotes[0]

  const bgImage = song.coverUrl || ''
  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative w-full h-[calc(100vh-60px)] overflow-hidden bg-zinc-950">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          filter: isPlaying ? 'brightness(0.25) blur(4px) saturate(0.7)' : 'brightness(0.4) blur(0px) saturate(1)',
        }}
      />
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/90 via-zinc-950 to-fuchsia-950/80" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"
        aria-hidden
      />

      {canPlay && (
        <audio ref={audioRef} crossOrigin="anonymous" src={streamUrl} preload="metadata">
          Trình duyệt không hỗ trợ audio.
        </audio>
      )}

      {/* Visualizer - elegant bar strip */}
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none opacity-90"
        style={{ height: VISUALIZER_HEIGHT }}
      />

      <div className="relative flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 pt-7">
          <Link
            href="/music"
            className="group flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
            Danh sách
          </Link>
          {status === 'authenticated' && (
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${isVip ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-white/90'}`}
            >
              {isVip ? 'VIP' : 'Demo'}
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center pt-16 gap-1">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === id
                ? 'bg-white/95 text-violet-900 shadow-lg shadow-violet-500/20'
                : 'text-white/80 hover:bg-white/15 hover:text-white'}`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-5 pt-28 pb-10 overflow-auto">
          {activeTab === 'player' && (
            <div className="flex flex-col items-center w-full max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center tracking-tight drop-shadow-lg">
                {song.title}
              </h1>
              <p className="text-lg text-white/70 mb-10 font-medium">{song.artist}</p>

              {/* Album art */}
              <div className="relative mb-10 shrink-0">
                <div
                  className={`relative w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden shadow-2xl transition-all duration-500 ${isPlaying ? 'shadow-violet-500/30 scale-[1.02]' : 'shadow-black/40'}`}
                  style={{
                    animation: isPlaying ? 'vinylSpin 18s linear infinite' : 'none',
                  }}
                >
                  {song.coverUrl ? (
                    <img src={song.coverUrl} alt="song-description" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center">
                      <Music2 className="w-16 h-16 text-white/90" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                {isPlaying && (
                  <div className="absolute -inset-1 rounded-2xl bg-violet-500/20 blur-xl animate-pulse" aria-hidden />
                )}
              </div>

              {!canPlay ? (
                <div className="w-full py-8 px-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                  <p className="text-white/80 mb-5 font-medium">Đăng nhập để nghe nhạc</p>
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent(`/music/${song.id}`)}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-violet-900 font-semibold hover:bg-white/95 transition-colors"
                  >
                    Đăng nhập
                  </Link>
                </div>
              ) : (
                <div className="w-full max-w-md space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/60 tabular-nums w-10 text-right">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer music-progress"
                      style={{
                        background: `linear-gradient(to right, rgba(192,132,252,0.9) 0%, rgba(192,132,252,0.9) ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%, rgba(255,255,255,0.15) 100%)`,
                      }}
                    />
                    <span className="text-xs text-white/60 tabular-nums w-10">{durationDisplay}</span>
                  </div>
                  <div className="flex items-center justify-center gap-8">
                    <button
                      type="button"
                      className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-all hover:scale-110"
                      aria-label="Trước"
                    >
                      <SkipBack className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="relative p-7 rounded-full bg-white text-violet-900 shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105 active:scale-95"
                      aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
                    >
                      {isPlaying && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-white/20" aria-hidden />
                      )}
                      {isPlaying ? (
                        <Pause className="w-8 h-8 relative" strokeWidth={2.5} fill="currentColor" />
                      ) : (
                        <Play className="w-8 h-8 relative ml-0.5" strokeWidth={2.5} fill="currentColor" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-all hover:scale-110"
                      aria-label="Sau"
                    >
                      <SkipForward className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-white/60 shrink-0" strokeWidth={2} />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer music-progress"
                      style={{
                        background: `linear-gradient(to right, rgba(192,132,252,0.8) 0%, rgba(192,132,252,0.8) ${volume * 100}%, rgba(255,255,255,0.12) ${volume * 100}%, rgba(255,255,255,0.12) 100%)`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'lyrics' && (
            <div className="w-full max-w-2xl py-8 px-4">
              <h2 className="text-xl font-bold text-white/95 text-center mb-6">Lời bài hát</h2>
              {lyrics?.trim() ? (
                <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                  <p className="text-white/90 whitespace-pre-line leading-loose text-center text-lg">
                    {lyrics.trim()}
                  </p>
                </div>
              ) : (
                <p className="text-white/50 text-center">Chưa có lời bài hát.</p>
              )}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="w-full overflow-y-auto py-8 px-4">
              <h2 className="text-xl font-bold text-white/95 text-center mb-8">Kỷ niệm</h2>
              {memories.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {memories.map((mem) => (
                    <div
                      key={mem.id}
                      className="group aspect-square rounded-2xl overflow-hidden bg-white/5 backdrop-blur border border-white/10 flex flex-col items-center justify-center p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <Heart className="w-9 h-9 text-fuchsia-400/90 mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                      <p className="text-white font-semibold text-sm text-center">{mem.title}</p>
                      <p className="text-white/50 text-xs mt-1">{mem.date}</p>
                      <p className="text-white/60 text-xs text-center mt-2">{mem.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-center">Chưa có ảnh kỷ niệm.</p>
              )}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="w-full max-w-2xl py-8">
              <h2 className="text-xl font-bold text-white/95 text-center mb-8">Thông tin bài hát</h2>
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Music2 className="w-5 h-5 text-violet-300" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Tên bài</p>
                    <p className="text-white font-semibold">{song.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <User className="w-5 h-5 text-violet-300" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Nghệ sĩ</p>
                    <p className="text-white font-semibold">{song.artist}</p>
                  </div>
                </div>
                {album && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Music2 className="w-5 h-5 text-violet-300" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">Album</p>
                      <p className="text-white font-semibold">{album}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Clock className="w-5 h-5 text-violet-300" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Thời lượng</p>
                    <p className="text-white font-semibold">{durationDisplay}</p>
                  </div>
                </div>
                {releaseDate && (
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Clock className="w-5 h-5 text-violet-300" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">Phát hành</p>
                      <p className="text-white font-semibold">{releaseDate}</p>
                    </div>
                  </div>
                )}
                <div className="pt-5 border-t border-white/10">
                  <p className="text-white/70 leading-relaxed">
                    {description ?? `${song.title} – ${song.artist}. Nghe demo miễn phí, nâng cấp VIP để nghe bản đầy đủ.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="w-full max-w-2xl py-8 flex flex-col items-center">
              <h2 className="text-xl font-bold text-white/95 mb-8">Lời nhắn</h2>
              <div
                className="rounded-2xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 backdrop-blur-xl border border-white/10 p-8 md:p-12 min-h-44 flex items-center justify-center w-full transition-opacity duration-500"
                style={{ opacity: showQuote ? 1 : 0.9 }}
              >
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-center font-medium">
                  &quot;{currentQuote}&quot;
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 mt-8 w-full">
                {quotes.map((q, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-4 text-white/70 text-sm transition-all cursor-default"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .music-progress::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(192, 132, 252, 0.6);
          transition: transform 0.15s ease;
        }
        .music-progress::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .music-progress::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(192, 132, 252, 0.6);
        }
      `}} />
    </div>
  )
}
