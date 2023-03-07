import { useRouter } from "next/router";

const BlogDetails = (props) => {
  const router = useRouter();
  const { blogId } = router.query;
  console.log(blogId);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{props.post.title}</h1>
    </div>
  );
};
export async function getStaticProps(context) {
  const { params } = context;
  console.log(params);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.blogId}`
  );
  const data = await response.json();

  return {
    props: {
      post: data,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { blogId: "1" } },
      { params: { blogId: "2" } },
      { params: { blogId: "3" } },
    ],
    fallback: true,
  };
}

export default BlogDetails;
