import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHelmet from "@/components/SEOHelmet";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, Search } from "lucide-react";
import { blogData } from "./BlogPost";

const categories = ["All", ...Array.from(new Set(blogData.map(b => b.category)))];

const Resources = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogData.filter(b => {
    const matchesSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === "All" || b.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHelmet
        title="Resources & Blog | In-Sync CRM"
        description="Insights on CRM, AI, field force management, and sales automation from the In-Sync team."
        keywords="CRM blog, sales automation, AI CRM, field force management"
      />
      <div className="min-h-screen bg-background">
        <div className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Resources & Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights on CRM, AI automation, field operations, and more.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No articles match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2">{post.category}</Badge>
                    <h2 className="text-lg font-semibold leading-tight line-clamp-2">{post.title}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Resources;
