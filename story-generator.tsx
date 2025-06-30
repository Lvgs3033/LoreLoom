"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Shuffle,
  Sparkles,
  RefreshCw,
  BookOpen,
  Download,
  Share2,
  MessageCircle,
  Copy,
  Twitter,
  Facebook,
  Heart,
  Star,
  Send,
  FileText,
  Wand2,
  Moon,
  Sun,
  Bookmark,
  TrendingUp,
  Clock,
  Eye,
  Palette,
  Music,
  Zap,
  Trophy,
  Target,
  Users,
  Settings,
  Search,
  Calendar,
  BarChart3,
  Lightbulb,
  Crown,
  Gift,
  Edit3,
  Save,
  FolderPlus,
  Camera,
  Layers,
  PenTool,
  BookMarked,
  Library,
  Plus,
  Trash2,
  ImageIcon,
  Type,
  AlignLeft,
} from "lucide-react"

const tropes = [
  "The Chosen One",
  "Enemies to Lovers",
  "Mentor's Death",
  "Love Triangle",
  "Fake Relationship",
  "Amnesia Plot",
  "Time Loop",
  "Fish Out of Water",
  "Reluctant Hero",
  "The Prophecy",
  "Hidden Identity",
  "Forbidden Love",
  "Redemption Arc",
  "The Betrayal",
  "Found Family",
  "Opposites Attract",
  "Second Chance Romance",
  "The Sacrifice",
  "Undercover Mission",
  "Childhood Friends to Lovers",
  "The Mentor",
  "Dark Secret",
  "Rival Becomes Ally",
  "Mysterious Past",
  "Power Awakening",
  "Destined Partners",
  "Unlikely Alliance",
]

const themes = [
  "Good vs Evil",
  "Coming of Age",
  "Redemption",
  "Love Conquers All",
  "Power Corrupts",
  "Family Bonds",
  "Self-Discovery",
  "Sacrifice for Others",
  "Justice vs Mercy",
  "Nature vs Technology",
  "Tradition vs Progress",
  "Individual vs Society",
  "Hope in Darkness",
  "The Cost of War",
  "Identity Crisis",
  "Forgiveness",
  "Survival",
  "Truth vs Lies",
  "Freedom vs Security",
  "Legacy and Heritage",
  "Courage Under Fire",
  "The Price of Fame",
  "Inner Strength",
]

const genres = [
  "High Fantasy",
  "Urban Fantasy",
  "Science Fiction",
  "Romance",
  "Mystery/Thriller",
  "Horror",
  "Historical Fiction",
  "Contemporary Fiction",
  "Dystopian",
  "Steampunk",
  "Cyberpunk",
  "Space Opera",
  "Paranormal Romance",
  "Cozy Mystery",
  "Epic Fantasy",
  "Post-Apocalyptic",
  "Magical Realism",
  "Gothic",
  "Adventure",
  "Comedy/Humor",
  "Western",
  "Superhero",
  "Time Travel",
  "Alternate History",
  "Military Fiction",
  "Slice of Life",
]

const characterTypes = [
  "Reluctant Hero",
  "Wise Mentor",
  "Comic Relief",
  "Femme Fatale",
  "Brooding Anti-Hero",
  "Innocent Ingénue",
  "Cunning Villain",
  "Loyal Sidekick",
  "Mysterious Stranger",
  "Fallen Noble",
  "Plucky Underdog",
  "Stern Authority Figure",
  "Quirky Inventor",
  "Tragic Backstory Character",
  "Double Agent",
  "Protective Guardian",
  "Rebellious Youth",
  "Ancient Sage",
  "Charming Rogue",
  "Devoted Healer",
  "Mad Scientist",
  "Noble Warrior",
  "Street Smart Survivor",
  "Gentle Giant",
]

const storyLengths = [
  { value: "flash", label: "Flash Fiction (100-300 words)" },
  { value: "short", label: "Short Story (500-800 words)" },
  { value: "medium", label: "Medium Story (800-1200 words)" },
  { value: "long", label: "Long Story (1200-1800 words)" },
  { value: "novella", label: "Novella (2000+ words)" },
]

const storyMoods = [
  "Dark & Mysterious",
  "Light & Hopeful",
  "Romantic & Dreamy",
  "Action-Packed",
  "Melancholic",
  "Humorous",
  "Suspenseful",
  "Inspirational",
  "Nostalgic",
  "Epic & Grand",
]

const writingStyles = [
  "Descriptive & Poetic",
  "Fast-Paced & Direct",
  "Dialogue-Heavy",
  "Stream of Consciousness",
  "Classic Literary",
  "Modern Casual",
  "Dramatic & Intense",
  "Minimalist",
]

interface StoryImage {
  id: string
  url: string
  caption: string
  position: "top" | "middle" | "bottom" | "inline"
}

interface Story {
  id: string
  title: string
  content: string
  images: StoryImage[]
  elements: {
    trope: string
    theme: string
    genre: string
    character: string
    length: string
    mood: string
    style: string
  }
  stats: {
    likes: number
    views: number
    rating: number
    readTime: number
  }
  timestamp: string
  isGenerated: boolean
  collection?: string
  tags: string[]
}

interface Collection {
  id: string
  name: string
  description: string
  stories: string[]
  color: string
}

const generateCharacterName = (characterType: string, genre: string) => {
  const fantasyNames = [
    "Aeliana",
    "Theron",
    "Lyra",
    "Kael",
    "Seraphina",
    "Darius",
    "Elara",
    "Zephyr",
    "Morgana",
    "Aldric",
  ]
  const scifiNames = ["Nova", "Zara", "Orion", "Kai", "Luna", "Phoenix", "Sage", "Atlas", "Vega", "Cipher"]
  const modernNames = ["Alex", "Jordan", "Riley", "Morgan", "Casey", "Taylor", "Avery", "Quinn", "Blake", "Sage"]
  const historicalNames = [
    "Eleanor",
    "William",
    "Catherine",
    "Henry",
    "Margaret",
    "Edward",
    "Isabella",
    "Thomas",
    "Victoria",
    "Arthur",
  ]

  if (genre.includes("Fantasy")) return fantasyNames[Math.floor(Math.random() * fantasyNames.length)]
  if (genre.includes("Science") || genre.includes("Cyberpunk") || genre.includes("Space"))
    return scifiNames[Math.floor(Math.random() * scifiNames.length)]
  if (genre.includes("Historical")) return historicalNames[Math.floor(Math.random() * historicalNames.length)]
  return modernNames[Math.floor(Math.random() * modernNames.length)]
}

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200
  const wordCount = text.split(" ").length
  return Math.ceil(wordCount / wordsPerMinute)
}

