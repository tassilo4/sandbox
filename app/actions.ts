"use server";

import { revalidatePath } from "next/cache";
import {
  readComponentSitesData,
  writeComponentSitesData,
} from "@/lib/component-sites";

export type AddGroupState = {
  error?: string;
};

export async function addGroup(
  _prevState: AddGroupState,
  formData: FormData
): Promise<AddGroupState> {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { error: "Group name is required." };
  }

  const data = await readComponentSitesData();

  if (data.groups.includes(name)) {
    return { error: "That group already exists." };
  }

  data.groups.push(name);
  await writeComponentSitesData(data);

  revalidatePath("/");
  return {};
}

export type AddComponentSiteState = {
  error?: string;
};

export async function addComponentSite(
  group: string,
  _prevState: AddComponentSiteState,
  formData: FormData
): Promise<AddComponentSiteState> {
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!name) {
    return { error: "Name is required." };
  }

  try {
    new URL(url);
  } catch {
    return { error: "Enter a valid URL, including https://." };
  }

  const data = await readComponentSitesData();
  data.sites.push({ name, url, group });
  await writeComponentSitesData(data);

  revalidatePath("/");
  return {};
}
