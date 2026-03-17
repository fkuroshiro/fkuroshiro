// src/pages/AnimeList.tsx
import { useState } from "react"
import Wrapper from "../components/Wrapper"
import { animeList, type AnimeStatus } from "../data/anime"

const statuses: AnimeStatus[] = ["Watching", "Completed", "Dropped", "Plan to Watch"]

const statusClasses: Record<AnimeStatus, string> = {
  "Watching":      "bg-ctp-blue/20 text-ctp-blue border-ctp-blue/30",
  "Completed":     "bg-ctp-green/20 text-ctp-green border-ctp-green/30",
  "Dropped":       "bg-ctp-red/20 text-ctp-red border-ctp-red/30",
  "Plan to Watch": "bg-ctp-surface1/20 text-ctp-subtext border-ctp-surface1/30",
}

export default function AnimeList() {
  const [activeStatus, setActiveStatus] = useState<AnimeStatus | "All">("All")
  const [search, setSearch] = useState("")

  const filtered = animeList.filter((anime) => {
    const matchesStatus = activeStatus === "All" || anime.status === activeStatus
    const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <section className="relative w-full min-h-screen py-32 bg-ctp-base flex justify-center">
      <Wrapper>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-ctp-text">
            <span className="font-mono mr-2 text-ctp-mauve">~/</span>
            Anime List
          </h1>
          <p className="mt-2 text-ctp-subtext">{animeList.length} anime tracked</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-none bg-ctp-surface0 border border-ctp-surface1 text-ctp-text placeholder:text-ctp-subtext focus:border-ctp-mauve/50"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStatus("All")}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors duration-200 ${
                activeStatus === "All"
                  ? "bg-ctp-mauve/20 text-ctp-mauve border-ctp-mauve/30"
                  : "bg-ctp-surface0 text-ctp-subtext border-ctp-surface1 hover:border-ctp-mauve/50"
              }`}
            >
              All ({animeList.length})
            </button>
            {statuses.map((status) => {
              const count = animeList.filter((a) => a.status === status).length
              if (count === 0) return null
              return (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors duration-200 ${
                    activeStatus === status
                      ? statusClasses[status]
                      : "bg-ctp-surface0 text-ctp-subtext border-ctp-surface1 hover:border-ctp-mauve/50"
                  }`}
                >
                  {status} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-ctp-subtext text-center py-20">No anime found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((anime) => (
              <div
                key={anime.id}
                className="bg-ctp-surface0 border border-ctp-surface1 rounded-xl overflow-hidden group hover:border-ctp-mauve/50 transition-all duration-300"
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <img
                    src={anime.cover}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-ctp-yellow text-xs font-bold px-2 py-1 rounded-lg">
                    ★ {anime.score}
                  </div>
                  <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-lg border ${statusClasses[anime.status]}`}>
                    {anime.status}
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <h3 className="text-ctp-text text-sm font-medium leading-tight line-clamp-2">
                    {anime.title}
                  </h3>
                  <p className="text-ctp-subtext text-xs">
                    {anime.episodesWatched}/{anime.totalEpisodes} eps
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {anime.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="text-xs text-ctp-mauve bg-ctp-mauve/10 border border-ctp-mauve/20 rounded-full px-2 py-0.5"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </Wrapper>
    </section>
  )
}