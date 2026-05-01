"use client";

import { useRef, useState } from "react";

interface ProjectCardProps {
  image: string;
  video?: string;
  title: string;
  date: string;
  description: string;
  href?: string;
}

export function ProjectCard({ image, video, title, date, description, href }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const Wrapper = href ? "a" : "div";

  return (
    <div className="flex flex-col gap-2 transition-transform duration-200 ease-out hover:-translate-y-1">
      <Wrapper
        {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative overflow-hidden rounded-sm aspect-[3/2] bg-neutral-100 block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered && video ? "opacity-0" : "opacity-100"}`}
        />
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </Wrapper>
      <div className="flex justify-between items-baseline mt-1">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="wiggle-link text-sm font-medium text-neutral-800">{title}</a>
        ) : (
          <span className="text-sm font-medium text-neutral-800">{title}</span>
        )}
        <span className="text-xs text-neutral-400">{date}</span>
      </div>
      <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}
