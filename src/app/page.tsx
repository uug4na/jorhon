'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarProvider,
} from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'

const foodCategories = [
    'Restaurant 1',
    'Restaurant 2',
    'Restaurant 3',
    'Restaurant 4',
    'Restaurant 5',
    'Restaurant 6',
]

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState(foodCategories[0])
    const [messages, setMessages] = useState<{ text: string; image?: string }[]>([])
    const [inputText, setInputText] = useState('')
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const handleSendMessage = () => {
        if (inputText.trim() || selectedImage) {
            const newMessage = { text: inputText.trim(), image: selectedImage ? URL.createObjectURL(selectedImage) : undefined }
            console.log(newMessage.image) // Log the image URL
            setMessages((prevMessages) => [...prevMessages, newMessage])
            setInputText('')
            setSelectedImage(null)
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0])
        }
    }

    return (
        <div className='flex'>
            <div>
                <SidebarProvider>
                    <div className="flex h-screen bg-gray-100">
                        <Sidebar className="border-r">
                            <SidebarHeader className="px-4 py-2">
                                <h2 className="text-xl font-bold">Restaurant Categories</h2>
                            </SidebarHeader>
                            <SidebarContent>
                                <ScrollArea className="h-[calc(100vh-5rem)]">
                                    {foodCategories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={selectedCategory === category ? 'secondary' : 'ghost'}
                                            className="w-full justify-start"
                                            onClick={() => setSelectedCategory(category)}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </ScrollArea>
                            </SidebarContent>
                        </Sidebar>
                    </div>
                </SidebarProvider>
            </div>
            <div className="flex-1 flex flex-col h-screen p-4 bg-white">
                <div className="text-xl font-bold mb-4">Jorhon AI</div>
                <ScrollArea className="flex-1 bg-gray-50 p-4 mb-4 rounded overflow-y-auto">
                    {messages.map((message, index) => (
                        <div key={index} className="mb-2 p-2 bg-blue-100 rounded">
                            <p>{message.text}</p>
                            {message.image && <Image src={message.image} alt="Attachment" width={200} height={200} className="mt-2 max-w-xs rounded" />
                            }
                        </div>
                    ))}
                </ScrollArea>

                <div className="flex items-center space-x-2">
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendMessage()
                        }}
                        placeholder="Type your message..."
                        className="flex-1"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                    />

                    <Button onClick={handleSendMessage}>Send</Button>
                </div>

            </div>
        </div>
    )
}
