import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL, adminHeaders } from './adminApi'

const CATEGORIES = ['Biryani', 'Thali', 'Rolls', 'Momos', 'Chaat', 'South Indian', 'Chinese', 'Desserts']
const EMPTY_FORM = { name: '', description: '', price: '', category: 'Biryani' }

const getImgSrc = (image) => {
    if (!image) return ''
    if (image.startsWith('data:') || image.startsWith('http')) return image
    return `${API_URL}/images/${image}`
}

const AdminMenu = () => {
    const [items, setItems]       = useState([])
    const [tab, setTab]           = useState('list')      // 'list' | 'add'
    const [form, setForm]         = useState(EMPTY_FORM)
    const [image, setImage]       = useState(null)
    const [saving, setSaving]     = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [editImg, setEditImg]   = useState(null)
    const [search, setSearch]     = useState('')

    const fetchItems = async () => {
        const res = await axios.get(`${API_URL}/api/food/list`)
        if (res.data.success) setItems(res.data.data)
    }

    useEffect(() => { fetchItems() }, [])

    /* ── Add ── */
    const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const addItem = async e => {
        e.preventDefault()
        if (!image) { toast.error('Select an image'); return }
        setSaving(true)
        try {
            const fd = new FormData()
            Object.entries(form).forEach(([k, v]) => fd.append(k, k === 'price' ? Number(v) : v))
            fd.append('image', image)
            const res = await axios.post(`${API_URL}/api/food/add`, fd, { headers: adminHeaders() })
            if (res.data.success) {
                toast.success('Item added!')
                setForm(EMPTY_FORM); setImage(null)
                fetchItems(); setTab('list')
            } else toast.error(res.data.message)
        } catch { toast.error('Server error') }
        setSaving(false)
    }

    /* ── Edit ── */
    const openEdit = item => {
        setEditItem(item)
        setEditForm({ name: item.name, description: item.description, price: item.price, category: item.category })
        setEditImg(null)
    }

    const saveEdit = async e => {
        e.preventDefault()
        setSaving(true)
        try {
            const fd = new FormData()
            fd.append('id', editItem._id)
            Object.entries(editForm).forEach(([k, v]) => fd.append(k, v))
            if (editImg) fd.append('image', editImg)
            const res = await axios.put(`${API_URL}/api/food/update`, fd, { headers: adminHeaders() })
            if (res.data.success) {
                toast.success('Updated!')
                setEditItem(null); fetchItems()
            } else toast.error(res.data.message)
        } catch { toast.error('Server error') }
        setSaving(false)
    }

    /* ── Delete ── */
    const deleteItem = async id => {
        if (!window.confirm('Delete this item?')) return
        const res = await axios.post(`${API_URL}/api/food/remove`, { id }, { headers: adminHeaders() })
        if (res.data.success) { toast.success('Deleted'); fetchItems() }
        else toast.error('Delete failed')
    }

    const filtered = items.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 className="admin-page-title" style={{ margin: 0 }}>Menu Items</h2>
                <div className="filter-tabs">
                    <button className={`filter-tab ${tab === 'list' ? 'active' : ''}`} onClick={() => setTab('list')}>All Items ({items.length})</button>
                    <button className={`filter-tab ${tab === 'add' ? 'active' : ''}`} onClick={() => setTab('add')}>+ Add New</button>
                </div>
            </div>

            {/* ── Add form ── */}
            {tab === 'add' && (
                <div className="admin-table-wrap" style={{ padding: 24, marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 18, fontWeight: 700 }}>Add New Menu Item</h3>
                    <form className="admin-form" onSubmit={addItem}>
                        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                            <label className="img-upload-label">
                                {image
                                    ? <img src={URL.createObjectURL(image)} alt="" />
                                    : <span className="img-upload-placeholder">Click to upload image</span>
                                }
                                <input type="file" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
                            </label>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div className="form-row">
                                    <div className="form-field">
                                        <label>Item Name *</label>
                                        <input name="name" value={form.name} onChange={onChange} placeholder="e.g. Lucknowi Chicken Biryani" required />
                                    </div>
                                    <div className="form-field">
                                        <label>Price (₹) *</label>
                                        <input type="number" name="price" value={form.price} onChange={onChange} placeholder="e.g. 199" min="1" required />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label>Category *</label>
                                    <select name="category" value={form.category} onChange={onChange}>
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-field">
                                    <label>Description *</label>
                                    <textarea name="description" value={form.description} onChange={onChange}
                                        placeholder="Brief description of the item" rows={3} required />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setTab('list')}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving ? 'Adding…' : 'Add Item'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── List ── */}
            {tab === 'list' && (
                <div className="admin-table-wrap">
                    <div className="admin-table-header">
                        <h3>All Menu Items</h3>
                        <input className="search-input" placeholder="Search items…" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    {filtered.length === 0
                        ? <div className="no-data">No items found</div>
                        : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(item => (
                                        <tr key={item._id}>
                                            <td><img src={getImgSrc(item.image)} alt={item.name} /></td>
                                            <td>
                                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{item.description?.slice(0, 60)}…</div>
                                            </td>
                                            <td><span className="badge badge-blue">{item.category}</span></td>
                                            <td style={{ fontWeight: 700 }}>₹{item.price}</td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="btn btn-blue" onClick={() => openEdit(item)}>Edit</button>
                                                    <button className="btn btn-danger" onClick={() => deleteItem(item._id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            )}

            {/* ── Edit modal ── */}
            {editItem && (
                <div className="admin-modal-overlay" onClick={() => setEditItem(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>Edit: {editItem.name}</h3>
                            <button className="admin-modal-close" onClick={() => setEditItem(null)}>×</button>
                        </div>
                        <form className="admin-form" onSubmit={saveEdit}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <label className="img-upload-label" style={{ width: 80, height: 80, flexShrink: 0 }}>
                                    <img src={editImg ? URL.createObjectURL(editImg) : getImgSrc(editItem.image)} alt="" />
                                    <input type="file" accept="image/*" hidden onChange={e => setEditImg(e.target.files[0])} />
                                </label>
                                <span style={{ fontSize: 12, color: '#888' }}>Click image to change</span>
                            </div>
                            <div className="form-row">
                                <div className="form-field">
                                    <label>Name</label>
                                    <input name="name" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
                                </div>
                                <div className="form-field">
                                    <label>Price (₹)</label>
                                    <input type="number" name="price" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))} min="1" required />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Category</label>
                                <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Description</label>
                                <textarea value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} rows={3} required />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                <button type="button" className="btn btn-secondary" onClick={() => setEditItem(null)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminMenu
