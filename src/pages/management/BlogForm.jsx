import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogPostById, createBlogPost, updateBlogPost } from '../../lib/api';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import './BlogEditor.css';

// Toolbar Component
function EditorToolbar({ editor }) {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar__group">
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} title="Heading 2">H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} title="Heading 3">H3</button>
      </div>
      <div className="editor-toolbar__group">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''} title="Bold">B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''} title="Italic"><em>I</em></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''} title="Underline"><u>U</u></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''} title="Strikethrough"><s>S</s></button>
      </div>
      <div className="editor-toolbar__group">
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''} title="Bullet List">• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''} title="Numbered List">1. List</button>
      </div>
      <div className="editor-toolbar__group">
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} title="Align Left">←</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} title="Align Center">↔</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''} title="Align Right">→</button>
      </div>
      <div className="editor-toolbar__group">
        <button type="button" onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} title="Insert Link">🔗</button>
        <button type="button" onClick={addImage} title="Insert Image">🖼</button>
      </div>
      <div className="editor-toolbar__group">
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''} title="Blockquote">"</button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">—</button>
      </div>
      <div className="editor-toolbar__group">
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</button>
      </div>
    </div>
  );
}

export default function BlogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(isEditing);
  const [formData, setFormData] = useState({
    id: `blog-${Date.now()}`,
    title: '',
    category: 'Skin Science',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    read_time: '5 min read',
    shade: '#E8D5C0',
    excerpt: '',
    content: ''
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your article content here...' }),
    ],
    content: formData.content || '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (isEditing) {
      async function fetchPost() {
        const post = await getBlogPostById(id);
        if (post) {
          setFormData(post);
          // Set editor content once loaded
          if (editor && post.content) {
            editor.commands.setContent(post.content);
          }
        }
        setLoading(false);
      }
      fetchPost();
    }
  }, [id, isEditing, editor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateBlogPost(id, formData);
      } else {
        await createBlogPost(formData);
      }
      navigate('/management/blog');
    } catch (err) {
      console.error(err);
      alert("Error saving blog post.");
    }
  };

  if (loading) return <div className="admin-loading">Loading entry...</div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Management / Journal</p>
          <h1 className="admin-title">{isEditing ? 'Edit Entry' : 'New Journal Entry'}</h1>
        </div>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="grid-2">
            <div className="admin-form-group">
              <label>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Date String (e.g. April 10, 2026)</label>
              <input type="text" name="date" value={formData.date} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid-2">
            <div className="admin-form-group">
              <label>Read Time (e.g. 5 min read)</label>
              <input type="text" name="read_time" value={formData.read_time} onChange={handleChange} required />
            </div>
            <div className="admin-form-group">
              <label>Shade (Hex Color Code)</label>
              <input type="text" name="shade" value={formData.shade} onChange={handleChange} required />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Excerpt / Content Preview</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required style={{minHeight: '80px'}} />
          </div>

          <div className="admin-form-group">
            <label>Full Article Content</label>
            <div className="editor-wrapper">
              <EditorToolbar editor={editor} />
              <EditorContent editor={editor} className="editor-content" />
            </div>
          </div>

          <div className="admin-form-submit">
            <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Publish Post'}</button>
            <button type="button" onClick={() => navigate('/management/blog')} className="btn btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
