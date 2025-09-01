import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FileText, Calendar, Edit, Eye, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

interface Page {
  id: string
  title: string
  slug: string
  hero_big_black: string
  meta_description: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false })
    if (error) {
      toast.error("Failed to fetch pages")
    } else {
      setPages(data || [])
    }
    setIsLoading(false)
  }

  const handleDeletePage = async (id: string) => {
    const { error } = await supabase.from('pages').delete().eq('id', id)
    if (error) {
      toast.error("Error deleting page")
    } else {
      setPages(prev => prev.filter(p => p.id !== id))
      toast.success("Page deleted successfully")
    }
  }

  const handleTogglePublish = async (id: string, status: boolean) => {
    const { error } = await supabase.from('pages').update({ is_published: !status }).eq('id', id)
    if (error) {
      toast.error("Error updating publish status")
    } else {
      setPages(prev =>
        prev.map(p => (p.id === id ? { ...p, is_published: !status } : p))
      )
      toast.success("Publish status updated")
    }
  }

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="mt-2 text-gray-600">Manage your website pages and content</p>
        </div>
        <Link to="/admin/pages/new">
          <Button>New Page</Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Pages</CardTitle>
          <CardDescription>Find and filter your website pages</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages ({filteredPages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPages.map(page => (
            <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="font-semibold">{page.title}</h3>
                  <p className="text-sm text-gray-500">/{page.slug}</p>
                  <p className="text-xs text-gray-400">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    Updated {new Date(page.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={page.is_published ? "default" : "secondary"}>
                  {page.is_published ? "Published" : "Draft"}
                </Badge>
                <Link to={`/admin/pages/edit/${page.id}`}>
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleTogglePublish(page.id, page.is_published)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePage(page.id)}>
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
