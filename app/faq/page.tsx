"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { FAQS_SEED, type FaqDTO } from "@/lib/faqs-seed";

type CategoryGroup = {
  category: string;
  questions: FaqDTO[];
};

const seedFaqs: FaqDTO[] = FAQS_SEED.filter((f) => f.published).map((f, i) => ({
  ...f,
  _id: `seed-faq-${i + 1}`,
}));

export default function FAQPage() {
  const { getSection } = usePageContent("faq");
  const hero = getSection("hero");
  const [faqs, setFaqs] = useState<FaqDTO[]>(seedFaqs);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.faqs) && data.faqs.length) {
          setFaqs(data.faqs);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped: CategoryGroup[] = useMemo(() => {
    const filtered = faqs.filter(
      (faq) =>
        searchTerm === "" ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const map = new Map<string, FaqDTO[]>();
    for (const faq of filtered) {
      const list = map.get(faq.category) || [];
      list.push(faq);
      map.set(faq.category, list);
    }
    return Array.from(map.entries()).map(([category, questions]) => ({
      category,
      questions,
    }));
  }, [faqs, searchTerm]);

  // FAQPage JSON-LD for visible FAQs
  const jsonLd = useMemo(() => {
    if (!faqs.length) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }, [faqs]);

  return (
    <div className="min-h-screen pt-24">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-black via-dark-gray to-black">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {hero?.fields?.heading || (
                <>
                  Frequently Asked{" "}
                  <span className="text-gradient-orange">Questions</span>
                </>
              )}
            </h1>
            <p className="text-2xl text-white/80 mb-8">
              {hero?.fields?.description ||
                "Find answers to common questions about garage door installation, repair, and service"}
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom max-w-4xl">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-white/50">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading FAQs…
            </div>
          ) : grouped.length === 0 ? (
            <div className="text-center py-16 text-white/50">
              No FAQs found. Try a different search.
            </div>
          ) : (
            grouped.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.05 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 text-orange">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item) => {
                    const isOpen = openId === item._id;
                    return (
                      <div
                        key={item._id}
                        className="rounded-xl glass-effect border border-white/10 hover:border-orange/30 transition-all overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenId(isOpen ? null : item._id || null)
                          }
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="text-lg font-semibold pr-8">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`w-6 h-6 text-orange flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-white/70 leading-relaxed border-t border-white/10 pt-4">
                            {item.answer}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <section className="section-padding bg-dark-gray">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              Still Have <span className="text-gradient-orange">Questions?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Our team is here to help. Contact us today for personalized answers
              and a free estimate.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+16472990283" className="btn-primary text-lg px-8 py-4">
                Call 647-299-0283
              </a>
              <a href="/contact" className="btn-outline text-lg px-8 py-4">
                Request Free Estimate
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
