import { Cpu, Shield, Zap, Terminal } from "lucide-react";

export default function HomeSections() {
  return (
    <div className="space-y-24 py-16">
      {/* ১. Features Section (বৈশিষ্ট্য) */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-secondary">DevAgent AI</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu className="w-8 h-8 text-accent" />,
              title: "Agentic Workflows",
              desc: "Autonomous AI agents that reason, plan, and execute complex coding tasks.",
            },
            {
              icon: <Shield className="w-8 h-8 text-accent" />,
              title: "Secure API Design",
              desc: "Enterprise-grade JWT authentication protecting your core endpoints.",
            },
            {
              icon: <Zap className="w-8 h-8 text-accent" />,
              title: "LLM Orchestration",
              desc: "Powered by Gemini 1.5 Flash for lightning-fast operations.",
            },
          ].map((feat, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#1E293B] rounded-custom border border-slate-700"
            >
              <div className="mb-4">{feat.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-slate-400 text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ২. Statistics Section (পরিসংখ্যান) */}
      <section className="bg-[#1E293B] py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "99.9%", label: "Agent Accuracy" },
            { val: "25M+", label: "Lines of Code Generated" },
            { val: "10k+", label: "Active Developers" },
            { val: "1.5s", label: "Average Response Time" },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl md:text-4xl font-extrabold text-secondary mb-1">
                {stat.val}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ৩. Testimonial Section (রিভিউ) */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Global Innovators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "CTO, TechNova",
              quote:
                "DevAgent transformed our deployment pipeline. The AI content and code alignment is pure magic.",
            },
            {
              name: "Rahat Karim",
              role: "Lead Dev, SoftMint",
              quote:
                "The LLM reasoning capabilities incorporated in the recommendation engine saved us hundreds of hours.",
            },
          ].map((test, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#1E293B] rounded-custom border-l-4 border-secondary"
            >
              <p className="italic text-slate-300 mb-4">"{test.quote}"</p>
              <div className="font-semibold">{test.name}</div>
              <div className="text-xs text-slate-500">{test.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ৪. FAQ Section (প্রশ্নোত্তর) */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How secure is the Agentic AI app?",
              a: "Every endpoint is guarded with state-of-the-art JWT authentication and custom route guards.",
            },
            {
              q: "Can I customize the AI prompt templates?",
              a: "Yes, our content generator supports custom prompting, adjustable lengths, and direct regeneration options.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#1E293B] rounded-custom border border-slate-700"
            >
              <h4 className="font-semibold text-lg mb-2 text-slate-200">
                {faq.q}
              </h4>
              <p className="text-slate-400 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ৫. Call to Action (CTA) Section */}
      <section className="max-w-6xl mx-auto px-4 text-center bg-gradient-to-r from-secondary to-primary p-12 rounded-custom border border-slate-700">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Unleash Agentic AI?
        </h2>
        <p className="text-slate-200 mb-6 max-w-xl mx-auto">
          Deploy production-ready models, manage workflows, and generate
          high-fidelity technical components instantly.
        </p>
        <button className="bg-accent hover:bg-emerald-600 text-primary font-bold px-8 py-3 rounded-custom transition-all duration-300">
          Get Started Free
        </button>
      </section>
    </div>
  );
}
