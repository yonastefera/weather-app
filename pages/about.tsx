import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg">About us content</span>
      <br />
      <Link href="/">Back to app</Link>
    </div>
  );
};

export default About;
