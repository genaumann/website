'use client'

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import {createQueryString} from '@/lib/url'

type TabsContextType = {
  registerTab: (id: string, title: string) => void
  activeTab: string
}

const TabsContext = createContext<TabsContextType>({
  registerTab: () => {},
  activeTab: ''
})

export function Tabs({children, id}: {children: ReactNode; id: string}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState<string>('')
  const [tabs, setTabs] = useState<Array<{id: string; title: string}>>([])
  const [initialized, setInitialized] = useState(false)

  const updateActiveTab = (value: string) => {
    const tabPosition = tabs.findIndex(tab => tab.id === value)
    if (tabPosition === -1) return

    const params = createQueryString(searchParams, id, tabPosition.toString())

    router.push(`${pathname}?${params}`, {scroll: false})
    setActiveTab(value)
  }

  const registerTab = (id: string, title: string) => {
    setTabs(prevTabs => {
      if (!prevTabs.some(tab => tab.id === id)) {
        return [...prevTabs, {id, title}]
      }
      return prevTabs
    })
  }

  useEffect(() => {
    if (tabs.length > 0 && !initialized) {
      const tabParam = searchParams.get(id)

      if (tabParam !== null) {
        const tabPosition = Number.parseInt(tabParam, 10)
        if (
          !isNaN(tabPosition) &&
          tabPosition >= 0 &&
          tabPosition < tabs.length
        ) {
          setActiveTab(tabs[tabPosition].id)
        } else {
          setActiveTab(tabs[0].id)
        }
      } else {
        setActiveTab(tabs[0].id)
      }

      setInitialized(true)
    }
  }, [tabs, searchParams, id, initialized])

  const activeTabTitle = tabs.find(tab => tab.id === activeTab)?.title || ''

  return (
    <TabsContext.Provider value={{registerTab, activeTab}}>
      <ShadcnTabs value={activeTab} onValueChange={updateActiveTab}>
        {/* Mobile: Select Dropdown */}
        <div className="block sm:hidden w-full mb-2">
          <Select value={activeTab} onValueChange={updateActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tab">
                {activeTabTitle}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tabs.map(tab => (
                <SelectItem key={tab.id} value={tab.id}>
                  {tab.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: Tabs List */}
        <TabsList className="hidden sm:flex sm:flex-row w-full gap-2 h-9 bg-card">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="sm:grow w-full text-foreground data-[state=active]:bg-primary/20 data-[state=active]:text-background-foreground">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {children}
      </ShadcnTabs>
    </TabsContext.Provider>
  )
}

export function TabItem({
  children,
  title,
  value
}: {
  children: ReactNode
  title: string
  value?: string
}) {
  const {registerTab, activeTab} = useContext(TabsContext)
  const id = value || title.toLowerCase().replace(/\s+/g, '-')

  useEffect(() => {
    registerTab(id, title)
  }, [id, title, registerTab])

  return (
    <TabsContent value={id} className="mt-2">
      {children}
    </TabsContent>
  )
}
