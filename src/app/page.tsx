'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const templates = [
  { id: 'basic', name: 'Basic', description: 'Clean and simple' },
  { id: 'blog', name: 'Blog', description: 'Perfect for articles' },
  { id: 'product', name: 'Product', description: 'Showcase your product' },
  { id: 'social', name: 'Social', description: 'Quote style' },
  { id: 'minimal', name: 'Minimal', description: 'Typography focused' },
  { id: 'gradient', name: 'Gradient', description: 'Bold and colorful' },
];

const themes = [
  { id: 'dark', name: 'Dark' },
  { id: 'light', name: 'Light' },
];

export default function Home() {
  const [template, setTemplate] = useState('basic');
  const [title, setTitle] = useState('Your Amazing Title');
  const [subtitle, setSubtitle] = useState('A compelling subtitle goes here');
  const [author, setAuthor] = useState('');
  const [theme, setTheme] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const params = new URLSearchParams({
      template,
      title,
      theme,
      primaryColor,
    });
    if (subtitle) params.set('subtitle', subtitle);
    if (author) params.set('author', author);

    setImageUrl(`/api/v1/image?${params.toString()}`);
  }, [template, title, subtitle, author, theme, primaryColor]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg" />
            <span className="font-bold text-xl">OGSnap</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#pricing" className="text-slate-400 hover:text-white transition">Pricing</a>
            <a href="#docs" className="text-slate-400 hover:text-white transition">Docs</a>
            <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-medium transition">
              Get API Key
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            OG Images, Instantly
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Generate beautiful Open Graph images via API. 
            Perfect for blogs, SaaS, and social sharing.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition">
              Start Free →
            </button>
            <button className="border border-slate-700 hover:border-slate-600 px-6 py-3 rounded-lg font-medium transition">
              View Docs
            </button>
          </div>
        </section>

        {/* Live Playground */}
        <section className="container mx-auto px-6 py-12">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold mb-2">Try it live</h2>
              <p className="text-slate-400">Customize your image and see it update in real-time</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-0">
              {/* Controls */}
              <div className="p-6 border-r border-slate-800 space-y-6">
                {/* Template */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Template</label>
                  <div className="grid grid-cols-3 gap-2">
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={`p-3 rounded-lg text-left transition ${
                          template === t.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="font-medium text-sm">{t.name}</div>
                        <div className="text-xs opacity-70">{t.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter title..."
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter subtitle..."
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Author (optional)</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="Enter author name..."
                  />
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Theme</label>
                  <div className="flex gap-2">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex-1 p-2 rounded-lg text-center transition ${
                          theme === t.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Accent Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="p-6 bg-slate-950 flex flex-col">
                <label className="block text-sm font-medium text-slate-400 mb-3">Preview</label>
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full aspect-[1200/630] bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="OG Image Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                
                {/* API URL */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-400 mb-2">API URL</label>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm font-mono text-slate-300 overflow-x-auto whitespace-nowrap">
                      {typeof window !== 'undefined' ? `${window.location.origin}${imageUrl}` : imageUrl}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}${imageUrl}`)}
                      className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why OGSnap?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Edge-rendered images with global CDN caching. Sub-100ms response times.' },
              { icon: '🎨', title: 'Beautiful Templates', desc: '6 pre-built templates or bring your own HTML/CSS for full control.' },
              { icon: '💸', title: 'Simple Pricing', desc: 'Pay per image with no minimums. Start free, scale as you grow.' },
              { icon: '🔒', title: 'Secure', desc: 'API key authentication with usage limits and rate limiting built-in.' },
              { icon: '📊', title: 'Analytics', desc: 'Track which images are generating the most engagement.' },
              { icon: '🔗', title: 'Easy Integration', desc: 'One HTTP call. Works with any stack. SDKs for popular frameworks.' },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-center mb-12">Start free. Scale as you grow. No hidden fees.</p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '$0', images: '100', overage: '—', cta: 'Get Started' },
              { name: 'Starter', price: '$9', images: '5,000', overage: '$0.002', cta: 'Start Trial', popular: false },
              { name: 'Pro', price: '$29', images: '25,000', overage: '$0.001', cta: 'Start Trial', popular: true },
              { name: 'Scale', price: '$99', images: '100,000', overage: '$0.0008', cta: 'Contact Sales' },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 ${
                  plan.popular
                    ? 'bg-indigo-600 border-2 border-indigo-400 relative'
                    : 'bg-slate-900 border border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-400 text-indigo-900 px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span>✓</span> {plan.images} images/mo
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span> Overage: {plan.overage}/img
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span> All templates
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span> CDN caching
                  </li>
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-slate-100'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section id="docs" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Dead Simple API</h2>
          <p className="text-slate-400 text-center mb-12">One endpoint. That&apos;s it.</p>
          
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-slate-400">Terminal</span>
            </div>
            <pre className="p-6 overflow-x-auto">
              <code className="text-sm">
{`# Simple GET request
curl "https://ogsnap.dev/api/v1/image?\\
  title=My%20Blog%20Post&\\
  template=blog&\\
  author=Jane%20Doe"

# Returns: PNG image (1200x630)`}
              </code>
            </pre>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-indigo-100 mb-8">Generate your first OG image in under a minute.</p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition">
              Get Your Free API Key →
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded" />
            <span className="font-semibold">OGSnap</span>
          </div>
          <p className="text-slate-500 text-sm">
            Built with ✨ by Sophia
          </p>
        </div>
      </footer>
    </div>
  );
}
