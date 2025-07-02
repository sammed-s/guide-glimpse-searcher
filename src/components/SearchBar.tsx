import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center space-x-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for user guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 pr-4 py-3 text-lg border-2 border-brand-accent focus:border-brand-primary transition-colors rounded-xl shadow-card"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        </div>
        <Button 
          onClick={handleSearch}
          disabled={!searchTerm.trim()}
          variant="professional"
          size="lg"
          className="px-8 py-3 text-lg rounded-xl"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;