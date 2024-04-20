import { Blog } from "../hooks";
import { Appbar } from "./Appbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-10 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="pt-3 text-gray-500">Posted On 2nd Dec 2024</div>
            <div className="pt-3">{blog.content}</div>
          </div>
          <div className="col-span-4">hello</div>
        </div>
      </div>
    </>
  );
};
