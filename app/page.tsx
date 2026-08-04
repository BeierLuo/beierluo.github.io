import profile from "../src/data/profile.js";
import now from "../src/data/now.js";
import experience from "../src/data/experience.js";
import projects from "../src/data/projects.js";
import workingPapers from "../src/data/workingPapers.js";
import writing from "../src/data/writing.js";
import site from "../src/data/site.js";
import renderHero from "../src/sections/hero.js";
import renderNow from "../src/sections/now.js";
import renderExperience from "../src/sections/experience.js";
import renderProjects from "../src/sections/projects.js";
import renderWorkingPapers from "../src/sections/workingPapers.js";
import renderWriting from "../src/sections/writing.js";
import renderFooter from "../src/sections/footer.js";

const content = [
  renderHero(profile),
  renderNow(now),
  renderExperience(experience),
  renderWorkingPapers(workingPapers),
  renderProjects(projects),
  renderWriting(writing),
  renderFooter(site),
].join("\n");

export default function Home() {
  return (
    <>
      <header className="site-nav" aria-label="Section navigation">
        <div className="site-nav-inner">
          <a className="site-brand" href="#hero">Bale Luo</a>
          <nav className="site-nav-links" aria-label="Directory">
            <a href="#hero">About</a>
            <a href="#research">Research</a>
            <a href="#education">Education</a>
            <a href="#working-papers">Working Papers</a>
            <a href="#publications">Publications</a>
            <a href="#writing">Blogs</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <div className="layout">
        <main
          className="page"
          aria-label="Beier personal site"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}
