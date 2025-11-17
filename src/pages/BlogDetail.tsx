import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogFAQAccordion from "@/components/BlogFAQAccordion";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { terranovaAPI } from "@/services/api";
import type { Blog, FAQ } from "@/types/api";

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

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sections = blog?.sections?.map((s) => s.heading_text || "").filter(Boolean) || [];
  const allSections = [...sections, "FAQs"];

  const [activeSection, setActiveSection] = useState(allSections[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let current = allSections[0];
      allSections.forEach((title) => {
        const ref = sectionRefs.current[title];
        if (ref && ref.offsetTop <= scrollPosition) current = title;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  const scrollTo = (title: string) => {
    const ref = sectionRefs.current[title];
    if (ref)
      window.scrollTo({ top: ref.offsetTop - 100, behavior: "smooth" });
  };

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

  const formattedDate = new Date(blog.created_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* top shadow */}
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

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 flex pt-32 z-10">

        {/* TOC */}
        <aside className="hidden lg:block w-64 sticky top-28 pr-8 border-r">
          <h3 className="text-lg font-semibold mb-4">Contents</h3>
          <ul className="space-y-3 text-sm">
            {allSections.map((title) => (
              <li key={title}>
                <button
                  onClick={() => scrollTo(title)}
                  className={`${
                    activeSection === title
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

        {/* Main */}
        <div className="flex-1 lg:pl-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="text-primary-600 uppercase text-sm font-semibold mb-3">
              {blog.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

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

          {/* Sections */}
          {blog.sections?.map((sec) => (
            <section
              key={sec.id}
              ref={(el) =>
                (sectionRefs.current[sec.heading_text || ""] = el)
              }
              className="scroll-mt-24 mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {sec.heading_text}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {sec.section_content}
              </p>
            </section>
          ))}

          {/* FAQs */}
          <section
            ref={(el) => (sectionRefs.current["FAQs"] = el)}
            className="scroll-mt-24 mb-16"
          >
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
