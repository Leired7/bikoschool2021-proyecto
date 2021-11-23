import React, { useEffect } from "react";
import { Meme } from "../../entities/Meme";
import { memeService } from "../../services/getMeme";
import { MemeDTO } from "../../entities/MemeDTO";
import { SearchInput } from "./SearchInput";
import { TitlePage } from "./TitlePage";

export const MemeList: React.FC = () => {
  const [titleMeme, setMeme] = React.useState<{ title: string }>();
  const [gifImage, setGifImage] = React.useState("");
  const [meme50, setMeme50] = React.useState<Meme[]>();
  useEffect(() => {
    setMeme(memeService.getMeme());
    setGifImage(memeService.getMeme()?.urlOriginal);
  }, []);

  useEffect(() => {
    memeService.api.memes().then((memes) => {
      const memesProperties: Meme[] = memes.map((meme: MemeDTO) => {
        return {
          title: meme.title,
          id: meme.id,
          url: meme.images.original.url,
          dateTime: meme.import_datetime,
          tags: meme.tags,
        };
      });
      setMeme50(memesProperties);
    });
  }, []);

  // useEffect(() => {
  //   const getMemes = async () => {
  //     const memes = await memeService.api.memes();
  //     setMeme50(memes);
  //   };
  //   getMemes();
  // }, []);

  // Realizar llamada a la API
  // Mapear la llamada al html

  return (
    <>
      {titleMeme && gifImage ? (
        <>
          <SearchInput />
          <TitlePage />
          <div>
            {meme50?.map((meme) => {
              return <img src={meme.url} alt={meme.title} id={meme.id}></img>;
            })}
          </div>
        </>
      ) : (
        <div>There are not availables gifs</div>
      )}
    </>
  );
};
