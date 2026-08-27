import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Heart, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import scene01 from "@/assets/scene-01-home.png";
import scene02 from "@/assets/scene-02-childhood-garden.png";
import scene03 from "@/assets/scene-03-childhood-room.png";
import scene04 from "@/assets/scene-04-laughter.png";
import scene05 from "@/assets/scene-05-growing-up.png";
import scene06 from "@/assets/scene-06-teenage.png";
import scene07 from "@/assets/scene-07-life-forward.png";
import scene08 from "@/assets/scene-08-distance.png";
import scene09 from "@/assets/scene-09-invisible-thread.png";
import scene10 from "@/assets/scene-10-raksha-bandhan.png";
import scene11 from "@/assets/scene-11-rakhi-closeup.png";
import sweets from "@/assets/scene-12-sweets.png";
import laughter from "@/assets/scene-12-laughter.png";
import photographs from "@/assets/scene-12-photographs.png";
import dinner from "@/assets/scene-12-family-dinner.png";
import scene13 from "@/assets/scene-13-letter.png";
import scene14 from "@/assets/scene-14-future.png";
import scene15 from "@/assets/scene-15-memory-book.png";
import scene16 from "@/assets/scene-16-final.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forever Rakhi Bond — A Cinematic Story" },
      { name: "description", content: "A cinematic journey through a brother and sister's lifelong Rakhi bond." },
      { property: "og:title", content: "Forever Rakhi Bond" },
      { property: "og:description", content: "A cinematic journey through a brother and sister's lifelong Rakhi bond." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CinematicStory,
});

type SceneProps = {
  image: string;
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "right" | "center";
  tone?: "light" | "dark";
  index: string;
};

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function StoryScene({ image, eyebrow, title, body, align = "left", tone = "light", index }: SceneProps) {
  const { ref, visible } = useReveal();
  const alignment = align === "center" ? "scene-copy--center" : align === "right" ? "scene-copy--right" : "scene-copy--left";
  return (
    <section ref={ref} className={`story-scene ${visible ? "is-visible" : ""}`} aria-label={`${index}. ${title}`}>
      <img className="scene-image" src={image} alt="" loading="lazy" width={1920} height={1088} />
      <div className="scene-shade" />
      <div className={`scene-copy ${alignment} ${tone === "dark" ? "scene-copy--dark" : ""}`}>
        {eyebrow ? <p className="scene-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {body ? <p className="scene-body">{body}</p> : null}
      </div>
      <span className="scene-number" aria-hidden="true">{index}</span>
    </section>
  );
}

function MemoryMontage() {
  const { ref, visible } = useReveal();
  const moments = [
    { src: sweets, alt: "A festive plate of Indian sweets", label: "A little sweetness" },
    { src: laughter, alt: "Brother and sister laughing together", label: "A lot of laughter" },
    { src: photographs, alt: "Old family photographs", label: "Stories retold" },
    { src: dinner, alt: "Family gathered for dinner", label: "Home, again" },
  ];

  return (
    <section ref={ref} className={`montage ${visible ? "is-visible" : ""}`} aria-labelledby="montage-title">
      <header className="montage-heading">
        <p className="scene-eyebrow">One day. A thousand memories.</p>
        <h2 id="montage-title">And just like that,<br /><em>the years disappeared.</em></h2>
      </header>
      <div className="montage-grid">
        {moments.map((moment, index) => (
          <figure className={`memory-frame memory-frame--${index + 1}`} key={moment.src}>
            <img src={moment.src} alt={moment.alt} loading="lazy" width={1024} height={1024} />
            <figcaption>{moment.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CinematicStory() {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="cinema">
      <div className="progress-rail" aria-hidden="true"><span style={{ "--progress": progress } as CSSProperties} /></div>
      <nav className="cinema-nav" aria-label="Story controls">
        <a href="#beginning" className="brand-mark"><Heart size={14} fill="currentColor" /> Forever Rakhi Bond</a>
        <button className="sound-control" type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Turn ambient sound on" : "Mute ambient sound"} title={muted ? "Sound on" : "Mute"}>
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </nav>

      <section id="beginning" className="hero-scene" aria-labelledby="hero-title">
        <img className="scene-image hero-image" src={scene01} alt="A sunlit family home with an old memory book and rakhi" width={1920} height={1088} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="scene-eyebrow">A story tied by love</p>
          <h1 id="hero-title">Forever<br /><em>Rakhi Bond</em></h1>
          <p className="hero-subtitle">Some bonds are not made in a moment.<br />They are woven through a lifetime.</p>
        </div>
        <a className="scroll-cue" href="#childhood"><span>Begin the story</span><ChevronDown size={18} /></a>
      </section>

      <StoryScene image={scene02} eyebrow="Chapter one · Childhood" title="Before we knew what forever meant…" body="We were already living it." align="right" index="01" />
      <div id="childhood" />
      <StoryScene image={scene03} eyebrow="The smallest battles" title="We fought over everything." body="The last piece of chocolate. The window seat. Who started it first." align="left" index="02" />
      <StoryScene image={scene04} title="And somehow, we always ended up laughing." align="right" index="03" />
      <StoryScene image={scene05} eyebrow="Chapter two · Growing up" title="The room changed. So did we." body="Toys became books. Secrets became dreams. Time kept moving." align="left" index="04" />
      <StoryScene image={scene06} title="Some conversations needed no words." body="You always knew when to sit beside me." align="left" index="05" />
      <StoryScene image={scene07} eyebrow="Chapter three · Life moves forward" title="Then one day, the road called." body="Different cities. New beginnings. The same home behind us." align="left" index="06" />
      <StoryScene image={scene08} title="Distance changed the view—never the bond." align="center" index="07" />
      <StoryScene image={scene09} eyebrow="An invisible promise" title="Between us, there was always a thread." body="Quiet. Unbroken. Stronger with every passing year." align="center" tone="dark" index="08" />
      <StoryScene image={scene10} eyebrow="Chapter four · Coming home" title="Every Rakhi, time found its way back." body="Back to the same room. The same smiles. The same promise." align="left" index="09" />
      <StoryScene image={scene11} title="A thread around the wrist. A lifetime around the heart." align="right" tone="dark" index="10" />
      <MemoryMontage />
      <StoryScene image={scene13} eyebrow="A letter never needed an address" title="No matter where life takes us…" body="You will always have a home in me." align="left" index="11" />
      <StoryScene image={scene14} eyebrow="Years from now" title="We will still be us." body="A little older. A little slower. Still laughing at the same old stories." align="left" tone="dark" index="12" />
      <StoryScene image={scene15} title="Every chapter kept the same thread." align="left" index="13" />

      <footer className="final-scene">
        <img className="scene-image" src={scene16} alt="A red and gold rakhi resting in golden light" loading="lazy" width={1920} height={1088} />
        <div className="final-copy">
          <Heart size={22} fill="currentColor" />
          <p>For every fight, every laugh,<br />every mile, every year.</p>
          <h2>Forever Rakhi Bond</h2>
          <span>Yesterday. Today. Always.</span>
        </div>
      </footer>
    </main>
  );
}
