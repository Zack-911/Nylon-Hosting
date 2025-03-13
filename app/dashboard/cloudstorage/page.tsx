"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Database,
  File,
  Folder,
  HardDrive,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for cloud storage
const storageData = {
  totalSpace: 500, // GB
  usedSpace: 245, // GB
  files: [
    {
      id: "file-1",
      name: "mining_data.csv",
      type: "csv",
      size: 24.5, // MB
      lastModified: "2025-03-12T14:30:00",
      path: "/mining/data/",
      shared: false,
    },
    {
      id: "file-2",
      name: "backup_2025.zip",
      type: "zip",
      size: 1240, // MB
      lastModified: "2025-03-10T09:15:00",
      path: "/backups/",
      shared: true,
    },
    {
      id: "file-3",
      name: "config.json",
      type: "json",
      size: 0.5, // MB
      lastModified: "2025-03-11T16:45:00",
      path: "/config/",
      shared: false,
    },
    {
      id: "file-4",
      name: "server_logs.txt",
      type: "txt",
      size: 128, // MB
      lastModified: "2025-03-12T10:20:00",
      path: "/logs/",
      shared: false,
    },
    {
      id: "file-5",
      name: "gpu_performance.xlsx",
      type: "xlsx",
      size: 8.2, // MB
      lastModified: "2025-03-09T11:30:00",
      path: "/reports/",
      shared: true,
    },
  ],
  folders: [
    {
      id: "folder-1",
      name: "Mining Data",
      path: "/mining/",
      itemCount: 12,
      size: 156, // MB
      lastModified: "2025-03-12T14:30:00",
    },
    {
      id: "folder-2",
      name: "Backups",
      path: "/backups/",
      itemCount: 8,
      size: 4500, // MB
      lastModified: "2025-03-10T09:15:00",
    },
    {
      id: "folder-3",
      name: "Configuration",
      path: "/config/",
      itemCount: 5,
      size: 2.4, // MB
      lastModified: "2025-03-11T16:45:00",
    },
    {
      id: "folder-4",
      name: "Logs",
      path: "/logs/",
      itemCount: 24,
      size: 890, // MB
      lastModified: "2025-03-12T10:20:00",
    },
    {
      id: "folder-5",
      name: "Reports",
      path: "/reports/",
      itemCount: 15,
      size: 120, // MB
      lastModified: "2025-03-09T11:30:00",
    },
  ],
  recentActivity: [
    {
      id: "activity-1",
      type: "upload",
      fileName: "mining_data.csv",
      user: "John Doe",
      timestamp: "2025-03-12T14:30:00",
    },
    {
      id: "activity-2",
      type: "download",
      fileName: "backup_2025.zip",
      user: "John Doe",
      timestamp: "2025-03-12T12:15:00",
    },
    {
      id: "activity-3",
      type: "share",
      fileName: "gpu_performance.xlsx",
      user: "John Doe",
      timestamp: "2025-03-11T16:45:00",
      sharedWith: "team@example.com",
    },
    {
      id: "activity-4",
      type: "delete",
      fileName: "old_config.json",
      user: "John Doe",
      timestamp: "2025-03-11T10:20:00",
    },
    {
      id: "activity-5",
      type: "rename",
      fileName: "server_logs.txt",
      user: "John Doe",
      timestamp: "2025-03-10T09:15:00",
      oldName: "logs.txt",
    },
  ],
}

