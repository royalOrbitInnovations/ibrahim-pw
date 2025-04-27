import Banner from "@/components/Banner";
import Books from "@/components/Books";
import Contact from "@/components/Contact";
import PodcastCarousel from "@/components/Podcasts";
import Section2 from "@/components/Section2";

export default function page() {
  return (
    <div>
      <Banner />
      <Section2 />
      <Books />
      <Contact />
      <PodcastCarousel />
    </div>
  );
}
