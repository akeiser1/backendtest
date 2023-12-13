import { faker } from '@faker-js/faker'; //make sure you install faker, dummy
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const genres = ["ROCK", "RAP", "COUNTRY", "KPOP", "HIPHOP", "RNB"];

async function seed() {
  try {
    for (let i = 0; i < 50; i++) {
      const albumName = faker.music.songName();
      const description = faker.commerce.productDescription();
      const artist = faker.person.firstName();
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const releaseDate = faker.date.past();
      const imageUrl = faker.image.urlLoremFlickr();

      await prisma.album.create({
        data: {
          name: albumName,
          description,
          artist,
          genre,
          release_date: releaseDate,
          imageURL: imageUrl,
        },
      });
      const albums = await prisma.album.findMany();
      console.log(albums);
    }
  } catch (error) {
    console.log(error);
  }
}

seed();