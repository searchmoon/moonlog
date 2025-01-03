import PostService from "@/services/post.service";
import dayjs from "dayjs";
import Image from "next/image";
import CustomMDX from "@/components/mdx-remote";

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const postService = new PostService();
  const paramId = (await params).id.split("-")[1];
  const post = await postService.getById(Number(paramId));

  const formattedDate = dayjs(post[0].created_at).format(
    "YYYY년 MM월 DD일 HH:mm"
  );

  const emptyImage =
    "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fparquet-empty-white-wall-27457060.jpg&type=sc960_832";

  return post.map((item) => (
    <div key={item.id} className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto bg-white shadow-md overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={item.thumbnail ? item.thumbnail : emptyImage}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 hover:opacity-90"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          {item.subtitle && (
            <h2 className="text-xl text-gray-600 mb-4">{item.subtitle}</h2>
          )}
          <time className="text-sm text-gray-500 mb-4 block">
            {formattedDate}
          </time>

          <div className="prose max-w-none">
            <CustomMDX source={item.content} />
          </div>
        </div>
      </article>
    </div>
  ));
};
export default PostDetailPage;
