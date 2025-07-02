import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";

const themes = [
  { name: "Modern Blue", class: "", color: "bg-blue-500" },
  { name: "Elegant Purple", class: "theme-purple", color: "bg-purple-500" },
  { name: "Professional Teal", class: "theme-teal", color: "bg-teal-500" },
  { name: "Warm Orange", class: "theme-orange", color: "bg-orange-500" },
  { name: "Minimalist Gray", class: "theme-minimal", color: "bg-gray-700" },
];

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const handleThemeChange = (theme: typeof themes[0]) => {
    // Remove all theme classes
    themes.forEach(t => {
      if (t.class) document.body.classList.remove(t.class);
    });
    
    // Add new theme class
    if (theme.class) {
      document.body.classList.add(theme.class);
    }
    
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 shadow-elegant">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Choose Design</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleThemeChange(theme)}
                  className="w-full justify-start"
                >
                  <div className={`w-4 h-4 rounded-full mr-2 ${theme.color}`} />
                  {theme.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="professional"
        className="rounded-full shadow-elegant"
      >
        <Palette className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ThemeSelector;