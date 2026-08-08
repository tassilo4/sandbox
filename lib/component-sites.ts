import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ComponentSite = {
  name: string;
  url: string;
  group: string;
};

export type ComponentSitesData = {
  groups: string[];
  sites: ComponentSite[];
};

const DATA_PATH = path.join(process.cwd(), "data", "component-sites.json");

export async function readComponentSitesData(): Promise<ComponentSitesData> {
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as ComponentSitesData;
}

export async function writeComponentSitesData(
  data: ComponentSitesData
): Promise<void> {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
