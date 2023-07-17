import Layout from "@/components/public/Layout";

export default function Home() {
  return (
      <h1>Home redir page In app/page.tsx</h1>
  );
}

export async function getStaticPaths() {
  return {
    paths: "mypage/my"
  }
}

// export async function getStaticProps({ params }) {
//   // Fetch necessary data for the blog post using params.id
// }