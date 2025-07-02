import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ThemeSelector from "@/components/ThemeSelector";

const Index = () => {
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
