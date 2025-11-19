/** ------------- IMPORTS ------------- **/
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogFAQAccordion from "@/components/BlogFAQAccordion";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { terranovaAPI } from "@/services/api";
import type { Blog, FAQ } from "@/types/api";

/** 🔥 ADD: Convert headings to IDs so TOC can scroll */
const addHeadingIds = (htmlString: string) => {
  if (!htmlString) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  doc.querySelectorAll("h2").forEach((h2) => {
    const text = h2.textContent?.trim() || "";
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    h2.setAttribute("id", id);
  });

  return doc.body.innerHTML;
};

/** 🔥 Extract headings for TOC */
const extractHeadings = (htmlString: string | null): string[] => {
  if (!htmlString) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const h2Elements = doc.querySelectorAll("h2");

  return Array.from(h2Elements)
    .map((el) => el.textContent?.trim() || "")
    .filter(Boolean);
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShadow, setShowShadow] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShowShadow(window.scrollY <= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** ------------ LOAD BLOG DATA ------------ **/
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        if (!id) return setError("Invalid blog id");

        const detail = await terranovaAPI.getBlogById(Number(id));
        setBlog(detail);

        const faqData = await terranovaAPI.getFAQs();
        setFaqs(faqData);
      } catch (err: any) {
        setError(err.error || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /** ------------ Generate section list ------------ **/
  const detailHeadings = extractHeadings(blog?.detail_description || "");
  const sections = blog?.sections?.map((s) => s.heading_text || "") || [];

  const allSections = [...detailHeadings, ...sections, "FAQs"];

  const [activeSection, setActiveSection] = useState("");

  /** ------------ Scroll Highlighting ------------ **/
  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      allSections.forEach((title) => {
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const element = document.getElementById(id);
        if (!element) return;

        const top = element.getBoundingClientRect().top;

        if (top < 200) current = title;
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allSections]);

  /** ------------ Scroll To Section ------------ **/
  const scrollTo = (title: string) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const el = document.getElementById(id);
    if (!el) return;

    const offset = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  /** ------------ Loading & Error UI ------------ **/
  if (loading)
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-text-secondary">Loading blog...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  if (error || !blog)
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center max-w-md">
            <p className="text-red-800 mb-4">{error || "Blog not found"}</p>
            <Link to="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const detailHTML = addHeadingIds(blog.detail_description || "");

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top shadow */}
      <AnimatePresence>
        {showShadow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-800 to-transparent z-0"
          />
        )}
      </AnimatePresence>

      <Header />

      {/* GRID layout for sticky TOC */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[250px_1fr]
 pt-32 gap-10">
        {/*TOC*/}
        <aside className="hidden lg:block sticky top-24 self-start h-max border-r pr-6">
          <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
          <ul className="space-y-3 text-sm">
            {allSections.map((title) => (
              <li key={title}>
                <button
                  onClick={() => scrollTo(title)}
                  className={`w-full text-left ${activeSection === title
                      ? "text-primary-600 font-semibold"
                      : "text-neutral-600 hover:text-primary-600"
                    }`}
                >
                  {title}
                </button>

              </li>
            ))}
          </ul>
        </aside>

        {/*MAIN CONTENT*/}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="text-primary-600 uppercase text-sm font-semibold mb-3">
              {blog.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center gap-3 text-neutral-500 mb-6">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>

            {blog.cover_image_url && (
              <img
                src={blog.cover_image_url}
                className="rounded-lg mb-6"
                alt={blog.title}
              />
            )}
          </motion.div>

          {/*DETAIL DESCRIPTION*/}
          <section className="blog-content-detail mb-12">
            <div
              className="
   prose max-w-none

    /* H2 exact 30px */
    prose-h2:text-[30px!important]
    prose-h2:leading-[38px!important]
    prose-h2:font-bold
    prose-h2:text-neutral-900

    /* FIX strong inside h2 */
    [&_h2_strong]:text-[30px!important]
    [&_h2_strong]:font-bold

    /* paragraph styling */
    prose-p:text-neutral-700
    prose-p:text-[16px]
    prose-p:leading-[26px]
    prose-p:mb-4

    /* UL & LI */
    prose-ul:list-disc
    prose-ul:ml-6
    prose-li:my-1
  "
              dangerouslySetInnerHTML={{ __html: detailHTML }}
            />

          </section>

          {/*ADDITIONAL SECTIONS*/}
          {blog.sections?.map((sec) => {
            const id = sec.heading_text
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");

            return (
              <section key={sec.id} id={id} className="scroll-mt-24 mb-12">
                <h2 className="text-3xl font-bold mb-4">{sec.heading_text}</h2>
                <div
                  className="prose max-w-none text-neutral-700"
                  dangerouslySetInnerHTML={{ __html: sec.section_content || "" }}
                />
              </section>
            );
          })}

          {/*FAQ*/}
          <section id="faqs" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <BlogFAQAccordion faqs={faqs} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
