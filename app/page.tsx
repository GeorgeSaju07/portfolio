"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

type Portfolio = {
  name: string;
  title: string;
  hero: {
    tagline: string;
    stats: { number: string; label: string }[];
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  skills: {
    categories: {
      title: string;
      skills: { name: string }[];
    }[];
  };
  projects: {
    title: string;
    type: string;
    problem: string;
    github: string;
  }[];
  contact: {
    message: string;
    email: string;
    linkedin: string;
    github: string;
    resume: string;
  };
};

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ================= COMPONENT ================= */

export default function Home() {
  const [data, setData] = useState<Portfolio | null>(null);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;

  return (
    <main className="bg-[#0f172a] text-[#e2e8f0] min-h-screen">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-700 z-50 px-10 py-4 flex justify-between">
        <h1 className="font-bold">{data.name}</h1>
        <div className="flex gap-6 text-sm">
          <a href="#about" className="hover:text-sky-400">About</a>
          <a href="#skills" className="hover:text-sky-400">Skills</a>
          <a href="#projects" className="hover:text-sky-400">Projects</a>
          <a href="#contact" className="hover:text-sky-400">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-32 px-5">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-5xl font-bold"
        >
          {data.name}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-sky-400 mt-3 text-xl"
        >
          {data.title}
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-4 max-w-2xl mx-auto text-gray-400"
        >
          {data.hero.tagline}
        </motion.p>

        {/* CTA */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <a href={data.contact.resume} download className="bg-sky-400 text-black px-6 py-2 rounded-lg font-medium hover:bg-sky-300 transition">
            Download Resume
          </a>

          <a href={data.contact.linkedin} target="_blank" className="border border-sky-400 px-6 py-2 rounded-lg hover:bg-sky-400 hover:text-black transition">
            LinkedIn
          </a>

          <a href={data.contact.github} target="_blank" className="border border-gray-500 px-6 py-2 rounded-lg hover:bg-gray-700 transition">
            GitHub
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-5 py-20">
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" className="text-3xl mb-5">
          {data.about.title}
        </motion.h2>

        {data.about.paragraphs.map((p, i) => (
          <motion.p key={i} variants={fadeUp} initial="hidden" whileInView="show" className="mb-4 text-gray-400">
            {p}
          </motion.p>
        ))}
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-5 py-20">
        <h2 className="text-3xl mb-10">Tech Stack</h2>

        {data.skills.categories.map((cat, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" className="mb-8">
            <h3 className="text-lg text-sky-400 mb-4">{cat.title}</h3>

            <div className="flex flex-wrap gap-3">
              {cat.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-[#1e293b] px-4 py-2 rounded-full text-sm border border-gray-700 hover:border-sky-400 hover:text-sky-400 hover:scale-105 transition"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-5 py-20">
        <h2 className="text-3xl mb-10">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.03 }}
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 hover:border-sky-400 transition"
            >
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-gray-400 text-sm">{p.type}</p>

              <p className="mt-3 text-gray-300">{p.problem}</p>

              <a
                href={p.github}
                target="_blank"
                className="text-sky-400 mt-4 inline-block hover:underline"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="text-center py-20 bg-[#020617]">
        <h2 className="text-3xl">Let’s Work Together </h2>

        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
          {data.contact.message}
        </p>

        <a
          href={`mailto:${data.contact.email}?subject=Hiring%20Opportunity`}
          className="mt-6 inline-block bg-sky-400 text-black px-6 py-3 rounded-lg hover:bg-sky-300 transition"
        >
          Email Me
        </a>

        <div className="mt-6 flex justify-center gap-6">
          <a href={data.contact.linkedin} target="_blank" className="text-sky-400">LinkedIn</a>
          <a href={data.contact.github} target="_blank" className="text-sky-400">GitHub</a>
        </div>
      </section>

    </main>
  );
}