import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  ruleReference?: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Railway Rules Assistant. I can help you find specific rules, explain procedures, or analyze scenarios. Try asking me about timing regulations or operational procedures.",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
        ruleReference: inputValue.toLowerCase().includes("timing") ? "4.01" : undefined,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("timing") || lowerInput.includes("4.01")) {
      return "According to Rule 4.01 (Standard Time): The working of trains between stations shall be regulated by the standard time prescribed by the Government of India, which shall be transmitted daily to all principal stations at 16:00 hours in the manner prescribed. This ensures synchronized operations across the entire network.";
    }
    
    if (lowerInput.includes("advertised") || lowerInput.includes("4.02")) {
      return "Rule 4.02 (Adherence to Advertised Time): No passenger train or mixed train shall be dispatched from a station before the advertised time. This rule is crucial for maintaining passenger confidence and operational predictability.";
    }
    
    if (lowerInput.includes("watch") || lowerInput.includes("4.03")) {
      return "Rule 4.03 (Setting Watch): Before a train starts from a terminal or crew-changing station, the Guard shall set his watch by the station clock or the clock at the crew lobby to ensure accurate timekeeping throughout the journey.";
    }
    
    if (lowerInput.includes("scenario") || lowerInput.includes("delay")) {
      return "For delay scenarios, multiple rules apply: Check Rule 4.02 for departure restrictions, Rule 4.01 for time synchronization requirements, and ensure proper communication protocols are followed. Would you like me to elaborate on any specific aspect?";
    }
    
    return "I understand your query about railway operations. Could you please be more specific about which rule or operational scenario you'd like me to help with? I have comprehensive knowledge of all railway rules and procedures.";
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-lg border border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-full">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardTitle className="text-sm">Rules Assistant</CardTitle>
              <Badge className="bg-success/10 text-success">Online</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] shadow-lg border border-primary/20 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary p-1.5 rounded-full">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <CardTitle className="text-sm">Railway Rules Assistant</CardTitle>
            <Badge className="bg-success/10 text-success">Online</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-3">
        <ScrollArea className="flex-1 mb-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm">{message.content}</p>
                      {message.ruleReference && (
                        <Badge className="mt-2 bg-accent text-accent-foreground">
                          Rule {message.ruleReference}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="flex space-x-2">
          <Input
            placeholder="Ask about railway rules..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}