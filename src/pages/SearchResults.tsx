import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  timestamp: string;
}

const SearchResults = () => {
  const { term } = useParams<{ term: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      // Mock API call - replace with your actual API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: `Getting Started with ${term}`,
          description: `Comprehensive guide to help you begin your journey with ${term}. Learn the basics and fundamental concepts.`,
          keywords: ["beginner", "tutorial", "basics"],
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: "2", 
          title: `Advanced ${term} Techniques`,
          description: `Deep dive into advanced concepts and professional techniques for ${term} users.`,
          keywords: ["advanced", "professional", "techniques"],
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
        {
          id: "3",
          title: `Best Practices for ${term}`,
          description: `Learn industry best practices and avoid common pitfalls when working with ${term}.`,
          keywords: ["best practices", "tips", "optimization"],
          timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        },
        {
          id: "4",
          title: `Troubleshooting ${term} Issues`,
          description: `Common problems and their solutions. A complete troubleshooting guide for ${term}.`,
          keywords: ["troubleshooting", "problems", "solutions"],
          timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        },
      ];
      
      setResults(mockResults);
      setLoading(false);
    };

    if (term) {
      fetchResults();
    }
  }, [term]);

  const handleResultClick = (result: SearchResult) => {
    navigate(`/${result.id}/${encodeURIComponent(term || '')}`);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Search Results for "{term}"
          </h1>
          <p className="text-muted-foreground">
            {loading ? "Searching..." : `Found ${results.length} results`}
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((result) => (
              <Card 
                key={result.id}
                className="cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-brand-primary"
                onClick={() => handleResultClick(result)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-brand-primary hover:text-brand-primary-hover transition-colors flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {result.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base leading-relaxed">
                        {result.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(result.timestamp)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;