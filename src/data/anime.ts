export type AnimeStatus = "Watching" | "Completed" | "Dropped" | "Plan to Watch"

export interface Anime {
  id: number
  title: string
  cover: string
  score: number
  status: AnimeStatus
  episodesWatched: number
  totalEpisodes: number
  genres: string[]
}

export const animeList: Anime[] = [
  {
    id: 1,
    title: "Charlotte",
    cover: "https://svetserialu.to/assets/img/uploads/posters/06d9e46e-d47d-11ec-b6b4-d1108c29dd94.jpg",
    score: 10,
    status: "Completed",
    episodesWatched: 14,
    totalEpisodes: 14,
    genres: ["Drama", "Fantasy"],
  },
  {
    id: 2,
    title: "Demon Slayer",
    cover: "https://svetserialu.to/assets/img/uploads/posters/db30042c-1063-11ef-9217-2942bf003cba.jpg",
    score: 9.5,
    status: "Completed",
    episodesWatched: 63,
    totalEpisodes: 63,
    genres: ["Action", "Fantasy"],
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    cover: "https://svetserialu.to/assets/img/uploads/posters/091ecfe6-eca2-11f0-b14d-bc24110e600c.jpg",
    score: 9,
    status: "Watching",
    episodesWatched: 58,
    totalEpisodes: 58,
    genres: ["Action", "Supernatural"],
  },
]