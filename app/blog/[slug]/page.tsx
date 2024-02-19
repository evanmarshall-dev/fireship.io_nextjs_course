// If we want to change the caching behavior on this page we could export the dynamic variable saying 'forced-dynamic' to make sure that it always fetches the latest data.
// Or we could use the revalidate option to update the cache every n (420) seconds.
// ? export const dynamic = 'force-dynamic';
export const revalidate = 420;

// Typescript interface of post for the shape of the data we are fetching from on the server, which corresponds with the post object in /api/content/route.ts.
interface Post {
  title: string;
  content: string;
  slug: string;
}

// Whenever we use props in a component create a typescript interface named Props that is local to this file. This one has a params object that has the slug as the URL parameter from the directory structure we just created.
interface Props {
  params: { slug: string };
}

// * If you want to have several pages (i.e. blog posts), which do not get updated often and you want to statically generate said pages in advanced allowing them to be cached on a CDN for very fast page loads. This is more efficient than dynamic SSR, but we need to figure out how to generate the dynamic pages (which could be 10000 blog posts that we do not want to hardcode).
// * Solution is to export a function called generateStaticParams. This tells NextJS how to find the dynamic data so that it can be rendered in advance.
// It is good to use this with the above revalidate option for if the data ever does change. This is called INCREMENTAL STATIC GENERATION (ISR).
export async function generateStaticParams() {
  // Fetch the entire list of posts.
  const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
    (res) => res.json(),
  );

  // Returns an object with the parameters we want to render in advanced. This one will be an object with the slug values for the posts.
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Export the default server component and make sure it is an async function. The difference with this component is that it has params as a prop.
// If you want to opt out of typescript you can use the any prop below after {params}: but that is generally not a good practice.
export default async function BlogPostPage({ params }: Props) {
  // Inside the body of the component we can make a call to fetch to fetch data from the server.
  // We have a variable of posts that is typed as an array of Post objects then we await fetch to that URL.y default it will make a GET request and you need to make sure you use a full absolute URL as relative URLs will not work.
  // Once fetched we can use then to map it to JSON.
  const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
    (res) => res.json(),
  );
  // We can also control caching at the fetch call to always cache or never cache.
  // ? const posts: Post[] = await fetch('http://localhost:3000/api/content', {
  // ?   cache: 'no-cache',
  // ? }).then((res) => res.json());

  // We are looking for the post with the matching slug. We use the JS find method to find the matching slug in that data we just fetched.
  // exclamation used after the call is the non-null assertion operator in TS, which tells the compiler that we know for sure there will not be a null value and this prevents certain TS errors in the IDE.
  // Use the non-null assertion operator sparingly because a better option would be to check for a null values at runtime and then throw an error if you cannot find the data you are looking for. In the site it is dangerous to use this because we will receive a runtime error if we go to a non-existent slug.
  const post = posts.find((post) => post.slug === params.slug)!;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
