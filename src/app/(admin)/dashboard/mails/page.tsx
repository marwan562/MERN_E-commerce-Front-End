"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Archive,
  Clock,
  Forward,
  Inbox,
  MailOpen,
  MoreVertical,
  Reply,
  Search,
  Trash,
  Send,
  Paperclip,
  Smile,
  MessageSquare,
} from "lucide-react";

const emails = [
  {
    id: 1,
    sender: "William Smith",
    subject: "Meeting Tomorrow",
    preview:
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project...",
    time: "Oct 22, 2023 9:00:00 AM",
    read: false,
  },
  {
    id: 2,
    sender: "Alice Smith",
    subject: "Re: Project Update",
    preview:
      "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a...",
    time: "11 months ago",
    read: true,
    labels: ["important"],
  },
  {
    id: 3,
    sender: "Bob Johnson",
    subject: "Weekend Plans",
    preview:
      "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor...",
    time: "over 1 year ago",
    read: true,
    labels: ["personal"],
  },
  {
    id: 4,
    sender: "Emily Davis",
    subject: "Re: Question about Budget",
    preview:
      "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources...",
    time: "over 1 year ago",
    read: true,
    labels: ["work", "budget"],
  },
  {
    id: 5,
    sender: "Michael Wilson",
    subject: "Important Announcement",
    preview:
      "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the...",
    time: "over 1 year ago",
    read: true,
    labels: ["meeting", "work", "important"],
  },
];

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "Alice",
    content: "Hey there! How's it going?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "Bob",
    content: "Hi Alice! I'm doing great, thanks for asking. How about you?",
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    sender: "Alice",
    content:
      "I'm good too! Just working on some new projects. Anything exciting on your end?",
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    sender: "Bob",
    content:
      "Actually, yes! I'm planning a trip to Japan next month. Have you ever been?",
    timestamp: "10:08 AM",
  },
  {
    id: 5,
    sender: "Alice",
    content:
      "Wow, that's awesome! I've never been, but it's definitely on my bucket list. You'll have to tell me all about it when you get back!",
    timestamp: "10:10 AM",
  },
];

export default function Component() {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessages(initialMessages);
      setLoading(false);
    }, 2000);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Inbox</h2>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Inbox className="mr-2 h-4 w-4" />
              All mail
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MailOpen className="mr-2 h-4 w-4" />
              Unread
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Input className="w-64 mr-2" placeholder="Search" type="search" />
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Clock className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex">
          {!showChat ? (
            <>
              <ScrollArea className="w-1/3 border-r">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-4 border-b cursor-pointer ${
                      email.id === selectedEmail.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold">{email.sender}</div>
                      <div className="text-xs text-muted-foreground">
                        {email.time}
                      </div>
                    </div>
                    <div className="text-sm font-medium mb-1">
                      {email.subject}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {email.preview}
                    </div>
                    {email.labels && (
                      <div className="mt-2 space-x-2">
                        {email.labels.map((label) => (
                          <Badge key={label} variant="secondary">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Reply className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Forward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={selectedEmail.sender}
                    />
                    <AvatarFallback>{selectedEmail.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{selectedEmail.sender}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedEmail.time}
                    </div>
                  </div>
                </div>
                <div className="text-sm">{selectedEmail.preview}</div>
                <div className="mt-6">
                  <Input
                    className="w-full"
                    placeholder={`Reply ${selectedEmail.sender}...`}
                  />
                  <div className="flex justify-between mt-2">
                    <Button>Send</Button>
                    <Button variant="ghost">Mute this thread</Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${
                        message.sender === "You" ? "justify-end" : ""
                      }`}
                    >
                      <div
                        className={`flex items-end space-x-2 ${
                          message.sender === "You"
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        {message.sender !== "You" && (
                          <Avatar>
                            <AvatarFallback>{message.sender[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.sender === "You"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{message.content}</p>
                          <span className="text-xs text-muted-foreground block mt-1">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
              <div className="p-4 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex space-x-2"
                >
                  <Button type="button" size="icon" variant="ghost">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" size="icon" variant="ghost">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button type="submit">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
