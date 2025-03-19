import React, { useState, useMemo } from 'react';
import { Film, Search, Play, Info, Star, Home } from 'lucide-react';

type Genre = 'comedy' | 'horror' | 'action' | 'romance';

interface MoviePreferences {
  genres: Genre[];
  rating: number;
}

interface Movie {
  id: number;
  title: string;
  genre: Genre;
  description: string;
  rating: number;
  platform: string;
  image: string;
}

const movies: Movie[] = [
  // Comedy Movies
  {
    id: 1,
    title: "Superbad",
    genre: "comedy",
    description: "Two high school friends embark on a wild night of adventure.",
    rating: 4,
    platform: "Netflix",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "The Hangover",
    genre: "comedy",
    description: "A group of friends wake up in Las Vegas with no memory of the previous night.",
    rating: 4,
    platform: "Amazon Prime Video",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Bridesmaids",
    genre: "comedy",
    description: "A comedy about a woman who competes with another bridesmaid for the title of maid of honor.",
    rating: 4,
    platform: "Hulu",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  },
  // Horror Movies
  {
    id: 4,
    title: "The Conjuring",
    genre: "horror",
    description: "A family is terrorized by a dark presence in their farmhouse.",
    rating: 5,
    platform: "Netflix",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Hereditary",
    genre: "horror",
    description: "A family unravels terrifying secrets after the death of their grandmother.",
    rating: 4,
    platform: "Amazon Prime Video",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALAAuAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EADkQAAEDAwIEBAQDCAEFAAAAAAEAAgMEESESMQUTQVEiMmFxFIGRoQYjsRUzQlJiwdHh8CRygqLx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQIAA//EABsRAQEBAQEBAQEAAAAAAAAAAAABEQIhEjFB/9oADAMBAAIRAxEAPwDyValJA9vDn6Lc+odpv/Kwb/U2WWF0VDURU8TRI17joDGhn1JSFH4ERDx+JyIucyJ0fR24xcq3NLGWCWMHlnqVmyTPcMDQ3ugo23pphI1w8XQbK98WXREtNwdweqzibPaTkdk3M0nSmJqCVul+EKOTL8IEklq/hmQN4tG1xIEjHNNu9rj9PuspSQSup5o5ozmN4c33CDHS8fo+HQ09MI5JH1pH5zjLi4vfHYbLCFm7FdHXTsqeEsdT8oQE6sMF9XW/rlc8/Sx+y1NCweNM4PdA9zem6EvLn+FTO8FHJ/ULfMrczai3FEm41OyUyYIliZbP4aoBVT1cpOKRgcW/zA3B+39lj38HzV3h8bpKWXxuY2xvpBOq3eyYE1VA+CZ2h4dv9FBNA07jT7JUbHuluHlw0l3i7AKvOXSP8LiFJRyRlm4I+SAhSgX/AIie91CSeypIgE6FpSWUkZ510XCuEzV/x0gm5UVLA18jm9zsFg0zNc7W+q6bgcwPFmSPuY5n2c2+Dp2BQw+P0X7H4TS0ck4kqJCZ5m2zECAGtJ74usIUrZWdvmui/FtBUxuhkqKnVUTNMksdsMGLC/XC58P0MWpQTNDdiFVkuH5CsTFV3nUiJoSUkycKiTRffCOzeo1IS4p2lTorSpDHGyFlTcRThxJabWOwOPY/VBVUoiqHRMcXAgFo9D1UJmbLExj9omDTbd2bn9Uzpnvbp6WV/Il8OxrWYuC/7Ia92lzYR5RkpmHr1ULpNbnOequSYn20CcFCSmuoOjcR2XU8Ijig/DAnjLnTTySMkb007Zt81yl1334EgpeIcGmimmYzk6nEuJAbm+UyGX1kVcFNRcHiEOl1TUl3MOrMTQbhoHrv64WGGA7La43NwkUwipXtkeH3Mmbhud/Uk3wsmBgdqbE8Fu+TlTYtJSUkD5NMpPyWfVFomcGjGo/qtJrCyXVfKpVEQ1uz5ce6ybFZoTpBJDJ6WTRLrvtke/RaNPUup5Kd+3Lfc/TKy4HNElyLjeyuOkGksaLkbkpLW4vRmQMqDE5zXj96+ckut6dFlBpaPEVdoGfGUrozK4crwsG49lQdHJqtKfF2CKaglfc6RsoVYmYGMv17KFoWSBJG5qApjU4SvfZJKMXfhae0LNmsja7rsmaRupmkOLRYWz5lFUFgLWtxYm/r2XXE6GX93qdgnDbdlXKlqDlrewyoSVF/SYpgnTIBFafAqwwyPp3WEdQ3Qb/zbD6rMKn4eLV9GXZHxEeP/IJMbvF4Kkct8vw7WgDQxjW5FvRZDvA/GPZavG6KdoNSzUYy/TnoR0WNoe7e6ldWhK6TSACT3CqV0Oiqc3PQ7/NW6NvLfnKh4qf+rcehaLLRlSydJJDGiB17K0btYS7Bzpv1KZgPp5bqOWUySaRkB2LK8TrU/D0nKncxx8L8OPbCuTQmtqQ6BmtzujQsvhrwNTSRq73V+PiX7MY98TtUzmkNFtr9fRQufipVMYxzmPH5h2HzWde26IzvcXPkOpx2KGT95p6JxNpgSkWnskMbqT09LpxkRUtO3GpC9od5cKWMFrG2TzPU1M1ze3f7KvG0SSknYdfZWHEtbYW8TCPb/artOmnkf3Gn5rpamK73anOcmSSXJRFMEikAsCAUtKXfEwlgLi2RrrD0IKB407LX4dAxpuBvZpKZC6LiktqB8BALWvL/AFyFyrngv8Isuh4qZGue7zNcOiwdLnP8un3U2On6eHzKvxN7ZZWluzQGgqcxk7GyoTuBk0g42+aIm0ASTAYunVYnVq2nba1/WxQNaxoaALEOtcgGyTneX3098IA79FVZM4fD46swT3Khe5znXJu/7Ip5CSHW0hzbX3whA6qc9IgzwO9MhBa+B9EbsGxFjbsg98464sljt6kfwncbfRED06beqH37blMT4r9EEgT263VmlOrTdVg0kgBlyTgAq82MUrWNOHGxPv2TLgzRvgeWEmzSSbA4v0/yoZoHmFkQsLEk+quRAcnU5+p7vKxp2yqbxK17dVyNXzWvWt8xVkhew2NiVEcGxwVtmie8DI0n+6h4jw4x07ZRbU24I9kNYzI2am8w+Qbd0zs7YUjA0u0yOLGdy252QmO+x1D+YYKwNbU9bvD3N5bT0Bysgs07dN/VXOGyWc6M4vsnm+tZ46CtkEzWtDAPms90P/LlTa9SUx5cN3brrfUzxnVVmnQME5cewWQW3fjurtTNZ4BNwMu7vP8AhVHPdI/IDfZcqvAHOBgJJykgYd59PXzJxk4620oST39sIhYiwNh9ykpHNLo4wWDVnrn6KRjNFzcEtsfKbKNrvztY205A79kb3aWYGxsc7gqgikw+zbWG1xlDs+5yfskTYWOTtdASpJyU7T4PbJ9UBRAIDQ4PCH1Akfs3NlcmpG1NW8hp5TdjfooaK0NKw3s5x3+y031ETXaGWzI4kX9cBTXTmIG0ogDXH+EhVKyZgq3GQXjcLttsb5+xV+vqWabOebjoAsmqcJGN5Y8ucrGxbbOXMOlw8PhOfMDt+n3QTyvkbpdcgtz7hVKYnWRY2c39P/ityytjDHN/MZJv3a5UllSjxOPTGU9ONT7HZS1YY4uLduyhgPjWGFJqjk0k3UlPJpla5FUMu7UFDYt2CzWOgjyLjbuq3EKm9xcWbm90qeYfD2uFl1Uplkdp8qu3xEQucXO1d9vROnDUlCjWSThJbWwG/wCvyRC97XyPKLbpt/6uvZODgn+LcnssTg2fn/mEnkf0/wAu33TDHp074Sue/pt0TrYZx+2/qhKd3+kyBSRNQqWlA13dtvZYLkriyjF8abD+60uCUE8nE6SV7tUV2SZb/DufssupcH09r5JJP0wui/D87nQU8TZuWNGh77jAyLKXSTayKt7a2snOwLyQBjF1C6mEbPE49kZi5NSAZ43uGTofcFSy+LdY4rU1g17SRqY67PUIJw0SObGTof42X6eiCQkO1NwhLtRH9Lr/AFW1IfNuoraXqdzxHqYRcEXHfIUTwmMnflmFDfxqYHwKKwG6WEJdNM9o8zcKFoRktLHWHmP+ELFrUyEUKIoSiETUkkkENr+v2Q3+2/qnJtumVAgUvkkP9fNK/wBt/VYmKYJ0ywpipYD5v+1ROU9GzVJbrZaiJng6DjbJ9L3U/DKprDyJ3DlOcDc4AyopDezBgnc91WIClTquN01FA6IwSmRxbd5IAAPYALIkeO4VOKWUnlueS5u182V6hoXSm8h8H83TZFVug5TTScxxA82/v/pQU2kD8wWBOb7q3UytEfLjP5QAYLjcDc/VZz36n38o7FZKSpDbNDyLtOm46qIhPIQxjbHVi+fYKNshVMmYfAoZCiDtLMIGjU/KzHd4W2G6TE0hu/Cdi38BnJEJOSWjEEkxSWxgnHp90xP+E5QuSSFu3punv/j5of77pf8APkswiUJS/tv6pLA6scPv8S3Bxe6rXWrStZBSOJH5jh4j2JR1cbmbUdS4N1tt4m7FQkHx4GBf5LQp6YStE0gxgW7q6YI4WOMeoPcPN1suV7jrOKpUtDE+WnkrZuRTNaTIer7C4A9yrVVxKJzeXA4mPo0M0taOwVT4drxd3NkkO1zhAKd72PlZG7lsIDiBhpN7X+h+i262K88hebu27BBaTHLbp9xutem4Xs6oxfYfzKWSGGG+kDw90fcb4YksdQ2NrnsOgCxvsq7bd1v6/CCQCHbg7LMraUNeZY/LuWhXz1qeucVX2bsQlHs5yFwRP8LbDfdWkCMKMKRaiGchRuQrRqZJJJICk9IJiEKMnCY/pv6pyUsZMknuAL9Nvms1HTR82Rrbb5PotaOAzO5YwC659lBSMbAPEPE4Z91pNbyrAbnYrl306ccpC5oFmizRsEPNLt+yieXXtY39lboqJ7hrkBt2sua9S8No3VcpZaQta0uLWsJLrfw+l+/RdpQ8Okpo3Oljaf3ejwiQxnOmzjbbF7nb1uFicPoJ3vIg1suPK24Lr9Bb9Dhdpw/gda7gM0hhkOnSGQm9nOF7Ot6X+qj6OOD4vDFDUvkgc4DU5oZI2xBHW9zcHK50ufVVAjbs4/ZdR+IuE1sWp9RDIyRzi57TG4Zv06G2PqFzrYn00MsmhwfbS3CrnP0WqtW+xfp8rcKFj+bE6M7tHhPcp5AXMyDk5UZPKeukiKqPGtwO2rdDIRrViZmlznDyuy1VCuscqdoRpmhOStWhFCkSmWakkmSSAJymSKFEf9JJJksS16bhYdwSLioMkg+IdC6Fsd/Kxrr3v11DosjpdbFPXavw/FwxnOZJ8W+d0rHC1nMa21u/hHVFpkXuIcMbR/iMcLMzniOpZEZNABudObA+vdW+KUbKJ8rGyTcyKokh/Mh0NeGGxc03OL2x/UPVUuLcVhq/xKOKshc2J9QyYxlwLhp03za38PZWOJ18fEJqiXTUvfJUPmHNk1Nia4kloHuRnbw7LlY6SrUHBmyspHicg1NLJUN1x+Bugvu0nV/Qc23cArfBqY1ENS4veOTDzbNbq1DU1ttx3VCLj8WijppYZJaaOlfTzxF+Jbuc9r2ixs5rnAgm/l3F0fDuKsoKarbJrJqacwhzTYtOprr/APr91PUMrSbVPp6+OngqJW3c0ElpY5pcADcX3F7bre/alXHS8Rp4a1zzSyO5zbaSfFp1NsdtVsHv7rhZeIxmrp6z857Wua53Nfd8habk32yfp1urc3Hoy7iRp4pGur3uLzJJfS3XrLGi3e2fTAFyp+GvS1xOunqeFftCeoef+p+H5YHUMDtV7/2VMU1PUUFRUmtlDadsTpgyEHzv02HiF7bna6p1HEoncHbRcp/M+KNRzLjTlmm1rXvje6hpuIxU3C+I0hY57qoRNa4EAM0PDtrZ+yucxN6RsjbNxDkCoaIuYRzrY0DJf7WF7KLilHLQcVqqKRwc+nlLXHo4DZ3zFre6koqplIypllD+c+MMiNmkDIJ1NIN8C3zKfjvF28TfTzRxGOZlOyKdxAIkc0adQsB0AHyVBocR4E1kVZpqXudRwwTl0selrxKGHS12o5HM22Oknosui4R8dw6aeleZamnmayWl0gaY3YDw6+RfBxi/ZXK/8Qx1wrYZIJnU08EDYWOlBdBNExrBI3FrENcCOurfAVXhFdHRSVUs0b3/ABFHNTEMcAbyN032N7b26lXEdKlTDFHPJyZDLC0kMlcLardbXP6qq4qWV1w0Nw3soXpBk10rJAJBJJ0lmf/Z"
  },
  {
    id: 6,
    title: "Get Out",
    genre: "horror",
    description: "A young African-American man uncovers a disturbing secret when he meets his white girlfriend's family.",
    rating: 5,
    platform: "Netflix",
    image: "data:image/jpeg;base64,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"
  },
  // Action Movies
  {
    id: 7,
    title: "Mad Max: Fury Road",
    genre: "action",
    description: "A post-apocalyptic action film set in a desert wasteland.",
    rating: 5,
    platform: "Hulu",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "John Wick",
    genre: "action",
    description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog.",
    rating: 4,
    platform: "Netflix",
    image: "https://images.unsplash.com/photo-1547499681-28dece7dba00?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Mission: Impossible - Fallout",
    genre: "action",
    description: "Ethan Hunt and his team race against time to prevent a global catastrophe.",
    rating: 5,
    platform: "Amazon Prime Video",
    image: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&w=800&q=80"
  },
  // Romance Movies
  {
    id: 10,
    title: "The Notebook",
    genre: "romance",
    description: "A romantic story of a couple who fall in love in the 1940s.",
    rating: 5,
    platform: "Netflix",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "La La Land",
    genre: "romance",
    description: "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.",
    rating: 4,
    platform: "Hulu",
    image: "https://images.unsplash.com/photo-1490971588422-52f6262a237a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "Pride & Prejudice",
    genre: "romance",
    description: "A classic tale of love and misunderstanding in 19th century England.",
    rating: 5,
    platform: "Netflix",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80"
  }
];

