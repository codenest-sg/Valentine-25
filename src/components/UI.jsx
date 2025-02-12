import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  "phy1",
  "phy2",
  "phy5",
  "phy4",
  "phy8",
  "phy9",
  "phy7",
  "phy12",
  "phy15",
  "phy14",
  "phy13",
  "cny",
  "phy10",
  "phy16",
  "phy17",
  "phy18",
  "phy19",
  "phy20",
  "phy21",
  "phy22",
  "phy25",
  "phy24",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "BookCoverBrown",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "BookBackBrown",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <a
          className="pointer-events-auto mt-10 ml-10"
        >
        </a>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center items-center">
          <div className="flex items-center justify-center gap-2 md:gap-4 p-4 md:p-10">
            {/* Previous Button */}
            <button
              className={`transition-all duration-300 px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-xl text-sm md:text-md lg:text-xl border w-20 md:w-28 lg:w-32 ${page === 0 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black/30 text-white"
                }`}
              onClick={() => page > 0 && setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>

            {/* Conditionally Render Go to Cover Button */}
            {page === pages.length && (
              <button
                className="text-sm md:text-lg ml-1 text-white underline"
                onClick={() => setPage(0)}
              >
                Main cover
              </button>
            )}

            {/* Display Current Page */}
            <div className="text-sm md:text-lg text-white">
              {page === 0 ? "Cover" : page === pages.length ? " " : `Page ${page}`}
            </div>

            {/* Next Button */}
            <button
              className={`transition-all duration-300 px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-xl text-sm md:text-md lg:text-xl border w-20 md:w-28 lg:w-32 ${page === pages.length ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black/30 text-white"
                }`}
              onClick={() => page < pages.length && setPage(page + 1)}
              disabled={page === pages.length}
            >
              Next
            </button>
          </div>
          {/* <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-xl  text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-xl  text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div> */}
        </div>
      </main>
    </>
  );
};
