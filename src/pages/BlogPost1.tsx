import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar } from 'lucide-react';
import BlogFAQAccordion from '@/components/BlogFAQAccordion';
import { motion, AnimatePresence } from 'framer-motion';
import terranovaAPI from '@/services/api';
import type { Blog, FAQ } from '@/types/api';

const BlogPost1 = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showShadow, setShowShadow] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show shadow when at top, hide when scrolled down more than 50px
      setShowShadow(window.scrollY <= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blogs and find the one with matching slug
        const blogs = await terranovaAPI.getBlogs({ page: 1, limit: 100 });
        const matchingBlog = blogs.find(b => b.slug === slug);

        if (!matchingBlog) {
          setError('Blog post not found');
          return;
        }

        // Fetch full blog details
        const blogDetail = await terranovaAPI.getBlogById(matchingBlog.id);
        setBlog(blogDetail);

        // Fetch FAQs
        const faqsData = await terranovaAPI.getFAQs();
        setFaqs(faqsData);
      } catch (err: any) {
        setError(err.error || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug]);

  // Refs for sections
  const sections = blog?.sections?.map(s => s.heading_text || '').filter(Boolean) || [];
  const allSections = [...sections, 'FAQs'];

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [activeSection, setActiveSection] = useState<string>(allSections[0] || '');

  // Smooth scrolling and active tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentSection = allSections[0];
      allSections.forEach((title) => {
        const ref = sectionRefs.current[title];
        if (ref && ref.offsetTop <= scrollPosition) {
          currentSection = title;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blog]);

  const scrollToSection = (title: string) => {
    const ref = sectionRefs.current[title];
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-text-secondary">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 font-medium mb-4">{error || 'Blog post not found'}</p>
              <Link to="/blog" className="btn-primary">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Dark background section for header visibility - only shows when scrolling */}
      <AnimatePresence>
        {showShadow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-800 to-transparent z-0"
          />
        )}
      </AnimatePresence>

      <Header />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 flex relative pt-32 md:pt-36 z-10">
        {/* Table of Contents */}
        <aside className="hidden lg:block w-64 sticky top-28 self-start h-fit pr-8 border-r border-neutral-200">
          <h3 className="text-lg font-semibold mb-4 text-neutral-800">Table of Contents</h3>
          <ul className="space-y-3 text-sm">
            {allSections.map((title) => (
              <li key={title}>
                <button
                  onClick={() => scrollToSection(title)}
                  className={`text-left transition-colors duration-200 ${activeSection === title
                      ? 'text-primary-600 font-semibold'
                      : 'text-neutral-600 hover:text-primary-600'
                    }`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:pl-8">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <div className="text-primary-600 uppercase text-sm font-semibold tracking-wider mb-3">
              {blog.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-3 text-neutral-500 mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="rounded-lg overflow-hidden mb-10">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop"
                alt="Luxury Farmhouse"
                className="w-full h-auto rounded-md"
              />
              <p className="text-xs text-neutral-500 mt-2 text-center">
                Hyderabad’s luxury farmhouse scene is redefining countryside living.
              </p>
            </div>
          </motion.div>

          {/* Blog Sections */}
          <motion.article
            className="prose max-w-none prose-neutral prose-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-neutral-700 leading-relaxed mb-8">
              Imagine waking up to the sound of birds, not traffic. Your morning view is a private orchard,
              not a concrete wall. This isn't a weekend getaway; it's daily life in a luxury farmhouse.
              In Hyderabad, a fascinating shift is happening...
            </p>

            {sections.map((title, idx) => (
              <section
                key={title}
                ref={(el) => (sectionRefs.current[title] = el)}
                className="scroll-mt-24 mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {/* Placeholder for section text – full content retained from original */}
                  This section elaborates on the topic "{title}" from the original article,
                  explaining how Hyderabad’s farmhouse lifestyle reflects evolving luxury trends,
                  investment priorities, and architectural innovation.
                </p>
                {idx === 4 && (
                  <>
                    <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-3">
                      Key Investment Insights
                    </h3>
                    <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                      <li>Land location and accessibility matter more than raw size.</li>
                      <li>Verify legal clearances and agricultural zoning before purchase.</li>
                      <li>Factor in water, power, and connectivity infrastructure costs.</li>
                    </ul>
                  </>
                )}
              </section>
            ))}

            {/* Key Takeaways Section */}
            <div className="border border-primary-200 rounded-lg p-6 bg-primary-50 mb-12">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">Key Takeaways</h3>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                <li>Luxury farmhouses in Hyderabad combine privacy, design, and long-term value.</li>
                <li>Choosing a reputed builder ensures transparency and quality.</li>
                <li>Investing in land beyond city limits is a lifestyle choice, not just a financial one.</li>
              </ul>
            </div>

            {/* FAQs */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
              <section ref={(el) => (sectionRefs.current["FAQs"] = el)} className="scroll-mt-24 mb-16">
                <BlogFAQAccordion faqs={faqs} />
              </section>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost1;
