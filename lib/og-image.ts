const OG_IMAGE_REGEX =
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i;

export async function getOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const html = await res.text();
    const match = html.match(OG_IMAGE_REGEX);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