const generateStoryImage = async (prompt: string): Promise<string> => {
  // Simulate AI image generation
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(prompt)}`
}

const generateFullStory = (elements: any) => {
  const { trope, theme, genre, characterType, length, mood, style } = elements
  const protagonist = generateCharacterName(characterType, genre)
  const antagonist = generateCharacterName("Cunning Villain", genre)
  const sidekick = generateCharacterName("Loyal Sidekick", genre)

  // Enhanced story templates with mood and style integration
  const storyTemplates = {
    "The Chosen One": {
      opening: `${protagonist} had always been ordinary—or so they thought. Living a quiet life as a ${characterType.toLowerCase()}, they never imagined that destiny had other plans. The ${mood.toLowerCase()} atmosphere of their world was about to change forever.`,
      inciting: `Everything changed the day ${sidekick} arrived with news that would shatter ${protagonist}'s world: they were the chosen one, destined to face the growing darkness that threatened everything they held dear. The revelation came with a ${style.toLowerCase()} intensity that left them reeling.`,
      conflict: `But ${antagonist}, the source of this evil, had been preparing for this moment for years. As ${protagonist} struggled to master their newfound abilities, they realized that being chosen didn't make the path any easier—it only made the stakes higher. The weight of ${theme.toLowerCase()} pressed down on them like a suffocating blanket.`,
      climax: `In the final confrontation, ${protagonist} faced a terrible choice. To defeat ${antagonist}, they would have to sacrifice something precious. The ${mood.toLowerCase()} tension reached its peak as they made their decision, knowing it would define not just their fate, but the fate of everyone they loved.`,
      resolution: `In the end, ${protagonist} learned that true strength came not from being chosen, but from choosing to do what was right. The victory was bittersweet, but the world was safe, and ${protagonist} had found their true purpose. The ${style.toLowerCase()} conclusion left them forever changed, carrying the wisdom of their journey into an uncertain but hopeful future.`,
    },
    // Add more enhanced templates...
  }

  const template = storyTemplates[trope as keyof typeof storyTemplates] || {
    opening: `${protagonist}, a ${characterType.toLowerCase()}, lived in a world where ${genre.toLowerCase()} was the norm. The ${mood.toLowerCase()} atmosphere of their existence was about to be shattered in ways they never expected.`,
    inciting: `When ${sidekick} brought news of a growing threat, ${protagonist} realized they couldn't remain on the sidelines. The ${trope.toLowerCase()} had begun, and they were at its center, facing it with a ${style.toLowerCase()} determination.`,
    conflict: `${antagonist} proved to be a formidable opponent, challenging everything ${protagonist} believed about ${theme.toLowerCase()}. The stakes grew higher with each passing moment, the ${mood.toLowerCase()} tension building to unbearable levels.`,
    climax: `In the final confrontation, ${protagonist} had to dig deep within themselves to find the strength to continue. The battle was as much internal as external, fought with ${style.toLowerCase()} intensity that would define their very soul.`,
    resolution: `Victory came at a cost, but ${protagonist} emerged changed. They had learned valuable lessons about ${theme.toLowerCase()} and discovered strengths they never knew they possessed. The ${mood.toLowerCase()} conclusion brought both peace and the promise of new adventures.`,
  }

  let story = `**${protagonist}'s Tale**\n\n`

  // Adjust story length and complexity
  if (length === "flash") {
    story += `${template.opening}\n\n${template.climax}\n\n${template.resolution}`
  } else if (length === "short") {
    story += `${template.opening}\n\n${template.inciting}\n\n${template.climax}\n\n${template.resolution}`
  } else if (length === "medium") {
    story += `${template.opening}\n\n${template.inciting}\n\n${template.conflict}\n\n${template.climax}\n\n${template.resolution}`
  } else if (length === "long") {
    story += `${template.opening}\n\n${template.inciting}\n\n`
    story += `Days passed as ${protagonist} grappled with their new reality. The ${mood.toLowerCase()} weight of responsibility pressed down on them, but ${sidekick} remained a constant source of support and guidance.\n\n`
    story += `${template.conflict}\n\n`
    story += `The journey tested ${protagonist} in ways they had never imagined. Each challenge revealed new aspects of their character, and the theme of ${theme.toLowerCase()} became increasingly relevant to their quest.\n\n`
    story += `${template.climax}\n\n`
    story += `The aftermath brought both relief and reflection. ${protagonist} had to come to terms with what they had experienced and how it had changed them.\n\n`
    story += `${template.resolution}`
  } else {
    // novella
    story += `${template.opening}\n\n${template.inciting}\n\n`
    story += `The first weeks were the hardest. ${protagonist} struggled to understand their new role while ${sidekick} provided guidance and ${antagonist} grew stronger in the shadows.\n\n`
    story += `${template.conflict}\n\n`
    story += `As the conflict escalated, ${protagonist} discovered allies in unexpected places and enemies where they least expected them. The theme of ${theme.toLowerCase()} became a constant companion on their journey.\n\n`
    story += `The turning point came when ${protagonist} finally understood what they had to do. The path forward was clear, but the cost would be higher than they ever imagined.\n\n`
    story += `${template.climax}\n\n`
    story += `In the quiet aftermath, as the dust settled and the world began to heal, ${protagonist} reflected on everything they had learned and lost.\n\n`
    story += `${template.resolution}\n\nEpilogue: Years later, ${protagonist} would look back on this time as the moment their true life began. The lessons learned and the bonds forged would guide them through whatever challenges lay ahead.`
  }

  return story
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("generate")
  const [selectedTrope, setSelectedTrope] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState("")
  const [selectedLength, setSelectedLength] = useState("medium")
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [generatedStory, setGeneratedStory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [storyTitle, setStoryTitle] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Array<{ id: number; text: string; author: string; timestamp: string }>>([])
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [rating, setRating] = useState(0)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [newCollectionDialogOpen, setNewCollectionDialogOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [storyHistory, setStoryHistory] = useState<Story[]>([])
  const [collections, setCollections] = useState<Collection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [dailyChallenge, setDailyChallenge] = useState("")
  const [streakCount, setStreakCount] = useState(0)
  const [totalStoriesGenerated, setTotalStoriesGenerated] = useState(0)
  const [favoriteGenre, setFavoriteGenre] = useState("")

  // Story Writing/Editing States
  const [isWriting, setIsWriting] = useState(false)
  const [writingTitle, setWritingTitle] = useState("")
  const [writingContent, setWritingContent] = useState("")
  const [writingTags, setWritingTags] = useState("")
  const [storyImages, setStoryImages] = useState<StoryImage[]>([])
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [imagePrompt, setImagePrompt] = useState("")
  const [selectedCollection, setSelectedCollection] = useState("")
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [newCollectionColor, setNewCollectionColor] = useState("#8b5cf6")

  const { toast } = useToast()

  useEffect(() => {
    // Generate daily challenge
    const challenges = [
      "Write a story where the villain is actually the hero",
      "Create a tale that takes place entirely in one room",
      "Write a story backwards - start with the ending",
      "Tell a story from an animal's perspective",
      "Write a story using only dialogue",
    ]
    setDailyChallenge(challenges[Math.floor(Math.random() * challenges.length)])

    // Load saved data
    const savedHistory = localStorage.getItem("loreloopStoryHistory")
    if (savedHistory) {
      setStoryHistory(JSON.parse(savedHistory))
    }

    const savedCollections = localStorage.getItem("loreloopCollections")
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections))
    } else {
      // Create default collections
      const defaultCollections: Collection[] = [
        {
          id: "favorites",
          name: "Favorites",
          description: "Your most loved stories",
          stories: [],
          color: "#ef4444",
        },
        {
          id: "drafts",
          name: "Drafts",
          description: "Work in progress stories",
          stories: [],
          color: "#f59e0b",
        },
        {
          id: "published",
          name: "Published",
          description: "Completed stories ready to share",
          stories: [],
          color: "#10b981",
        },
      ]
      setCollections(defaultCollections)
      localStorage.setItem("loreloopCollections", JSON.stringify(defaultCollections))
    }

    const savedStats = localStorage.getItem("loreloopUserStats")
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      setStreakCount(stats.streakCount || 0)
      setTotalStoriesGenerated(stats.totalStoriesGenerated || 0)
      setFavoriteGenre(stats.favoriteGenre || "")
    }
  }, [])

  const generateStory = () => {
    if (!selectedTrope || !selectedTheme || !selectedGenre || !selectedCharacter) {
      toast({
        title: "Missing Elements",
        description: "Please select all required story elements before generating.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    setTimeout(() => {
      const elements = {
        trope: selectedTrope,
        theme: selectedTheme,
        genre: selectedGenre,
        characterType: selectedCharacter,
        length: selectedLength,
        mood: selectedMood || storyMoods[Math.floor(Math.random() * storyMoods.length)],
        style: selectedStyle || writingStyles[Math.floor(Math.random() * writingStyles.length)],
      }

      const story = generateFullStory(elements)
      const title = `${selectedTrope} - A ${selectedGenre} Tale`
      const readTime = calculateReadTime(story)

      const newStory: Story = {
        id: Date.now().toString(),
        title,
        content: story,
        images: [],
        elements,
        stats: {
          likes: 0,
          views: 1,
          rating: 0,
          readTime,
        },
        timestamp: new Date().toISOString(),
        isGenerated: true,
        tags: [selectedGenre, selectedTrope, selectedTheme],
      }

      setGeneratedStory(story)
      setStoryTitle(title)
      setCurrentStory(newStory)
      setGenerationProgress(100)
      setIsGenerating(false)

      // Update history and stats
      const updatedHistory = [newStory, ...storyHistory.slice(0, 19)]
      setStoryHistory(updatedHistory)
      localStorage.setItem("loreloopStoryHistory", JSON.stringify(updatedHistory))

      const newTotalStories = totalStoriesGenerated + 1
      setTotalStoriesGenerated(newTotalStories)

      // Update favorite genre
      const genreCount = updatedHistory.reduce(
        (acc, story) => {
          if (story.elements?.genre) {
            acc[story.elements.genre] = (acc[story.elements.genre] || 0) + 1
          }
          return acc
        },
        {} as Record<string, number>,
      )

      const newFavoriteGenre = Object.entries(genreCount).reduce((a, b) =>
        genreCount[a[0]] > genreCount[b[0]] ? a : b,
      )[0]
      setFavoriteGenre(newFavoriteGenre)

      localStorage.setItem(
        "loreloopUserStats",
        JSON.stringify({
          streakCount: streakCount + 1,
          totalStoriesGenerated: newTotalStories,
          favoriteGenre: newFavoriteGenre,
        }),
      )

      toast({
        title: "Story Generated! ✨",
        description: `Your ${readTime}-minute read is ready!`,
      })
    }, 3000)
  }

  const saveStory = (story: Story, collectionId?: string) => {
    const updatedHistory = storyHistory.some((s) => s.id === story.id)
      ? storyHistory.map((s) => (s.id === story.id ? { ...story, collection: collectionId } : s))
      : [{ ...story, collection: collectionId }, ...storyHistory]

    setStoryHistory(updatedHistory)
    localStorage.setItem("loreloopStoryHistory", JSON.stringify(updatedHistory))

    if (collectionId) {
      const updatedCollections = collections.map((col) =>
        col.id === collectionId
          ? { ...col, stories: col.stories.includes(story.id) ? col.stories : [...col.stories, story.id] }
          : col,
      )
      setCollections(updatedCollections)
      localStorage.setItem("loreloopCollections", JSON.stringify(updatedCollections))
    }

    toast({
      title: "Story Saved! 💾",
      description: collectionId
        ? `Added to ${collections.find((c) => c.id === collectionId)?.name}`
        : "Saved to your library",
    })
  }

  const createNewStory = () => {
    setIsWriting(true)
    setWritingTitle("")
    setWritingContent("")
    setWritingTags("")
    setStoryImages([])
    setActiveTab("write")
  }

  const saveWrittenStory = () => {
    if (!writingTitle.trim() || !writingContent.trim()) {
      toast({
        title: "Missing Content",
        description: "Please add a title and content for your story.",
        variant: "destructive",
      })
      return
    }

    const newStory: Story = {
      id: Date.now().toString(),
      title: writingTitle,
      content: writingContent,
      images: storyImages,
      elements: {
        trope: "",
        theme: "",
        genre: "",
        character: "",
        length: "",
        mood: "",
        style: "",
      },
      stats: {
        likes: 0,
        views: 0,
        rating: 0,
        readTime: calculateReadTime(writingContent),
      },
      timestamp: new Date().toISOString(),
      isGenerated: false,
      collection: selectedCollection,
      tags: writingTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    saveStory(newStory, selectedCollection)
    setIsWriting(false)
    setCurrentStory(newStory)
    setGeneratedStory(writingContent)
    setStoryTitle(writingTitle)
    setActiveTab("generate")
  }

  const addImageToStory = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a description for the image.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingImage(true)
    try {
      const imageUrl = await generateStoryImage(imagePrompt)
      const newImage: StoryImage = {
        id: Date.now().toString(),
        url: imageUrl,
        caption: imagePrompt,
        position: "middle",
      }
      setStoryImages([...storyImages, newImage])
      setImagePrompt("")
      toast({
        title: "Image Generated! 🎨",
        description: "Your story illustration has been created.",
      })
    } catch (error) {
      toast({
        title: "Image Generation Failed",
        description: "There was an error generating the image. Please try again.",
        variant: "destructive",
      })
    }
    setIsGeneratingImage(false)
  }

  const createNewCollection = () => {
    if (!newCollectionName.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter a name for your collection.",
        variant: "destructive",
      })
      return
    }

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      description: newCollectionDescription,
      stories: [],
      color: newCollectionColor,
    }

    const updatedCollections = [...collections, newCollection]
    setCollections(updatedCollections)
    localStorage.setItem("loreloopCollections", JSON.stringify(updatedCollections))

    setNewCollectionName("")
    setNewCollectionDescription("")
    setNewCollectionColor("#8b5cf6")
    setNewCollectionDialogOpen(false)

    toast({
      title: "Collection Created! 📚",
      description: `${newCollection.name} is ready for your stories.`,
    })
  }

  const randomizeAll = () => {
    setSelectedTrope(tropes[Math.floor(Math.random() * tropes.length)])
    setSelectedTheme(themes[Math.floor(Math.random() * themes.length)])
    setSelectedGenre(genres[Math.floor(Math.random() * genres.length)])
    setSelectedCharacter(characterTypes[Math.floor(Math.random() * characterTypes.length)])
    setSelectedMood(storyMoods[Math.floor(Math.random() * storyMoods.length)])
    setSelectedStyle(writingStyles[Math.floor(Math.random() * writingStyles.length)])

    toast({
      title: "Elements Randomized! 🎲",
      description: "All story elements have been randomly selected.",
    })
  }

  const resetAll = () => {
    setSelectedTrope("")
    setSelectedTheme("")
    setSelectedGenre("")
    setSelectedCharacter("")
    setSelectedMood("")
    setSelectedStyle("")
    setGeneratedStory("")
    setStoryTitle("")
    setComments([])
    setLiked(false)
    setBookmarked(false)
    setRating(0)
    setCurrentStory(null)

    toast({
      title: "Reset Complete 🔄",
      description: "All selections have been cleared.",
    })
  }

  const downloadStory = (format = "txt") => {
    if (!generatedStory) {
      toast({
        title: "No Story to Download",
        description: "Please generate a story first.",
        variant: "destructive",
      })
      return
    }

    try {
      let content = ""
      let filename = ""
      let mimeType = ""

      if (format === "txt") {
        content = `${storyTitle}\n${"=".repeat(storyTitle.length)}\n\n${generatedStory}\n\n---\nCreated with LoreLoom\nElements: ${selectedTrope} | ${selectedTheme} | ${selectedGenre} | ${selectedCharacter}`
        filename = `${storyTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`
        mimeType = "text/plain;charset=utf-8"
      } else if (format === "html") {
        content = `
<!DOCTYPE html>
<html>
<head>
    <title>${storyTitle}</title>
    <style>
        body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #333; border-bottom: 2px solid #333; }
        .story-content { white-space: pre-line; }
        .metadata { margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 5px; }
        .loreloom-brand { text-align: center; margin-top: 20px; color: #8b5cf6; font-weight: bold; }
    </style>
</head>
<body>
    <h1>${storyTitle}</h1>
    <div class="story-content">${generatedStory}</div>
    <div class="metadata">
        <strong>Story Elements:</strong><br>
        Trope: ${selectedTrope}<br>
        Theme: ${selectedTheme}<br>
        Genre: ${selectedGenre}<br>
        Character: ${selectedCharacter}
    </div>
    <div class="loreloom-brand">Created with LoreLoom ✨</div>
</body>
</html>`
        filename = `${storyTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.html`
        mimeType = "text/html;charset=utf-8"
      }

      const element = document.createElement("a")
      const file = new Blob([content], { type: mimeType })
      element.href = URL.createObjectURL(file)
      element.download = filename
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      toast({
        title: `Download Started! 📥`,
        description: `Your story is being downloaded as ${format.toUpperCase()}.`,
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your story. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async () => {
    if (!generatedStory) return

    try {
      await navigator.clipboard.writeText(`${storyTitle}\n\n${generatedStory}`)
      toast({
        title: "Copied to Clipboard! 📋",
        description: "Story has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try selecting and copying manually.",
        variant: "destructive",
      })
    }
  }

  const shareToTwitter = () => {
    const text = `Check out this amazing story I created with LoreLoom: "${storyTitle}" #LoreLoom #CreativeWriting #StoryTelling`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
    toast({
      title: "Sharing to Twitter! 🐦",
      description: "Opening Twitter to share your story.",
    })
  }

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    window.open(url, "_blank")
    toast({
      title: "Sharing to Facebook! 📘",
      description: "Opening Facebook to share your story.",
    })
  }

  const addComment = () => {
    if (!comment.trim()) return

    const newComment = {
      id: Date.now(),
      text: comment,
      author: "Anonymous Reader",
      timestamp: new Date().toLocaleString(),
    }
    setComments([...comments, newComment])
    setComment("")
    toast({
      title: "Comment Added! 💬",
      description: "Your comment has been added to the story.",
    })
  }

  const toggleLike = () => {
    setLiked(!liked)
    if (currentStory) {
      currentStory.stats.likes += liked ? -1 : 1
    }
    toast({
      title: liked ? "Unliked 💔" : "Liked! ❤️",
      description: liked ? "Removed from favorites." : "Added to favorites!",
    })
  }

  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
    toast({
      title: bookmarked ? "Bookmark Removed 📖" : "Bookmarked! 🔖",
      description: bookmarked ? "Removed from saved stories." : "Added to saved stories!",
    })
  }

  const setStoryRating = (newRating: number) => {
    setRating(newRating)
    if (currentStory) {
      currentStory.stats.rating = newRating
    }
    toast({
      title: `Rated ${newRating} Stars! ⭐`,
      description: "Thank you for rating this story.",
    })
  }

  const filteredHistory = storyHistory.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.elements?.genre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.elements?.trope?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50"} p-4`}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Layers className="w-10 h-10 text-purple-600 animate-pulse" />
                <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                LoreLoom
              </h1>
              <div className="relative">
                <BookOpen className="w-10 h-10 text-blue-600 animate-pulse" />
                <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-xl font-medium">Weave Stories, Create Worlds, Share Magic ✨</p>

          {/* Stats Bar */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>{totalStoriesGenerated} Stories Created</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>{streakCount} Day Streak</span>
            </div>
            <div className="flex items-center gap-1">
              <Library className="w-4 h-4 text-green-500" />
              <span>{collections.length} Collections</span>
            </div>
            {favoriteGenre && (
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Loves {favoriteGenre}</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-2">
            <Button
              onClick={createNewStory}
              className="gap-1 hover:scale-105 transition-all bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Edit3 className="w-4 h-4" />
              Write Story
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHistoryDialogOpen(true)}
              className="gap-1 hover:scale-105 transition-all"
            >
              <Library className="w-4 h-4" />
              Library ({storyHistory.length})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSettingsDialogOpen(true)}
              className="gap-1 hover:scale-105 transition-all"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="gap-1 hover:scale-105 transition-all"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? "Light" : "Dark"}
            </Button>
          </div>
        </div>

        {/* Daily Challenge */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-dashed border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-600 animate-spin" />
              Daily Writing Challenge
              <Gift className="w-5 h-5 text-red-500 animate-bounce" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-yellow-800">{dailyChallenge}</p>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="generate" className="gap-2">
              <Wand2 className="w-4 h-4" />
              Generate Story
            </TabsTrigger>
            <TabsTrigger value="write" className="gap-2">
              <Edit3 className="w-4 h-4" />
              Write Story
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-2">
              <Library className="w-4 h-4" />
              My Library
            </TabsTrigger>
          </TabsList>

          {/* Generate Story Tab */}
          <TabsContent value="generate">
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-6 h-6 animate-bounce text-purple-600" />
                  AI Story Generator
                  <Sparkles className="w-5 h-5 animate-pulse text-blue-500" />
                </CardTitle>
                <CardDescription>Let AI craft your perfect story with advanced customization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Elements</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
                    <TabsTrigger value="style">Style & Mood</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          Trope
                        </label>
                        <Select value={selectedTrope} onValueChange={setSelectedTrope}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue placeholder="Choose a trope" />
                          </SelectTrigger>
                          <SelectContent>
                            {tropes.map((trope) => (
                              <SelectItem key={trope} value={trope}>
                                {trope}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <Lightbulb className="w-4 h-4" />
                          Theme
                        </label>
                        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue placeholder="Choose a theme" />
                          </SelectTrigger>
                          <SelectContent>
                            {themes.map((theme) => (
                              <SelectItem key={theme} value={theme}>
                                {theme}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <Palette className="w-4 h-4" />
                          Genre
                        </label>
                        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue placeholder="Choose a genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre} value={genre}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Character Type
                        </label>
                        <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue placeholder="Choose a character type" />
                          </SelectTrigger>
                          <SelectContent>
                            {characterTypes.map((character) => (
                              <SelectItem key={character} value={character}>
                                {character}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Story Length
                        </label>
                        <Select value={selectedLength} onValueChange={setSelectedLength}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {storyLengths.map((length) => (
                              <SelectItem key={length.value} value={length.value}>
                                {length.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Complexity Level
                        </label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple & Straightforward</SelectItem>
                            <SelectItem value="medium">Balanced Complexity</SelectItem>
                            <SelectItem value="complex">Rich & Detailed</SelectItem>
                            <SelectItem value="masterpiece">Literary Masterpiece</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="style" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <Music className="w-4 h-4" />
                          Story Mood
                        </label>
                        <Select value={selectedMood} onValueChange={setSelectedMood}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue placeholder="Choose a mood (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {storyMoods.map((mood) => (
                              <SelectItem key={mood} value={mood}>
                                {mood}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          Writing Style
                        </label>
                        <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                          <SelectTrigger className="hover:border-purple-300 transition-colors">
                            <SelectValue placeholder="Choose a style (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {writingStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Generation Progress */}
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weaving your story...</span>
                      <span className="text-sm text-muted-foreground">{Math.round(generationProgress)}%</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center">
                      {generationProgress < 30 && "Analyzing story elements..."}
                      {generationProgress >= 30 && generationProgress < 60 && "Creating characters and plot..."}
                      {generationProgress >= 60 && generationProgress < 90 && "Weaving the narrative..."}
                      {generationProgress >= 90 && "Adding final touches..."}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={randomizeAll}
                    variant="outline"
                    className="gap-2 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 hover:scale-105 border-2 border-purple-200"
                  >
                    <Shuffle className="w-4 h-4" />
                    Surprise Me!
                  </Button>
                  <Button
                    onClick={resetAll}
                    variant="outline"
                    className="gap-2 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300 hover:scale-105 border-2 border-red-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Start Fresh
                  </Button>
                  <Button
                    onClick={generateStory}
                    disabled={!selectedTrope || !selectedTheme || !selectedGenre || !selectedCharacter || isGenerating}
                    className="gap-2 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className={`w-5 h-5 ${isGenerating ? "animate-spin" : "animate-pulse"}`} />
                    {isGenerating ? "Creating Magic..." : "Generate Epic Story"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Write Story Tab */}
          <TabsContent value="write">
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-6 h-6 animate-bounce text-green-600" />
                  Story Writer
                  <PenTool className="w-5 h-5 animate-pulse text-blue-500" />
                </CardTitle>
                <CardDescription>Craft your own stories with our powerful writing tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="story-title" className="flex items-center gap-1">
                      <Type className="w-4 h-4" />
                      Story Title
                    </Label>
                    <Input
                      id="story-title"
                      placeholder="Enter your story title..."
                      value={writingTitle}
                      onChange={(e) => setWritingTitle(e.target.value)}
                      className="text-lg font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="story-collection" className="flex items-center gap-1">
                      <BookMarked className="w-4 h-4" />
                      Save to Collection
                    </Label>
                    <div className="flex gap-2">
                      <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose collection (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          {collections.map((collection) => (
                            <SelectItem key={collection.id} value={collection.id}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: collection.color }}
                                ></div>
                                {collection.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewCollectionDialogOpen(true)}
                        className="gap-1"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-tags" className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="story-tags"
                    placeholder="fantasy, adventure, magic..."
                    value={writingTags}
                    onChange={(e) => setWritingTags(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-content" className="flex items-center gap-1">
                    <AlignLeft className="w-4 h-4" />
                    Story Content
                  </Label>
                  <Textarea
                    id="story-content"
                    placeholder="Once upon a time..."
                    value={writingContent}
                    onChange={(e) => setWritingContent(e.target.value)}
                    className="min-h-[400px] text-base leading-relaxed font-serif"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                  <div className="text-sm text-muted-foreground">
                    {writingContent.split(" ").length} words • {calculateReadTime(writingContent)} min read
                  </div>
                </div>

                {/* Image Management */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-1">
                      <ImageIcon className="w-4 h-4" />
                      Story Images
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Describe the image you want..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="w-64"
                      />
                      <Button
                        onClick={addImageToStory}
                        disabled={isGeneratingImage || !imagePrompt.trim()}
                        size="sm"
                        className="gap-1"
                      >
                        {isGeneratingImage ? (
                          <Sparkles className="w-4 h-4 animate-spin" />
                        ) : (
                          <Camera className="w-4 h-4" />
                        )}
                        {isGeneratingImage ? "Generating..." : "Generate Image"}
                      </Button>
                    </div>
                  </div>

                  {storyImages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {storyImages.map((image) => (
                        <Card key={image.id} className="overflow-hidden">
                          <div className="aspect-video bg-gray-100 flex items-center justify-center">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.caption}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(image.caption)}`
                              }}
                            />
                          </div>
                          <CardContent className="p-3">
                            <p className="text-sm text-muted-foreground">{image.caption}</p>
                            <div className="flex justify-between items-center mt-2">
                              <Select
                                value={image.position}
                                onValueChange={(value) => {
                                  const updatedImages = storyImages.map((img) =>
                                    img.id === image.id ? { ...img, position: value as any } : img,
                                  )
                                  setStoryImages(updatedImages)
                                }}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="top">Top</SelectItem>
                                  <SelectItem value="middle">Middle</SelectItem>
                                  <SelectItem value="bottom">Bottom</SelectItem>
                                  <SelectItem value="inline">Inline</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setStoryImages(storyImages.filter((img) => img.id !== image.id))
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={saveWrittenStory}
                    disabled={!writingTitle.trim() || !writingContent.trim()}
                    className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    Save Story
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setWritingTitle("")
                      setWritingContent("")
                      setWritingTags("")
                      setStoryImages([])
                      setSelectedCollection("")
                    }}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Library Tab */}
          <TabsContent value="library">
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Library className="w-6 h-6 animate-bounce text-blue-600" />
                  My Story Library
                  <BookMarked className="w-5 h-5 animate-pulse text-purple-500" />
                </CardTitle>
                <CardDescription>Organize and manage your story collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search stories, collections, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => setNewCollectionDialogOpen(true)}
                    className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <FolderPlus className="w-4 h-4" />
                    New Collection
                  </Button>
                </div>

                {/* Collections */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookMarked className="w-5 h-5" />
                    Collections
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {collections.map((collection) => (
                      <Card key={collection.id} className="hover:shadow-md transition-all cursor-pointer">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: collection.color }}></div>
                            <CardTitle className="text-base">{collection.name}</CardTitle>
                          </div>
                          <CardDescription className="text-sm">{collection.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{collection.stories.length} stories</span>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="w-3 h-3" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Stories */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    All Stories ({filteredHistory.length})
                  </h3>
                  <div className="grid gap-4">
                    {filteredHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No Stories Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          {storyHistory.length === 0
                            ? "Start creating your first story!"
                            : "No stories match your search."}
                        </p>
                        <Button onClick={createNewStory} className="gap-2">
                          <Edit3 className="w-4 h-4" />
                          Create Your First Story
                        </Button>
                      </div>
                    ) : (
                      filteredHistory.map((story) => (
                        <Card key={story.id} className="hover:shadow-md transition-all cursor-pointer">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  {story.title}
                                  {story.isGenerated ? (
                                    <Badge variant="secondary" className="text-xs">
                                      <Wand2 className="w-3 h-3 mr-1" />
                                      Generated
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-xs">
                                      <Edit3 className="w-3 h-3 mr-1" />
                                      Written
                                    </Badge>
                                  )}
                                </CardTitle>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {story.stats.readTime} min read
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    {story.stats.views} views
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Heart className="w-3 h-3" />
                                    {story.stats.likes} likes
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(story.timestamp).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCurrentStory(story)
                                    setGeneratedStory(story.content)
                                    setStoryTitle(story.title)
                                    setActiveTab("generate")
                                  }}
                                  className="gap-1"
                                >
                                  <Eye className="w-3 h-3" />
                                  View
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Download className="w-3 h-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentStory(story)
                                        setGeneratedStory(story.content)
                                        setStoryTitle(story.title)
                                        downloadStory("txt")
                                      }}
                                      className="gap-2"
                                    >
                                      <FileText className="w-4 h-4" />
                                      Download TXT
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentStory(story)
                                        setGeneratedStory(story.content)
                                        setStoryTitle(story.title)
                                        downloadStory("html")
                                      }}
                                      className="gap-2"
                                    >
                                      <FileText className="w-4 h-4" />
                                      Download HTML
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {story.content.substring(0, 200)}...
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {story.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {story.elements?.genre && (
                                  <Badge variant="secondary" className="text-xs">
                                    {story.elements.genre}
                                  </Badge>
                                )}
                              </div>
                              {story.collection && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <BookMarked className="w-3 h-3" />
                                  In {collections.find((c) => c.id === story.collection)?.name}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Selected Elements Display */}
        {(selectedTrope || selectedTheme || selectedGenre || selectedCharacter) && activeTab === "generate" && (
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 animate-pulse" />
                Your Story Elements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedTrope && (
                  <Badge
                    variant="secondary"
                    className="animate-fadeIn bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    📖 {selectedTrope}
                  </Badge>
                )}
                {selectedTheme && (
                  <Badge variant="secondary" className="animate-fadeIn bg-blue-100 text-blue-800 hover:bg-blue-200">
                    💡 {selectedTheme}
                  </Badge>
                )}
                {selectedGenre && (
                  <Badge variant="secondary" className="animate-fadeIn bg-green-100 text-green-800 hover:bg-green-200">
                    🎭 {selectedGenre}
                  </Badge>
                )}
                {selectedCharacter && (
                  <Badge
                    variant="secondary"
                    className="animate-fadeIn bg-orange-100 text-orange-800 hover:bg-orange-200"
                  >
                    👤 {selectedCharacter}
                  </Badge>
                )}
                {selectedMood && (
                  <Badge variant="outline" className="animate-fadeIn bg-pink-50 text-pink-700 border-pink-200">
                    🎨 {selectedMood}
                  </Badge>
                )}
                {selectedStyle && (
                  <Badge variant="outline" className="animate-fadeIn bg-yellow-50 text-yellow-700 border-yellow-200">
                    ✍️ {selectedStyle}
                  </Badge>
                )}
                <Badge variant="outline" className="animate-fadeIn bg-gray-50 text-gray-700">
                  📏 {storyLengths.find((l) => l.value === selectedLength)?.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Story Display */}
        {generatedStory && (
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-gold bg-gradient-to-br from-white to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 animate-pulse text-purple-600" />
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {storyTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={toggleLike}
                    variant="ghost"
                    size="sm"
                    className={`gap-1 transition-all duration-300 hover:scale-110 ${liked ? "text-red-500 bg-red-50" : "text-gray-500"}`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? "fill-current animate-pulse" : ""}`} />
                    {liked ? "Loved" : "Love"}
                  </Button>

                  <Button
                    onClick={toggleBookmark}
                    variant="ghost"
                    size="sm"
                    className={`gap-1 transition-all duration-300 hover:scale-110 ${bookmarked ? "text-blue-500 bg-blue-50" : "text-gray-500"}`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                    {bookmarked ? "Saved" : "Save"}
                  </Button>

                  <Button
                    onClick={() => setSaveDialogOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:scale-110 transition-all duration-300 hover:bg-purple-50"
                  >
                    <Save className="w-4 h-4" />
                    Save to Collection
                  </Button>

                  <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 hover:scale-110 transition-all duration-300 hover:bg-green-50"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Share2 className="w-5 h-5" />
                          Share Your Masterpiece
                        </DialogTitle>
                        <DialogDescription>Spread the magic of your LoreLoom story</DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={copyToClipboard}
                          className="gap-2 justify-start hover:scale-105 transition-all"
                        >
                          <Copy className="w-4 h-4" />
                          Copy to Clipboard
                        </Button>
                        <Button
                          onClick={shareToTwitter}
                          className="gap-2 justify-start bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all"
                        >
                          <Twitter className="w-4 h-4" />
                          Share on Twitter
                        </Button>
                        <Button
                          onClick={shareToFacebook}
                          className="gap-2 justify-start bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all"
                        >
                          <Facebook className="w-4 h-4" />
                          Share on Facebook
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 hover:scale-110 transition-all duration-300 hover:bg-purple-50"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Comments ({comments.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg max-h-[600px] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5" />
                          Story Discussion
                        </DialogTitle>
                        <DialogDescription>Share your thoughts and connect with other readers</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="comment">Add your thoughts</Label>
                          <Textarea
                            id="comment"
                            placeholder="What did you think of this story? Any favorite moments?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <Button
                            onClick={addComment}
                            disabled={!comment.trim()}
                            className="gap-2 hover:scale-105 transition-all"
                          >
                            <Send className="w-4 h-4" />
                            Share Thoughts
                          </Button>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          {comments.length === 0 ? (
                            <div className="text-center py-8">
                              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                              <p className="text-muted-foreground">
                                No comments yet. Be the first to share your thoughts!
                              </p>
                            </div>
                          ) : (
                            comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border hover:shadow-md transition-all"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className="font-medium text-sm flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm leading-relaxed">{comment.text}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent hover:bg-green-50 transition-all duration-300 hover:scale-110"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => downloadStory("txt")} className="gap-2">
                        <FileText className="w-4 h-4" />
                        Text File (.txt)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadStory("html")} className="gap-2">
                        <FileText className="w-4 h-4" />
                        Web Page (.html)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Story Stats */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{currentStory?.stats.readTime || calculateReadTime(generatedStory)} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-green-500" />
                      <span>{currentStory?.stats.views || 1} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{currentStory?.stats.likes || 0} likes</span>
                    </div>
                  </div>

                  {/* Rating System */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Rate:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setStoryRating(star)}
                          className="transition-all duration-200 hover:scale-125"
                        >
                          <Star
                            className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && <span className="text-sm text-muted-foreground">({rating}/5)</span>}
                  </div>
                </div>

                {/* Story Images */}
                {currentStory?.images && currentStory.images.length > 0 && (
                  <div className="space-y-4">
                    {currentStory.images
                      .filter((img) => img.position === "top")
                      .map((image) => (
                        <div key={image.id} className="text-center">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.caption}
                            className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(image.caption)}`
                            }}
                          />
                          <p className="text-sm text-muted-foreground mt-2 italic">{image.caption}</p>
                        </div>
                      ))}
                  </div>
                )}

                {/* Story Content */}
                <div className="bg-white p-8 rounded-lg border-2 border-purple-100 shadow-inner">
                  <Textarea
                    value={generatedStory}
                    readOnly
                    className="min-h-[500px] text-base leading-relaxed resize-none border-none p-0 focus-visible:ring-0 font-serif"
                    style={{ fontFamily: "Georgia, serif" }}
                  />
                </div>

                {/* Story Metadata */}
                {currentStory?.elements && (
                  <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-4 rounded-lg border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {currentStory.elements.trope && (
                        <div>
                          <strong className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Trope:
                          </strong>
                          <span className="text-muted-foreground">{currentStory.elements.trope}</span>
                        </div>
                      )}
                      {currentStory.elements.theme && (
                        <div>
                          <strong className="flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            Theme:
                          </strong>
                          <span className="text-muted-foreground">{currentStory.elements.theme}</span>
                        </div>
                      )}
                      {currentStory.elements.genre && (
                        <div>
                          <strong className="flex items-center gap-1">
                            <Palette className="w-3 h-3" />
                            Genre:
                          </strong>
                          <span className="text-muted-foreground">{currentStory.elements.genre}</span>
                        </div>
                      )}
                      {currentStory.elements.character && (
                        <div>
                          <strong className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Character:
                          </strong>
                          <span className="text-muted-foreground">{currentStory.elements.character}</span>
                        </div>
                      )}
                    </div>
                    {(currentStory.elements.mood || currentStory.elements.style) && (
                      <div className="grid grid-cols-2 gap-4 text-sm mt-2 pt-2 border-t">
                        {currentStory.elements.mood && (
                          <div>
                            <strong className="flex items-center gap-1">
                              <Music className="w-3 h-3" />
                              Mood:
                            </strong>
                            <span className="text-muted-foreground">{currentStory.elements.mood}</span>
                          </div>
                        )}
                        {currentStory.elements.style && (
                          <div>
                            <strong className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              Style:
                            </strong>
                            <span className="text-muted-foreground">{currentStory.elements.style}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Story Dialog */}
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Story to Collection
              </DialogTitle>
              <DialogDescription>Choose a collection to organize your story</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Collection</Label>
                <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem key={collection.id} value={collection.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: collection.color }}></div>
                          {collection.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (currentStory) {
                      saveStory(currentStory, selectedCollection)
                      setSaveDialogOpen(false)
                      setSelectedCollection("")
                    }
                  }}
                  disabled={!selectedCollection}
                  className="flex-1"
                >
                  Save Story
                </Button>
                <Button variant="outline" onClick={() => setNewCollectionDialogOpen(true)} className="gap-1">
                  <Plus className="w-4 h-4" />
                  New
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* New Collection Dialog */}
        <Dialog open={newCollectionDialogOpen} onOpenChange={setNewCollectionDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5" />
                Create New Collection
              </DialogTitle>
              <DialogDescription>Organize your stories with custom collections</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="collection-name"
                  placeholder="My Amazing Stories"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-description">Description (optional)</Label>
                <Textarea
                  id="collection-description"
                  placeholder="A collection of my favorite stories..."
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-color">Collection Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="collection-color"
                    type="color"
                    value={newCollectionColor}
                    onChange={(e) => setNewCollectionColor(e.target.value)}
                    className="w-16 h-10"
                  />
                  <div className="flex gap-1">
                    {["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewCollectionColor(color)}
                        className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={createNewCollection} disabled={!newCollectionName.trim()} className="flex-1">
                  Create Collection
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewCollectionDialogOpen(false)
                    setNewCollectionName("")
                    setNewCollectionDescription("")
                    setNewCollectionColor("#8b5cf6")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                LoreLoom Settings
              </DialogTitle>
              <DialogDescription>Customize your creative writing experience</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Your Writing Statistics</Label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>{totalStoriesGenerated} Stories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span>{streakCount} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Library className="w-4 h-4 text-green-500" />
                    <span>{collections.length} Collections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span>{storyHistory.length} Total Stories</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.clear()
                    setStoryHistory([])
                    setCollections([])
                    setTotalStoriesGenerated(0)
                    setStreakCount(0)
                    setFavoriteGenre("")
                    toast({ title: "Data Cleared", description: "All LoreLoom data has been reset." })
                  }}
                  className="flex-1"
                >
                  Clear All Data
                </Button>
                <Button onClick={() => setSettingsDialogOpen(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Help & Tips */}
        <Card className="shadow-md bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500 animate-pulse" />
              LoreLoom Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 mt-0.5" />
                  Use AI generation for inspiration, then edit manually
                </p>
                <p className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                  Try the daily challenge for creative breakthroughs
                </p>
                <p className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                  Organize stories in collections by theme or genre
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-green-500 mt-0.5" />
                  Add AI-generated images to enhance your stories
                </p>
                <p className="flex items-start gap-2">
                  <BarChart3 className="w-4 h-4 text-orange-500 mt-0.5" />
                  Track your writing progress with built-in analytics
                </p>
                <p className="flex items-start gap-2">
                  <Share2 className="w-4 h-4 text-indigo-500 mt-0.5" />
                  Share your creations to inspire other writers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
