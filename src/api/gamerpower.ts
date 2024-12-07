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
    "https://www.gamerpower.com/api/giveaways?type=game&platform=pc&status=active"
  ).then((response) =>
    response.json().then((data: gamerpowerResponse[]) => {
      return data;
    })
  );

  data.forEach((game: gamerpowerResponse) => {
    const tags = getTags(game.platforms);
    let platform: platform;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i][1]) {
        platform = tags[i][1]!;
        break;
      }
    }

    const title = convertTitle(game.title, platform!);

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

function convertTitle(title: string, platform: platform): string {
  const titleSplit = title.split(" ");
  let convertedTitle = "";
  titleSplit.forEach((word: string) => {
    let wordLower = word.toLowerCase();
    if (wordLower === platform || wordLower === `(${platform})`) return;

    convertedTitle += word;
  });

  return convertedTitle;
}

function getTags(platforms: string): [string, platform?][] {
  let tags: [string, platform?][] = [];

  platforms.split(", ");

  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i].replace("Store", "");
    const platformLower = platform.replace(" ", "").toLowerCase() as platform;
    let tag: [string, platform?] = [platform];

    if (platformsArray.indexOf(platformLower) != -1) {
      tag[1] = platformLower;
    }

    tags.push(tag);
  }

  return tags;
}
