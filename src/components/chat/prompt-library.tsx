"use client"

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { promptLibrary, categories, type PromptTemplate } from '@/constants/prompt-library';
import { Copy, Sparkles, Code2, Briefcase, GraduationCap, Lightbulb, Palette } from 'lucide-react';
// Using simple feedback instead of toast

interface PromptLibraryProps {
  onPromptSelect: (prompt: string) => void;
}

const categoryIcons = {
  technical: Code2,
  creative: Palette,
  business: Briefcase,
  educational: GraduationCap,
  general: Lightbulb,
};

export default function PromptLibrary({ onPromptSelect }: PromptLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'text-to-json' | 'enhanced'>('text-to-json');

  const filteredPrompts = useMemo(() => {
    if (selectedCategory === 'all') return promptLibrary;
    return promptLibrary.filter(prompt => prompt.category === selectedCategory);
  }, [selectedCategory]);

  const handlePromptSelect = (prompt: PromptTemplate) => {
    const selectedPrompt = activeTab === 'text-to-json' 
      ? prompt.textToJsonPrompt 
      : prompt.enhancedPrompt;
    
    onPromptSelect(selectedPrompt);
  };

  const handleCopyPrompt = (prompt: PromptTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    const selectedPrompt = activeTab === 'text-to-json' 
      ? prompt.textToJsonPrompt 
      : prompt.enhancedPrompt;
    
    navigator.clipboard.writeText(selectedPrompt);
  };

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons] || Lightbulb;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Prompt Library</h2>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-2">
                  {category.id !== 'all' && getCategoryIcon(category.id)}
                  {category.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'text-to-json' | 'enhanced')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text-to-json" className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            Text to JSON
          </TabsTrigger>
          <TabsTrigger value="enhanced" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Enhanced Prompts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text-to-json" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a prompt to convert plain text requests into structured JSON format
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((prompt) => (
              <Card 
                key={prompt.id} 
                className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
                onClick={() => handlePromptSelect(prompt)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(prompt.category)}
                      <CardTitle className="text-sm font-medium">{prompt.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleCopyPrompt(prompt, e)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardDescription className="text-xs">{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {prompt.textToJsonPrompt}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {prompt.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          +{prompt.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enhanced" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a prompt to get enhanced, detailed versions with more context and clarity
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrompts.map((prompt) => (
              <Card 
                key={prompt.id} 
                className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
                onClick={() => handlePromptSelect(prompt)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(prompt.category)}
                      <CardTitle className="text-sm font-medium">{prompt.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleCopyPrompt(prompt, e)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardDescription className="text-xs">{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {prompt.enhancedPrompt}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {prompt.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          +{prompt.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No prompts found in this category</p>
        </div>
      )}
    </div>
  );
}