// Helper function to format file size
const formatFileSize = (size: number) => {
  if (size < 1) {
    return `${(size * 1024).toFixed(0)} KB`
  } else if (size < 1000) {
    return `${size.toFixed(1)} MB`
  } else {
    return `${(size / 1000).toFixed(2)} GB`
  }
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// File icon component
const FileIcon = ({ type }: { type: string }) => {
  let color = ""

  switch (type) {
    case "csv":
    case "xlsx":
      color = "text-green-500"
      break
    case "zip":
      color = "text-purple-500"
      break
    case "json":
      color = "text-yellow-500"
      break
    case "txt":
      color = "text-blue-500"
      break
    default:
      color = "text-slate-500"
  }

  return <File className={`h-5 w-5 ${color}`} />
}

export default function CloudStoragePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Filter files based on search query and current view
  const filteredFiles = storageData.files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (currentView === "all") return matchesSearch
    if (currentView === "shared") return matchesSearch && file.shared
    return matchesSearch
  })

  // Filter folders based on search query
  const filteredFolders = storageData.folders.filter((folder) => {
    return folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Sort files and folders
  const sortItems = (items: any[], key: string) => {
    return [...items].sort((a, b) => {
      if (key === "name") {
        return a.name.localeCompare(b.name)
      } else if (key === "size") {
        return b.size - a.size
      } else if (key === "date") {
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      }
      return 0
    })
  }

  const sortedFiles = sortItems(filteredFiles, sortBy)
  const sortedFolders = sortItems(filteredFolders, sortBy)

  // Simulate file upload
  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Cloud Storage</h1>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Storage</CardTitle>
              <CardDescription>
                {formatFileSize(storageData.usedSpace)} of {storageData.totalSpace} GB used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(storageData.usedSpace / storageData.totalSpace) * 100} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{((storageData.usedSpace / storageData.totalSpace) * 100).toFixed(1)}% used</span>
                <span>{formatFileSize(storageData.totalSpace - storageData.usedSpace)} free</span>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Files</DialogTitle>
                    <DialogDescription>
                      Select files from your computer to upload to your cloud storage.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-400 mb-2">Drag and drop files here or click to browse</p>
                      <Input type="file" className="hidden" id="file-upload" multiple />
                      <Label htmlFor="file-upload">
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </Label>
                    </div>

                    <div>
                      <Label>Upload Location</Label>
                      <Select defaultValue="root">
                        <SelectTrigger>
                          <SelectValue placeholder="Select folder" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="root">Root Directory</SelectItem>
                          {storageData.folders.map((folder) => (
                            <SelectItem key={folder.id} value={folder.id}>
                              {folder.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploading(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
              >
                <HardDrive className="mr-2 h-4 w-4 text-blue-500" />
                All Files
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
              >
                <Database className="mr-2 h-4 w-4 text-purple-500" />
                Recent
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
              >
                <File className="mr-2 h-4 w-4 text-green-500" />
                Shared
              </Button>

              <Separator className="my-2" />

              <div className="text-sm font-medium text-slate-400 mb-1">Folders</div>
              {storageData.folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant="ghost"
                  className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/30"
                >
                  <Folder className="mr-2 h-4 w-4 text-yellow-500" />
                  {folder.name}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Tabs defaultValue="all" onValueChange={setCurrentView}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="shared">Shared</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Select defaultValue="name" onValueChange={setSortBy}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="size">Size</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Folders */}
                {sortedFolders.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Folders</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sortedFolders.map((folder) => (
                        <div
                          key={folder.id}
                          className="p-3 rounded-lg border border-slate-700 bg-slate-800/20 hover:bg-slate-800/40 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <Folder className="h-5 w-5 text-yellow-500 mr-2" />
                              <div>
                                <h4 className="font-medium text-white">{folder.name}</h4>
                                <p className="text-xs text-slate-400">
                                  {folder.itemCount} items • {formatFileSize(folder.size)}
                                </p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Open</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Files */}
                {sortedFiles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Files</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left py-2 px-3 text-xs font-medium text-slate-400">Name</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-slate-400">Location</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-slate-400">Size</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-slate-400">Modified</th>
                            <th className="text-right py-2 px-3 text-xs font-medium text-slate-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedFiles.map((file) => (
                            <tr key={file.id} className="border-b border-slate-800 hover:bg-slate-800/20">
                              <td className="py-3 px-3">
                                <div className="flex items-center">
                                  <FileIcon type={file.type} />
                                  <span className="ml-2 text-sm text-white">{file.name}</span>
                                  {file.shared && (
                                    <Badge className="ml-2 bg-blue-500/20 text-blue-400 text-xs">Shared</Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-3 text-sm text-slate-400">{file.path}</td>
                              <td className="py-3 px-3 text-sm text-slate-400">{formatFileSize(file.size)}</td>
                              <td className="py-3 px-3 text-sm text-slate-400">{formatDate(file.lastModified)}</td>
                              <td className="py-3 px-3 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Rename</DropdownMenuItem>
                                    <DropdownMenuItem>Move</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* No results */}
                {sortedFiles.length === 0 && sortedFolders.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <h3 className="text-lg font-medium text-white mb-1">No results found</h3>
                    <p className="text-sm text-slate-400">
                      We couldn&apos;t find any files or folders matching your search.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent file activities in your storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storageData.recentActivity.map((activity) => {
                  let icon = <File className="h-4 w-4 text-blue-500" />
                  let actionText = ""

                  switch (activity.type) {
                    case "upload":
                      actionText = "uploaded"
                      icon = <Upload className="h-4 w-4 text-green-500" />
                      break
                    case "download":
                      actionText = "downloaded"
                      icon = <HardDrive className="h-4 w-4 text-blue-500" />
                      break
                    case "share":
                      actionText = "shared"
                      icon = <Database className="h-4 w-4 text-purple-500" />
                      break
                    case "delete":
                      actionText = "deleted"
                      icon = <File className="h-4 w-4 text-red-500" />
                      break
                    case "rename":
                      actionText = "renamed"
                      icon = <File className="h-4 w-4 text-yellow-500" />
                      break
                  }

                  return (
                    <div key={activity.id} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center mr-3">
                        {icon}
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          <span className="font-medium">{activity.user}</span> {actionText}{" "}
                          <span className="font-medium">{activity.fileName}</span>
                          {activity.type === "share" && <span> with {activity.sharedWith}</span>}
                          {activity.type === "rename" && <span> from {activity.oldName}</span>}
                        </p>
                        <p className="text-xs text-slate-400">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

