import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ConnectChannelModal from "@/components/ConncetChanel";
import NavBar from "@/layouts/NavBar";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Plus,
  MoreVertical,
  Settings,
  Unlink,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import axios from "axios";

interface Channel {
  id: string;
  platform: string;
  username: string;
  name: string;
  email?: string;
  avatar?: string;
  connected_at: string;
}

interface ConnectedAccountsPageProps {
  channels: Channel[];
}

const socialPlatforms = [
  { name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Twitter", icon: Twitter, color: "bg-black" },
  { name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
  { name: "YouTube", icon: Youtube, color: "bg-red-600" },
];

export default function ConnectedAccountsPage({ channels = [] }: ConnectedAccountsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getPlatformIcon = (platform: string) => {
    const platformData = socialPlatforms.find((p) => 
      p.name.toLowerCase() === platform.toLowerCase()
    );
    return platformData?.icon || null;
  };

  const getPlatformColor = (platform: string) => {
    const platformData = socialPlatforms.find((p) => p.name === platform);
    return platformData?.color || "bg-gray-500";
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      const response = await axios.delete(`/channels/${accountId}`);
      
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  return (
    <NavBar title="Connected Accounts">
      <div className="flex flex-col min-h-screen bg-white">
        {/* Top Navigation */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <h2 className="text-xl font-semibold">Your Connected Accounts</h2>
              <Button onClick={openModal}>
                <Plus className="h-4 w-4 mr-1" />
                Connect a Channel
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {channels.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-blue-50 p-6 rounded-full mb-4">
                <Plus className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-lg font-medium mb-2">No accounts connected</h2>
              <p className="text-gray-500 mb-6">Connect a channel to start managing your social media</p>
              <Button onClick={openModal}>
                <Plus className="h-4 w-4 mr-1" />
                Connect a Channel
              </Button>
            </div>
          ) : (
            /* Connected Accounts List */
            <div className="grid gap-4">
              {channels.map((channel) => {
                const Icon = getPlatformIcon(channel.platform);

                return (
                  <Card key={channel.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${getPlatformColor(channel.platform)}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <Avatar>
                            <AvatarImage src={channel.avatar || undefined} alt={channel.name} />
                            <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{channel.name}</h3>
                            <p className="text-sm text-muted-foreground">{channel.username}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-muted-foreground">
                                Connected on {new Date(channel.connected_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Connected
                          </Badge>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDisconnect(channel.id)}
                              >
                                <Unlink className="h-4 w-4 mr-2" />
                                Disconnect
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Connect Channel Modal */}
      <ConnectChannelModal isOpen={isModalOpen} onClose={closeModal} />
    </NavBar>
  );
}