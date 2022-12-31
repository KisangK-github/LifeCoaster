import Link from "next/link";
import prisma from "../../lib/prisma";


async function fetchData() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return feed;
}

export default async function Page() {
  const postList = await fetchData();
  return (
    <div className="mt-5 grid w-full grid-cols-2">
      {postList.map((data, index) => (
        <div className="card m-5 bg-base-100 shadow-xl">
          <div className="card-body p-6 pt-5">
            <div className="flex justify-between">
              <Link href={`/${data.author?.name}/${index}`} className="card-title text-2xl">{data.title} </Link>
              <Link href={`/${data.author?.name}`} className="italic">{data.author?.name}</Link>
            </div>
            <p>{data.content}</p>
            <div className="border aspect-[21/5] w-full"/>
          </div>
        </div>
      ))}
    </div>
  );
}