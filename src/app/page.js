import Banner from "@/components/Banner";
import BlogCarousel from "@/components/Blogs";
import Books from "@/components/Books";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
      <BlogCarousel />
      <Footer />
    </div>
  );
}
