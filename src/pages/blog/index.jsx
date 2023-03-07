import { Nav } from "@/components/Nav";

const Blog = (props) => {
  return (
    <>
      <Nav />
      <ul>
        {props?.posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=6"
  );
  const data = await response.json();

  return {
    props: {
      posts: data,
    },
  };
}

export default Blog;
