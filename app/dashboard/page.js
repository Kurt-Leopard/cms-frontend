import axios from "axios";
export default async function Page() {
  const res = await axios.get(
    "https://mcmc-backend-1.onrender.com/api/leaders"
  );
  const posts = await res.data;

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts?.result.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.fullname}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
