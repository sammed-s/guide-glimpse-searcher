import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

interface ArticleDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
  timestamp: string;
  author: string;
  readTime: number;
}

const ArticleDetail = () => {
  const { id, searchTerm } = useParams<{ id: string; searchTerm: string }>();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      
      // Mock API call - replace with your actual API
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
      
      const mockArticle: ArticleDetail = {
        id: id || "1",
        title: `Getting Started with ${searchTerm}`,
        description: `Comprehensive guide to help you begin your journey with ${searchTerm}. Learn the basics and fundamental concepts.`,
        content: `
          <h2>Introduction</h2>
          <p>Welcome to this comprehensive guide about ${searchTerm}. This article will cover everything you need to know to get started.</p>
          
          <h2>Prerequisites</h2>
          <p>Before diving into ${searchTerm}, you should have:</p>
          <ul>
            <li>Basic understanding of web technologies</li>
            <li>A computer with internet access</li>
            <li>Willingness to learn</li>
          </ul>
          
          <h2>Getting Started</h2>
          <p>The first step in learning ${searchTerm} is understanding its core concepts. Let's break this down into manageable sections.</p>
          
          <h3>Core Concepts</h3>
          <p>Understanding the fundamental principles is crucial for success with ${searchTerm}. Here are the key concepts you need to master:</p>
          
          <h3>Best Practices</h3>
          <p>Following industry best practices will help you avoid common pitfalls and create more maintainable solutions.</p>
          
          <h2>Next Steps</h2>
          <p>Once you've mastered the basics, you can move on to more advanced topics. Consider exploring our advanced guides and tutorials.</p>
          
          <h2>Conclusion</h2>
          <p>This guide provided a solid foundation for working with ${searchTerm}. Practice regularly and don't hesitate to refer back to this guide as needed.</p>
        `,
        keywords: ["beginner", "tutorial", "basics"],
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        author: "Guide Expert",
        readTime: 8,
      };
      
      setArticle(mockArticle);
      setLoading(false);
    };

    if (id && searchTerm) {
      fetchArticle();
    }
  }, [id, searchTerm]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-muted rounded w-full mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to={searchTerm ? `/search/${searchTerm}` : "/"}>
            <Button variant="professional">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to={searchTerm ? `/search/${searchTerm}` : "/"}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.description}
              </p>
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t pt-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {formatDate(article.timestamp)}
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                {article.readTime} min read
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-4">
              {article.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="shadow-card">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.7',
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleDetail;