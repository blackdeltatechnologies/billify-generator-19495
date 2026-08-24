import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Users, Loader2 } from 'lucide-react';

const emptyForm = { name: '', email: '', phone: '', address: '', tax_id: '' };

const Customers = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Could not load customers');
    else setCustomers(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) loadCustomers();
  }, [user]);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (customer) => {
    setEditing(customer);
    setForm({
      name: customer.name ?? '',
      email: customer.email ?? '',
      phone: customer.phone ?? '',
      address: customer.address ?? '',
      tax_id: customer.tax_id ?? '',
    });
    setOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Customer name is required');
      return;
    }
    setSaving(true);
    let error;
    if (editing) {
      ({ error } = await supabase
        .from('customers')
        .update({ ...form })
        .eq('id', editing.id));
    } else {
      ({ error } = await supabase
        .from('customers')
        .insert({ ...form, user_id: user.id }));
    }
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(editing ? 'Customer updated' : 'Customer added');
    setOpen(false);
    loadCustomers();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) toast.error(error.message);
    else {
      toast.success('Customer deleted');
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filtered = customers.filter((c) =>
    [c.name, c.email, c.phone].filter(Boolean).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Customers</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Save clients once and reuse them on any bill or receipt.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew} className="gradient-primary text-white">
                <Plus className="h-4 w-4 mr-2" /> New customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit customer' : 'Add customer'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                {[
                  { key: 'name', label: 'Name', type: 'text' },
                  { key: 'email', label: 'Email', type: 'email' },
                  { key: 'phone', label: 'Phone', type: 'text' },
                  { key: 'address', label: 'Address', type: 'text' },
                  { key: 'tax_id', label: 'Tax ID / TIN', type: 'text' },
                ].map(({ key, label, type }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <Button type="submit" disabled={saving} className="w-full gradient-primary text-white">
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editing ? 'Save changes' : 'Add customer'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 max-w-sm"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-effect rounded-xl p-12 text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No customers yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <div key={c.id} className="glass-effect rounded-xl p-5 transition-transform hover:-translate-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{c.name}</h3>
                    {c.email && <p className="text-sm text-muted-foreground truncate">{c.email}</p>}
                    {c.phone && <p className="text-sm text-muted-foreground">{c.phone}</p>}
                    {c.address && <p className="text-xs text-muted-foreground mt-2">{c.address}</p>}
                    {c.tax_id && <p className="text-xs text-muted-foreground">TIN: {c.tax_id}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Customers;
