export const IGDB_CHAMPS = `
  fields name,
   summary,
    cover.image_id,
    artworks.image_id, 
    screenshots.image_id, 
    videos.video_id,
    involved_companies.company.name,
    involved_companies.developer,
    rating,
    genres.name,
    platforms.name,
    first_release_date;
`;


export async function igdbFetch(body: string) {
  const res = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      "Authorization": `Bearer ${process.env.IGDB_TOKEN}`,
      "Accept": "application/json",
    },
    body,
  });
  if (!res.ok) throw new Error(`IGDB error: ${res.status} ${res.statusText}`);
  return res.json();
}

export function formatGame(game: any) {
  return {
    igdb_id:     game.id,
    nom:         game.name,
    description: game.summary ?? null,
    developpeur: game.involved_companies?.find((c: any) => c.developer)?.company?.name ?? null,
    sortie:      game.first_release_date
                   ? new Date(game.first_release_date * 1000).toISOString().split("T")[0]
                   : null,
    cover:       game.cover?.image_id
                   ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
                   : null,
    banner:      game.artworks?.[0]?.image_id
                   ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.artworks[0].image_id}.jpg`
                   : game.screenshots?.[0]?.image_id
                     ? `https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.screenshots[0].image_id}.jpg`
                     : null,
    screenshots: game.screenshots?.map((s: any) =>
                   `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${s.image_id}.jpg`
                 ) ?? [],
    videos:      game.videos?.slice(0, 3).map((v: any) =>
                   `https://www.youtube.com/embed/${v.video_id}`
                 ) ?? [],
    prix:        ((game.id % 80) + 9.99).toFixed(2),

    rating:      game.rating ? Math.round(game.rating)/10 : null,
    genres:      game.genres?.map((g: any) => g.name) ?? [],
    platforms:   game.platforms?.map((p: any) => p.name) ?? [],
  };
}