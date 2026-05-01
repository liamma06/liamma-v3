import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';

export default function Home() {
  return (
    <div className="pt-3">
      <div className="max-w-2xl">
        <div className="inline-grid group [&>*]:[grid-area:1/1] [&>*]:self-center [&>*]:transition-opacity [&>*]:duration-150">
          <h1 className="text-5xl font-[700] tracking-tight text-neutral-800 group-hover:opacity-0">
            Liam Ma
          </h1>
          <img
            src="/wiggle-name2.gif"
            alt="Liam Ma"
            className="opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{ width: 200 }}
          />
        </div>

        <p className="mt-3 text-base text-neutral-600">i build and Engineering @Western</p>

        <p className="mt-5 font-semibold text-base text-neutral-700">
          some things i've worked on
        </p>
        <ul className="mt-1 flex flex-col gap-1 text-base text-neutral-700">
          <li>
            &gt; prev at a edtech startup{" "}
            <img src="/vita-logo.webp" alt="Vita" className="w-4 h-4 rounded-sm inline align-middle mr-0" />
            <Link href="https://www.vitalearning.ca/" className="wiggle-link">Vita</Link>
          </li>
          <li>&gt; helped make a multimodel to predict video virality for{" "}
            <Link href="https://github.com/Western-Artificial-Intelligence/video-virality-predictor" className="wiggle-link">Western AI</Link>
          </li>
          <li>&gt; building {" "}<Link href="https://github.com/liamma06/LLM" className="wiggle-link">LLM</Link>  from first principles</li>
          <li>&gt; exploring storytelling through film & photo</li>
        </ul>
      </div>

      <p className="mt-20 font-semibold text-base text-neutral-700">Projects</p>
      <div className="mt-3 grid grid-cols-2 gap-5 max-w-3xl">
        <ProjectCard
          image=""
          title="Vibe Vids"
          href="https://github.com/liamma06/VibeVids"
          date="nov '25"
          description="Automates Instagram growth by using AI influencers to script, generate, and schedule short-form content."
        />
        <ProjectCard
          image="/projects/Spark-1-image.jpg"
          title="Care Bridge"
          href="https://github.com/liamma06/Spark"
          date="jan '26"
          description="A full-stack healthcare platform that transforms unstructured patient conversations into clinical timelines to streamline rural care coordination. Won at Spark Hacks 2026."
        />
        <ProjectCard
          image="/projects/TTIhomepage.png"
          title="Trash To Impress"
          href="https://github.com/liamma06/trashtoimpress"
          date="oct '25"
          description="Product designing tool for reusing waste materials, powered by Gemini and LangChain workflow. Submitted to Hack the Campus"
        />
      </div>
    </div>
  );
}
