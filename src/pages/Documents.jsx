import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { History, Trash2, Loader2, FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

const Documents = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Could not load documents');
    else setDocuments(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) loadDocuments();
  }, [user]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('documents').delete().eq('id', id);
    if (error) toast.error(error.message);
    else {
      toast.success('Document deleted');
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const filtered = documents.filter((d) =>
    [d.title, d.type].filter(Boolean).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text">Documents</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Every bill and receipt you have saved, in one place.
          </p>
        </div>

        <Input
          placeholder="Search documents..."
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
            <History className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No saved documents yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((d) => {
              const total = Number(d?.totals?.grandTotal ?? d?.totals?.total ?? 0);
              return (
                <div
                  key={d.id}
                  className="glass-effect rounded-xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">
                        {d.title || `${d.type === 'receipt' ? 'Receipt' : 'Bill'} ${d.id.slice(0, 8)}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {d.type === 'receipt' ? 'Receipt' : 'Bill'} ·{' '}
                        {d.created_at ? new Date(d.created_at).toLocaleDateString() : '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold hidden sm:inline">
                      {formatCurrency(total, d.currency || 'TSH')}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(d.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Documents;
