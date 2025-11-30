"use client";

export default function PostCard({ post, onLike }) {
  return (
    <article className="bg-white shadow rounded-xl p-6 space-y-3">
      <header className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
          {post.author?.name?.[0]?.toUpperCase() || "A"}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{post.author?.name || "Anonymous"}</p>
          <p className="text-xs text-gray-500">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Just now"}
          </p>
        </div>
      </header>

      <section>
        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
        <p className="text-gray-700 mt-1 whitespace-pre-line">{post.content}</p>
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="mt-3 rounded-lg w-full object-cover max-h-64"
          />
        ) : null}
      </section>

      <footer className="flex items-center justify-between text-sm text-gray-600">
        <button
          onClick={() => onLike?.(post.id)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
        >
          ❤️ {post.likes ?? 0} Likes
        </button>
      </footer>
    </article>
  );
}
