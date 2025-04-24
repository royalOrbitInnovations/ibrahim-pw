import Banner from "@/components/Banner";
import ScrollingText from "@/components/ScrollingText";

export default function page() {
  return (
    <div>
      <Banner />
      <ScrollingText text="courses" baseVelocity={200} size={5} />
      <div className="h-[100vh]"></div>
    </div>
  );
}
