import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import SiteBackdrop from "@/components/ui/SiteBackdrop";
import ScrollVideoHero from "@/components/hero/ScrollVideoHero";
import Navbar from "@/components/sections/Navbar";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import ContactVideoOrb from "@/components/ui/ContactVideoOrb";
import Footer from "@/components/sections/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <SmoothScroll>
      <SiteBackdrop />
      <Navbar t={t} lang={lang} />
      <main className="relative z-10">
        <ScrollVideoHero t={t} />
        <About t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Skills t={t} />
        <Education t={t} />
        <Contact t={t}>
          <ContactVideoOrb />
        </Contact>
      </main>
      <Footer t={t} />
    </SmoothScroll>
  );
}
