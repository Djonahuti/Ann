import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  FileText,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  meta_description: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    is_published: false
  })


  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPages([
        {
          id: '1',
          title: 'Home Page',
          slug: 'home',
          content: '<h1>Welcome to Annhurst Global</h1><p>Your trusted partner in bus financing...</p>',
          meta_description: 'Annhurst Transport Service Limited provides comprehensive bus financing solutions',
          is_published: true,
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-15T14:30:00Z'
        },
        {
          id: '2',
          title: 'About Us',
          slug: 'about',
          content: '<h1>About Annhurst Global</h1><p>Founded in 2009...</p>',
          meta_description: 'Learn about Annhurst Transport Service Limited and our mission',
          is_published: true,
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-14T16:45:00Z'
        },
        {
          id: '3',
          title: 'Services',
          slug: 'services',
          content: '<h1>Our Services</h1><p>Bus financing and fleet management...</p>',
          meta_description: 'Explore our bus financing and fleet management services',
          is_published: false,
          created_at: '2024-01-12T11:00:00Z',
          updated_at: '2024-01-13T09:15:00Z'
        },
        {
          id: '4',
          title: 'Contact',
          slug: 'contact',
          content: '<h1>Contact Us</h1><p>Get in touch with our team...</p>',
          meta_description: 'Contact Annhurst Transport Service Limited for bus financing',
          is_published: true,
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-01-12T13:20:00Z'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreatePage = () => {
    setEditingPage(null)
    setFormData({
      title: '',
      slug: '',
      content: '',
      meta_description: '',
      is_published: false
    })
    setIsDialogOpen(true)
  }

  const handleEditPage = (page: Page) => {
    setEditingPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      meta_description: page.meta_description,
      is_published: page.is_published
    })
    setIsDialogOpen(true)
  }

  const handleSavePage = () => {
    if (editingPage) {
      // Update existing page
      setPages(prev => prev.map(page => 
        page.id === editingPage.id 
          ? { ...page, ...formData, updated_at: new Date().toISOString() }
          : page
      ))
      toast.success("Page updated successfully")
    } else {
      // Create new page
      const newPage: Page = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setPages(prev => [...prev, newPage])
      toast.success("Page created successfully")
    }
    setIsDialogOpen(false)
  }

  const handleDeletePage = (pageId: string) => {
    setPages(prev => prev.filter(page => page.id !== pageId))
    toast.success("Page deleted successfully")
  }

  const handleTogglePublish = (pageId: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId 
        ? { ...page, is_published: !page.is_published, updated_at: new Date().toISOString() }
        : page
    ))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pages</h1>
          <p className="mt-2 text-gray-600">
            Manage your website pages and content
          </p>
        </div>
        <Button onClick={handleCreatePage}>
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Pages</CardTitle>
          <CardDescription>
            Find and filter your website pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pages by title or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>All Pages ({filteredPages.length})</CardTitle>
          <CardDescription>
            Manage your website content and publishing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      Updated {new Date(page.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={page.is_published ? 'default' : 'secondary'}>
                    {page.is_published ? 'Published' : 'Draft'}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditPage(page)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleTogglePublish(page.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditPage(page)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleTogglePublish(page.id)}
                          className="text-orange-600"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {page.is_published ? 'Unpublish' : 'Publish'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeletePage(page.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage ? 'Edit Page' : 'Create New Page'}
            </DialogTitle>
            <DialogDescription>
              {editingPage 
                ? 'Update the page content and settings' 
                : 'Add a new page to your website'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="page-url-slug"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Input
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="Brief description for search engines"
              />
            </div>
            
            <div>
              <Label htmlFor="content">Page Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter your page content (HTML supported)"
                rows={15}
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use HTML tags for formatting. Basic tags like &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt; are supported.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="is_published">Publish immediately</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePage}>
              {editingPage ? 'Update Page' : 'Create Page'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 