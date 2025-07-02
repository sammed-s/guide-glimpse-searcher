import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryResult {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  timestamp: string;
}

const CategoryResults = () => {
  const { category } = useParams<{ category: string }>();
  const [results, setResults] = useState<CategoryResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      // Mock API call - replace with your actual API
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const mockResults: CategoryResult[] = [
        {
          id: "1",
          title: `${category} Fundamentals`,
          description: `Master the core concepts and fundamentals of ${category} development.`,
          keywords: ["beginner", "fundamentals", "basics"],
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "2", 
          title: `Advanced ${category} Patterns`,
          description: `Learn advanced patterns and best practices for ${category} development.`,
          keywords: ["advanced", "patterns", "best practices"],
          timestamp: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: "3",
          title: `${category} Performance Optimization`,
          description: `Optimize your ${category} applications for better performance and user experience.`,
          keywords: ["performance", "optimization", "speed"],
          timestamp: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          id: "4",
          title: `${category} Testing Strategies`,
          description: `Comprehensive guide to testing ${category} applications effectively.`,
          keywords: ["testing", "quality", "reliability"],
          timestamp: new Date(Date.now() - 345600000).toISOString(),
        },
        {
          id: "5",
          title: `${category} Deployment Guide`,
          description: `Step-by-step guide to deploying ${category} applications to production.`,
          keywords: ["deployment", "production", "devops"],
          timestamp: new Date(Date.now() - 432000000).toISOString(),
        },
      ];
      
      setResults(mockResults);
      setLoading(false);
    };

    if (category) {
      fetchResults();
    }
  }, [category]);

  const handleResultClick = (result: CategoryResult) => {
    window.location.href = `/${result.id}/${encodeURIComponent(category || '')}`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const capitalizeCategory = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {capitalizeCategory(category || '')} Articles
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {capitalizeCategory(category || '')} Articles
          </h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `Found ${results.length} articles in ${capitalizeCategory(category || '')}`}
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
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

export default CategoryResults;