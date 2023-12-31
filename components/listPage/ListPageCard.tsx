"use client";

import ListPageGraph from "./ListPageGraph";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import CommentIcon from "../../public/comment.svg";
import redHeartIcon from "../../public/heart_red.svg";
import outlineHeartIcon from "../../public/heart_outline.svg";
import { useSession } from "next-auth/react";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostDataType } from "../../lib/types";
import { eventsToNodes, randomName, timeSince } from "../../lib/helpers";
import Link from 'next/link';

export default function ListPageCard({
  data,
  handleChange,
  setIsModalOpen,
  setModalPostData,
}: {
  data: PostDataType;
  handleChange: (post: any) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalPostData: Dispatch<SetStateAction<PostDataType>>;
}) {
  const { data: session, status } = useSession();
  const colorTheme = "light";
  const router = useRouter();
  //const [isModalOpen, setIsModalOpen] = useState(false);

  function isHearted() {
    if (!session) return false;
    return data?.usersWhoHearted.includes(session?.user?.email as string)
      ? true
      : false;
  }
  function clickHandler() {
    // window.history.pushState(null, "LifeCoaster Post", `/p/${data?.id}`);
    // setModalPostData(data);
    // setIsModalOpen(true);
    //router.prefetch("p/6");
  }
  // function onModalClose() {
  //   router.back();
  //   setIsModalOpen(false);
  // }
  function heartHandler() {
    if (!session) {
      toast.info("Login to heart posts!", {
        containerId: "L",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const body = {
      email: session?.user?.email,
      postId: data?.id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch("/api/heart", options)
      .then((response) => response.json())
      .then((response) => {
        handleChange(response);
      })
      .catch((error) => console.log(error));
  }
  return (
    data && (
      <>
        <Tilt perspective={2000} tiltMaxAngleX={10} tiltMaxAngleY={10}>
          <div
            data-theme={colorTheme}
            className=" card card-compact bg-base-100  shadow-xl"
            style={{ borderRadius: "2rem", border: "2px solid #9bbaa4" }}>
            <Link href={`/p/${data.id}`} className={` relative h-56 w-full`}>
              <ListPageGraph data={eventsToNodes(data?.graph?.event)} />
            </Link>

            <div className="flex items-center justify-between p-2" style={{ borderBottomRightRadius: "2rem", borderBottomLeftRadius: "2rem", borderTop: "3px solid #9bbaa4" }}>
              {" "}
              <div className="flex flex-1">
                <Link href={`/p/${data.id}`}>
                  <Image
                    height={46}
                    width={46}
                    src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${data.user?.name}&radius=10`}
                    alt="avatar"
                  />
                </Link>
                <div className="flex flex-col pl-2">
                  <Link href={`/p/${data.id}`}
                    className="text-left text-lg text-inherit no-underline font-semibold leading-6">
                    {data.user?.name}
                  </Link>
                  <p className="text-gray-500">
                    {typeof data.createdAt === "string"
                      ? timeSince(new Date(data.createdAt))
                      : timeSince(data.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center">
                <p className="pr-1 text-xl font-medium">{data?.numOfHearts}</p>
                <button
                  onClick={heartHandler}
                  className="flex items-center justify-center">
                  <label
                    className={clsx(
                      "swap swap-flip",
                      isHearted() && "swap-active"
                    )}>
                    <Image
                      className={clsx("swap-off mr-2 inline")}
                      width={22}
                      height={22}
                      src={outlineHeartIcon}
                      alt="Heart"
                    />
                    <Image
                      className={clsx("swap-on mr-2 inline")}
                      width={22}
                      height={22}
                      src={redHeartIcon}
                      alt="Filled Heart"
                    />
                  </label>
                </button>
                <p className="pr-1 text-xl font-medium">
                  {data?.comments.length}
                </p>
                <Link href={`/p/${data.id}`} className="mr-1 inline">
                  <Image
                    // className="mr-1 inline"
                    width={20}
                    height={20}
                    src={CommentIcon}
                    alt="Comment Icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Tilt>
      </>
    )
  );
}
