import { platform, platformsArray } from "../components/gameCard/gameCard";

type gamerpowerResponse = {
  id: number;
  title: string;
  worth: string;
  thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  users: number;
  status: string;
  gamerpower_url: string;
  open_giveaway: string;
};

export type deal = {
  id: number;
  title: string;
  image: string;
  open_giveaway_url: string;
  end_date: string;
  tags: [string, platform?][];
};

export async function getDeals(): Promise<deal[]> {
  const deals: deal[] = [];

  const data: gamerpowerResponse[] = await fetch(
    "https://fly-alert-nicely.ngrok-free.app/api/get/deals",
    { headers: { "ngrok-skip-browser-warning": "2137" } }
  ).then((response) =>
    response.json().then((data: gamerpowerResponse[]) => {
      console.log(data);
      return data;
    })
  );

  data.forEach((game: gamerpowerResponse) => {
    const tags = getTags(game.platforms);
    let platform: platform | undefined = undefined;
    let platformName: string = "";
    for (let i = 0; i < tags.length; i++) {
      if (tags[i][1]) {
        platform = tags[i][1];
        platformName = tags[i][0];
        break;
      }
    }

    if (platform === undefined) return;

    const title = convertTitle(game.title, platformName);

    const deal: deal = {
      id: game.id,
      title: title,
      image: game.image,
      open_giveaway_url: game.open_giveaway_url,
      end_date: game.end_date,
      tags: tags,
    };

    deals.push(deal);
  });

  return deals;
}

function convertTitle(title: string, platform: string): string {
  // Escape the platform name for safe regex usage
  console.log(platform);
  const escapedPlatform = platform.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");

  // Create a regex that matches the platform, with or without parentheses
  const platformRegex = new RegExp(
    `(?:\\(${escapedPlatform}\\)|${escapedPlatform})`,
    "i"
  ); // Case-insensitive match

  // Search for the platform in the title
  const matchIndex = title.search(platformRegex);

  // If the platform is found, return the portion before the platform name
  if (matchIndex !== -1) {
    return title.slice(0, matchIndex).trim();
  }

  // If the platform isn't found, return the title as it is
  return title;
}

function getTags(platforms: string): [string, platform?][] {
  let tags: [string, platform?][] = [];

  let platformsSplit = platforms.split(", ");

  for (let i = 0; i < platformsSplit.length; i++) {
    const platform = platformsSplit[i].replace(" Store", "");
    const platformLower = platform.replace(" ", "").toLowerCase() as platform;
    let tag: [string, platform?] = [platform];

    if (platformsArray.indexOf(platformLower) != -1) {
      tag[1] = platformLower;
    }

    tags.push(tag);
  }

  return tags;
}
