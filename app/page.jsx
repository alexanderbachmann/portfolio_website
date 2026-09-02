import Hero from '@/components/hero';
import BioGrid from '@/components/bio-grid';
import TechStack from '@/components/tech-stack';
import Experience from '@/components/experience';
import Projects from '@/components/projects';
import Accomplishments from '@/components/accomplishments';
import LatestWriting from '@/components/latest-writing';
import Contact from '@/components/contact';
import { getAllPosts } from '@/lib/posts';

/* ISR: the writing section reads from the database. Refreshed hourly and
   by every admin write (revalidatePath('/') in src/lib/admin/actions.js). */
export const revalidate = 3600;

export default async function HomePage() {
  let posts = [];
  try {
    posts = (await getAllPosts()).slice(0, 3);
  } catch (err) {
    console.warn('HomePage: latest writing unavailable,', err.message);
  }

  return (
    <main>
      <section id="about">
        {/* The line grid lives behind the hero only. */}
        <div className="bg-grid">
          <Hero />
        </div>
        <BioGrid />
      </section>

      <section id="skills">
        <TechStack />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="accomplishments">
        <Accomplishments />
      </section>

      <LatestWriting posts={posts} />

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
