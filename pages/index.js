import Layout from "../components/Layout.component";
import Link from "next/link";
import Image from "next/image";
export default function Home({ pokemon }) {
  console.log(pokemon);
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">NexJS Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a
                className="border p-4 border-4 border-gray my-2"
                rel="noopener noreferrer"
              >
                <img
                  className="w-20 h-20 mr-3 captilize flex items-center text-lg bg-gray-200 rounded-md"
                  src={pokeman.image}
                  alt={pokeman.name}
                />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = index + 1;
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.log(err);
  }
}
