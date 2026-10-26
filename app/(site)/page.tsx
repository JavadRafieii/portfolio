import AboutSection from "@/components/sections/about-section/about-section";
import ExperienceSection from "@/components/sections/experience-section/experience-section";
import HeroSection from "@/components/sections/hero-section/hero-section";
import SkillsSection from "@/components/sections/skills-section/skills-section";
import ServicesSection from "@/components/sections/services-section/services-section";
import ProjectsSection from "@/components/sections/projects-section/projects-section";
import { getPortfolioProfile } from "@/lib/portfolio/data";
import VisitorComments from "@/components/sections/visitor-comments/visitor-comments";
import { getPortfolioReviews } from "@/lib/portfolio/reviews";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <PortfolioSections />
    </main>
  );
}

async function PortfolioSections() {
  // if (process.env.NODE_ENV === "development") {
  //   await new Promise((resolve) => setTimeout(resolve, 50_000));
  // }

  const [profile, comments] = await Promise.all([
    getPortfolioProfile(),
    getPortfolioReviews(),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={profile?.skills ?? []} />
      <ProjectsSection />
      <ExperienceSection experiences={profile?.experiences ?? []} />
      <ServicesSection items={profile?.workItems ?? []} />
      <VisitorComments comments={comments} />
    </>
  );
}