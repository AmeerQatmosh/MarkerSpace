import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bookmark, Star, Tag } from "lucide-react";

interface TagStat {
  _id: string;
  count: number;
}

const Insights = () => {
  const { token } = useAuth();

  const [totalBookmarks, setTotalBookmarks] = useState(0);
  const [favoriteBookmarks, setFavoriteBookmarks] = useState(0);
  const [topTags, setTopTags] = useState<TagStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const overviewRes = await fetch(
          "http://localhost:5000/api/stats/overview",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const overviewData = await overviewRes.json();
        setTotalBookmarks(overviewData.total);
        setFavoriteBookmarks(overviewData.favorites);

        const tagsRes = await fetch("http://localhost:5000/api/stats/tags", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tagsData = await tagsRes.json();
        setTopTags(tagsData);
      } catch (err) {
        console.error("Failed to fetch insights", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="min-h-screen p-7 bg-background text-foreground">

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <p className="text-muted-foreground text-lg">
            Loading insights…
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-xl shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center gap-3">
                <Bookmark className="w-6 h-6 text-primary" />
                <CardTitle>Total Bookmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{totalBookmarks}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  All saved bookmarks
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <CardTitle>Favorite Bookmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{favoriteBookmarks}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Marked as important
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Tags */}
          <Card className="rounded-xl shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Tag className="w-6 h-6 text-primary" />
              <CardTitle>Top Tags</CardTitle>
            </CardHeader>

            <CardContent>
              {topTags.length === 0 ? (
                <p className="text-muted-foreground">
                  You haven’t used any tags yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {topTags
                    .sort((a, b) => b.count - a.count)
                    .map((tag) => (
                      <span
                        key={tag._id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-muted hover:bg-muted/80 transition"
                      >
                        <span className="font-medium">{tag._id}</span>
                        <span className="text-xs text-muted-foreground">
                          {tag.count}
                        </span>
                      </span>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Insights;
