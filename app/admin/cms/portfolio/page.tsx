'use client';

import { useState } from 'react';
import { Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define Portfolio Type locally for now
interface ContentBlock {
  id: string;
  type: 'text' | 'image';
  content: string;
}

interface PortfolioProject {
  id?: string;
  title: string;
  subtitle: string;
  clientName: string;
  liveUrl: string;
  servicesRendered: string;
  contentBlocks: ContentBlock[];
}

export default function PortfolioManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [project, setProject] = useState<PortfolioProject>({
    title: '',
    subtitle: '',
    clientName: '',
    liveUrl: '',
    servicesRendered: '',
    contentBlocks: [{ id: '1', type: 'text', content: '' }],
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof PortfolioProject, string>>>({});

  const saveProject = useMutation({
    mutationFn: async (data: PortfolioProject) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return data;
    },
    onSuccess: () => {
      setIsEditing(false);
      // Reset form or refetch list
      setProject({
        title: '',
        subtitle: '',
        clientName: '',
        liveUrl: '',
        servicesRendered: '',
        contentBlocks: [{ id: '1', type: 'text', content: '' }],
      });
      alert('Project saved successfully!');
    }
  });

  const handleSave = () => {
    // Basic validation
    const newErrors: any = {};
    if (!project.title) newErrors.title = 'Title is required';
    if (!project.clientName) newErrors.clientName = 'Client Name is required';
    if (!project.servicesRendered) newErrors.servicesRendered = 'Services are required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    saveProject.mutate(project);
  };

  const addContentBlock = (type: 'text' | 'image') => {
    setProject({
      ...project,
      contentBlocks: [
        ...project.contentBlocks,
        { id: Math.random().toString(), type, content: '' }
      ]
    });
  };

  const removeContentBlock = (id: string) => {
    setProject({
      ...project,
      contentBlocks: project.contentBlocks.filter((b) => b.id !== id)
    });
  };

  const updateContentBlock = (id: string, content: string) => {
    setProject({
      ...project,
      contentBlocks: project.contentBlocks.map((b) => 
        b.id === id ? { ...b, content } : b
      )
    });
  };

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Portfolio Manager</h1>
            <p className="mt-2 text-sm text-gray-400">Manage case studies and past projects.</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </button>
        </div>
        
        {/* Mock empty state */}
        <div className="p-12 text-center border border-dashed rounded-lg border-white/10">
          <p className="text-gray-400">No portfolio items found. Create one to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Add New Case Study</h1>
          <p className="mt-2 text-sm text-gray-400">Fill in the details for your new portfolio item.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-gray-300 transition-colors bg-transparent border border-white/10 rounded-md hover:bg-white/5"
            disabled={saveProject.isPending}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saveProject.isPending}
            className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveProject.isPending ? 'Saving...' : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Project Title *</label>
          <input
            type="text"
            className={twMerge(
              clsx(
                "block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                errors.title ? "border-red-500" : "border-white/10"
              )
            )}
            value={project.title}
            onChange={(e) => {
              setProject({ ...project, title: e.target.value });
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Client Name *</label>
          <input
            type="text"
            className={twMerge(
              clsx(
                "block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                errors.clientName ? "border-red-500" : "border-white/10"
              )
            )}
            value={project.clientName}
            onChange={(e) => {
              setProject({ ...project, clientName: e.target.value });
              if (errors.clientName) setErrors({ ...errors, clientName: '' });
            }}
          />
          {errors.clientName && <p className="text-sm text-red-500">{errors.clientName}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-300">Subtitle / Short Description</label>
          <input
            type="text"
            className="block w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={project.subtitle}
            onChange={(e) => setProject({ ...project, subtitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Live URL</label>
          <input
            type="url"
            className="block w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="https://"
            value={project.liveUrl}
            onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Services Rendered *</label>
          <input
            type="text"
            className={twMerge(
              clsx(
                "block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                errors.servicesRendered ? "border-red-500" : "border-white/10"
              )
            )}
            placeholder="e.g. Next.js Website, Branding"
            value={project.servicesRendered}
            onChange={(e) => {
              setProject({ ...project, servicesRendered: e.target.value });
              if (errors.servicesRendered) setErrors({ ...errors, servicesRendered: '' });
            }}
          />
          {errors.servicesRendered && <p className="text-sm text-red-500">{errors.servicesRendered}</p>}
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Content Blocks</h3>
          <div className="flex gap-2">
            <button
              onClick={() => addContentBlock('text')}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded hover:bg-white/10"
            >
              + Add Text
            </button>
            <button
              onClick={() => addContentBlock('image')}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded hover:bg-white/10"
            >
              + Add Image
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {project.contentBlocks.map((block, index) => (
            <div key={block.id} className="relative p-4 border rounded-md border-white/10 bg-[#0a0a0a]">
              <button
                onClick={() => removeContentBlock(block.id)}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="mb-2 text-xs font-medium text-gray-500 uppercase">
                {block.type} Block {index + 1}
              </div>

              {block.type === 'text' ? (
                <textarea
                  rows={4}
                  className="block w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter content here..."
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, e.target.value)}
                />
              ) : (
                <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md border-white/10">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-400">Image upload placeholder</p>
                    <input 
                      type="text" 
                      placeholder="Or enter image URL" 
                      className="mt-4 block w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-md text-white text-sm"
                      value={block.content}
                      onChange={(e) => updateContentBlock(block.id, e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
