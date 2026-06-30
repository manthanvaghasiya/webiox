"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Eye, X, Save, ArrowLeft } from 'lucide-react';
import { getBlogs, addBlog, deleteBlog, getBlogById, updateBlog } from '@/app/actions/blog';
import Link from 'next/link';

export default function BlogManager() {
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Modal State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', status: 'Draft' });

  // Full Editor State
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getBlogs();
    setBlogs(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title) return;
    setIsSubmitting(true);
    
    // Capture the state before clearing it
    const createdTitle = newBlog.title;
    const createdStatus = newBlog.status;
    
    const result = await addBlog(newBlog);
    
    setNewBlog({ title: '', status: 'Draft' });
    setShowModal(false);
    setIsSubmitting(false);
    
    // Always reload the list so it's fresh behind the modal
    await load();
    
    if (result && result.success && result.id) {
      // Immediately open the editor with the initial known state to guarantee it opens fast
      setEditingBlog({
        id: result.id,
        title: createdTitle,
        status: createdStatus,
        slug: '',
        excerpt: '',
        content: '',
        views: 0,
        date: new Date().toLocaleDateString(),
        author: '',
        authorRole: '',
        authorInitials: '',
        category: 'Uncategorized',
        image: '',
        tags: [],
        readTime: '5 min read',
        readMinutes: 5,
        featured: false
      });
      setIsEditorOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteBlog(id);
      load();
    }
  };

  const openEditor = async (id: string) => {
    const blog = await getBlogById(id);
    if (blog) {
      setEditingBlog(blog);
      setIsEditorOpen(true);
    }
  };

  const saveEdits = async () => {
    if (!editingBlog) return;
    setIsSaving(true);
    const { id, date, views, ...updateData } = editingBlog; // Remove non-updatable fields
    await updateBlog(id, updateData);
    setIsSaving(false);
    setIsEditorOpen(false);
    load();
  };

  // --- Editor View ---
  if (isEditorOpen && editingBlog) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#F9FAFB] flex flex-col h-screen overflow-hidden">
        {/* Editor Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="font-bold text-slate-900 leading-tight">Edit Post</h2>
              <p className="text-xs text-slate-500 font-medium">Auto-saving disabled</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={editingBlog.status}
              onChange={(e) => setEditingBlog({...editingBlog, status: e.target.value})}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
            <button 
              onClick={saveEdits}
              disabled={isSaving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70"
            >
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Slug */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <input 
                  type="text" 
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                  placeholder="Post Title..."
                  className="w-full text-4xl md:text-5xl font-extrabold text-slate-900 placeholder:text-slate-300 border-none outline-none focus:ring-0 p-0 mb-4 bg-transparent"
                />
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium text-sm">webiox.tech/blog/</span>
                  <input 
                    type="text"
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, slug: e.target.value})}
                    placeholder="post-url-slug"
                    className="flex-1 text-sm font-medium text-slate-700 placeholder:text-slate-300 border-none outline-none focus:ring-0 p-0 bg-transparent"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <label className="block text-sm font-bold text-slate-700 mb-3">Short Excerpt</label>
                <textarea 
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                  rows={2}
                  placeholder="Write a brief summary of this post for the blog grid..."
                  className="w-full text-slate-600 placeholder:text-slate-400 border border-slate-200 rounded-xl p-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none font-medium transition-all"
                />
              </div>

              {/* Main Content */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[500px] flex flex-col">
                <label className="block text-sm font-bold text-slate-700 mb-3">Article Content (Markdown/HTML supported)</label>
                <textarea 
                  value={editingBlog.content || ''}
                  onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                  placeholder="Start writing your masterpiece here..."
                  className="w-full flex-1 text-slate-700 placeholder:text-slate-300 border-none outline-none focus:ring-0 p-0 bg-transparent resize-none leading-relaxed text-lg"
                />
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Media Settings */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Media</h3>
                
                <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image URL</label>
                <input 
                  type="text" 
                  value={editingBlog.image || ''}
                  onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm mb-4"
                />
                
                {editingBlog.image ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={editingBlog.image} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm font-medium">
                    No image provided
                  </div>
                )}
              </div>

              {/* Taxonomy & Meta */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Post Details</h3>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select 
                    value={editingBlog.category || 'Uncategorized'}
                    onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm"
                  >
                    <option value="Uncategorized">Uncategorized</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Performance">Performance</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    value={editingBlog.tags?.join(', ') || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean)})}
                    placeholder="react, UI, performance"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Read Time</label>
                    <input 
                      type="text" 
                      value={editingBlog.readTime || ''}
                      onChange={(e) => setEditingBlog({...editingBlog, readTime: e.target.value})}
                      placeholder="5 min read"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Read Min</label>
                    <input 
                      type="number" 
                      value={editingBlog.readMinutes || 5}
                      onChange={(e) => setEditingBlog({...editingBlog, readMinutes: parseInt(e.target.value) || 0})}
                      placeholder="5"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="featuredToggle"
                    checked={editingBlog.featured || false}
                    onChange={(e) => setEditingBlog({...editingBlog, featured: e.target.checked})}
                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="featuredToggle" className="text-sm font-bold text-slate-700 cursor-pointer">
                    Featured Post
                  </label>
                </div>
              </div>

              {/* Author Details */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Author</h3>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    value={editingBlog.author || ''}
                    onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm"
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-[2]">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
                    <input 
                      type="text" 
                      value={editingBlog.authorRole || ''}
                      onChange={(e) => setEditingBlog({...editingBlog, authorRole: e.target.value})}
                      placeholder="CTO"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm"
                    />
                  </div>
                  <div className="flex-[1]">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Initials</label>
                    <input 
                      type="text" 
                      value={editingBlog.authorInitials || ''}
                      onChange={(e) => setEditingBlog({...editingBlog, authorInitials: e.target.value})}
                      placeholder="JD"
                      maxLength={2}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 text-sm uppercase"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- List View ---
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Blog Manager</h1>
          <p className="text-slate-500 mt-2 font-medium">Create, edit, and manage your website publications.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search blog posts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700 cursor-pointer">
          <option>All Status</option>
          <option>Published</option>
          <option>Drafts</option>
        </select>
      </div>

      {/* Blog List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-5 font-bold">Title</th>
                <th className="p-5 font-bold">Status</th>
                <th className="p-5 font-bold">Date</th>
                <th className="p-5 font-bold">Views</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading blogs...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No blogs found.</td></tr>
              ) : blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => openEditor(blog.id)}>{blog.title}</div>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${
                      blog.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-slate-500 font-medium">{blog.date}</td>
                  <td className="p-5 text-sm text-slate-500 font-medium flex items-center gap-1.5">
                    <Eye size={14} className="text-slate-400" /> {blog.views}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditor(blog.id)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit3 size={16} /></button>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">Create New Post</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreate} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Post Title</label>
                    <input type="text" required value={newBlog.title} onChange={(e) => setNewBlog({...newBlog, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" placeholder="E.g. Web Design Trends" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Initial Status</label>
                    <select value={newBlog.status} onChange={(e) => setNewBlog({...newBlog, status: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70">
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
