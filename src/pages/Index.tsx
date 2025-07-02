import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ThemeSelector from "@/components/ThemeSelector";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find the Perfect
              <span className="bg-gradient-primary bg-clip-text text-transparent block">
                User Guide
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Search through thousands of comprehensive guides and tutorials. 
              Get the help you need, when you need it.
            </p>
          </div>
          
          <SearchBar />
          
          {/* Categories Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { name: "React", icon: "⚛️", count: "150+ guides" },
                { name: "JavaScript", icon: "🟨", count: "200+ guides" },
                { name: "Python", icon: "🐍", count: "180+ guides" },
                { name: "API", icon: "🔌", count: "120+ guides" },
                { name: "Database", icon: "🗄️", count: "90+ guides" },
                { name: "DevOps", icon: "⚙️", count: "80+ guides" }
              ].map((category) => (
                <div
                  key={category.name}
                  onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                  className="bg-card border border-border rounded-xl p-6 text-center cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>Popular searches:</span>
            <span className="text-brand-primary hover:text-brand-primary-hover cursor-pointer transition-colors">
              React
            </span>
            •
            <span className="text-brand-primary hover:text-brand-primary-hover cursor-pointer transition-colors">
              JavaScript
            </span>
            •
            <span className="text-brand-primary hover:text-brand-primary-hover cursor-pointer transition-colors">
              Python
            </span>
            •
            <span className="text-brand-primary hover:text-brand-primary-hover cursor-pointer transition-colors">
              API
            </span>
          </div>
        </div>
      </div>
      
      <ThemeSelector />
    </div>
  );
};

export default Index;
