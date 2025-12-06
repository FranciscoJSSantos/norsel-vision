import { Calendar, User, Tag, Eye, Clock } from "lucide-react";
import type { PostDetail } from "@/types/blog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  post: PostDetail;
  onClick?: () => void;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  const formattedDate = format(new Date(post.created_at), "dd 'de' MMMM, yyyy", {
    locale: ptBR,
  });

  return (
    <article
      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Featured Image */}
      {post.featured_image ? (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Tag className="w-16 h-16 text-primary/40" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {post.category && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
              <Tag className="w-3.5 h-3.5" />
              {post.category.name}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>

          {post.reading_time && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.reading_time} min
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-heading font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author & Views */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            )}
            <span className="text-sm font-medium text-foreground">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            {post.views}
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
              >
                #{tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
