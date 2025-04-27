import { workshops } from "@/data/workshops";
import Carousel from "./Carousel";
import ScrollingText from "./ScrollingText";
import { courses } from "@/data/courses";

export default function Section2() {
  return (
    <div className="pt-[10rem] min-h-[100vh]">
      <ScrollingText text="courses & workshops" baseVelocity={200} size={3} />
      <div className="px-[15rem]">
        <Carousel data={courses} linkText="Get Details" color="test" />
      </div>
      <div className="px-[15rem]">
        <Carousel data={workshops} linkText="Explore Workshop" />
      </div>
    </div>
  );
}