function App() {
  const [preferences, setPreferences] = useState<MoviePreferences>({
    genres: [],
    rating: 3
  });
  const [showFilters, setShowFilters] = useState(false);

  const genres: Genre[] = ['comedy', 'horror', 'action', 'romance'];

  const handleGenreToggle = (genre: Genre) => {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const resetFilters = () => {
    setPreferences({
      genres: [],
      rating: 3
    });
  };

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      if (preferences.genres.length > 0 && !preferences.genres.includes(movie.genre)) {
        return false;
      }
      return movie.rating >= preferences.rating;
    });
  }, [preferences]);

  const renderMoviesByGenre = (genre: Genre) => {
    const genreMovies = movies.filter(movie => movie.genre === genre);
    if (genreMovies.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {genre} Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genreMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  };

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105">
      <img 
        src={movie.image} 
        alt={movie.title}
        className="w-full aspect-[16/9] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{movie.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{movie.rating}/5</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">Available on {movie.platform}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <button className="bg-white text-black px-4 py-1 rounded-md flex items-center gap-1 hover:bg-gray-200 transition-colors">
                <Play className="w-4 h-4" />
                Play
              </button>
              <button className="bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700 transition-colors">
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style header */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-black to-transparent">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold">Movie Recommendations</h1>
          </div>
          <div className="flex items-center gap-4">
            {preferences.genres.length > 0 && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Return Home
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </header>

      {/* Filters panel */}
      <div className={`fixed inset-0 bg-black bg-opacity-90 z-40 transition-transform duration-300 ${showFilters ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-4 py-2 rounded-full transition-colors capitalize ${
                      preferences.genres.includes(genre)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Minimum Rating</h2>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={preferences.rating}
                onChange={(e) => setPreferences(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center mt-2">{preferences.rating} / 5</div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition-colors mt-8"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {preferences.genres.length === 0 ? (
            // Show movies grouped by genre when no filters are applied
            <>
              {genres.map(genre => renderMoviesByGenre(genre))}
            </>
          ) : (
            // Show filtered results when filters are applied
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Filtered Results
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({filteredMovies.length} titles)
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              {filteredMovies.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                  <p className="text-xl">No titles found</p>
                  <p className="mt-2">Try adjusting your filters to see more results</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;