import { readComponentSitesData, type ComponentSite } from "@/lib/component-sites";
import { getOgImage } from "@/lib/og-image";
import { AddGroupForm } from "@/components/add-group-form";
import { AddSiteForm } from "@/components/add-site-form";

type SiteWithImage = ComponentSite & { image: string | null };

export async function ComponentSitesSection() {
  const { groups, sites } = await readComponentSitesData();

  const sitesWithImages: SiteWithImage[] = await Promise.all(
    sites.map(async (site) => ({
      ...site,
      image: await getOgImage(site.url),
    }))
  );

  return (
    <section className="flex w-full flex-col gap-8">
      <AddGroupForm />
      {groups.map((group) => {
        const groupSites = sitesWithImages.filter((s) => s.group === group);

        return (
          <div key={group} className="flex flex-col gap-3">
            <h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {group}
            </h2>
            {groupSites.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {groupSites.map((site) => (
                  <a
                    key={site.url}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                  >
                    <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900">
                      {site.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={site.image}
                          alt={site.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-0.5 px-2.5 py-2">
                      <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                        {site.name}
                      </span>
                      <span className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                        {new URL(site.url).hostname}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : null}
            <AddSiteForm group={group} />
          </div>
        );
      })}
    </section>
  );
}
