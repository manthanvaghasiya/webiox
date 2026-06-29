"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ExternalLink, MoreVertical, Search, Trash2, X, Edit, Link as LinkIcon, User } from 'lucide-react';
import { getProjects, addProject, deleteProject, updateProject } from '@/app/actions/portfolio';

const defaultProject = { name: '', category: 'Web Design', description: '', clientName: '', liveLink: '', imageUrl: '' };

export default function PortfolioManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProject, setNewProject] = useState(defaultProject);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;
    setIsSubmitting(true);
    
    if (editingId) {
      await updateProject(editingId, newProject);
    } else {
      await addProject(newProject);
    }
    
    setNewProject(defaultProject);
    setEditingId(null);
    setShowModal(false);
    setIsSubmitting(false);
    load();
  };

  const handleEditClick = (project: any) => {
    setNewProject({
      name: project.name || '',
      category: project.category || 'Web Design',
      description: project.description || '',
      clientName: project.clientName || '',
      liveLink: project.liveLink || '',
      imageUrl: project.imageUrl || ''
    });
    setEditingId(project.id);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setNewProject(defaultProject);
    setEditingId(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      load();
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (p.clientName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Portfolio Manager</h1>
          <p className="text-slate-500 mt-2 font-medium">Showcase your agency's best work to potential clients.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700 cursor-pointer"
        >
          <option>All Categories</option>
          <option>Web Design</option>
          <option>SaaS App</option>
          <option>Enterprise</option>
          <option>UI/UX</option>
        </select>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center p-12 text-slate-500">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex justify-center p-12 text-slate-500">No projects found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={project.id} 
            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative flex flex-col"
          >
            {/* Image Placeholder or Actual Image */}
            <div className={`h-48 w-full ${!project.imageUrl ? project.img : 'bg-slate-100'} relative overflow-hidden flex items-center justify-center`}>
               {project.imageUrl ? (
                 <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
               ) : (
                 <span className="font-bold text-black/20 text-xl tracking-widest uppercase">Preview</span>
               )}
               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><ExternalLink size={18} /></a>
                  )}
               </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-bold text-lg text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors line-clamp-1">{project.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleEditClick(project)} className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {project.description && (
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{project.description}</p>
              )}

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <User size={14} className="text-slate-400" />
                    <span className="line-clamp-1">{project.clientName || 'No Client Specified'}</span>
                 </div>
                 <span className="text-xs font-medium text-slate-400">{project.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreateOrUpdate} className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Name <span className="text-rose-500">*</span></label>
                    <input type="text" required value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" placeholder="E.g. EcoTech Startup Landing" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category <span className="text-rose-500">*</span></label>
                    <select value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900">
                      <option value="Web Design">Web Design</option>
                      <option value="SaaS App">SaaS App</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="UI/UX">UI/UX</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Client Name</label>
                    <input type="text" value={newProject.clientName} onChange={(e) => setNewProject({...newProject, clientName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" placeholder="E.g. Acme Corp" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea rows={3} value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900 resize-none" placeholder="Brief description of the project..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                    <input type="url" value={newProject.imageUrl} onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" placeholder="https://example.com/image.jpg" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Live Link</label>
                    <input type="url" value={newProject.liveLink} onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-900" placeholder="https://live-site.com" />
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70">
                    {isSubmitting ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
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
