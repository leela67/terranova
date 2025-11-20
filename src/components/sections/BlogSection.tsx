import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { terranovaAPI } from '@/services/api';
import type { Blog } from '@/types/api';

const BlogSection = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await terranovaAPI.getBlogs({ page: 1, limit: 3 });
        setPosts(blogs.slice(0, 3));
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-24 section-elevated">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-overline text-text-muted mb-4 tracking-widest">
            Latest Insights & Market Trends
          </p>
          <h2 className="heading-lg text-text-primary font-serif">
            Real Estate Tips & Expert Advice
          </h2>
        </motion.div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* FIXED: use post.id instead of post.slug */}
                  <Link to={`/blog/${post.id}`} className="group block">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                      
                      {/* Post Image */}
                      <div className="relative overflow-hidden aspect-[3/2]">
                        <img
                          src={post.cover_image_url || '/images/placeholder.jpg'}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-text-muted">
                          <Calendar className="h-4 w-4" />
                          <time className="text-sm">{formattedDate}</time>
                        </div>

                        <h3 className="text-lg font-semibold text-text-primary mb-4 group-hover:text-primary-600 transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <div className="flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
                          <span className="mr-2">Read More</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link to="/blog" className="btn-primary">
            View All
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default BlogSection;
