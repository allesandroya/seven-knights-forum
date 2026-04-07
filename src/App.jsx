import { useState } from "react";

// ─── DUMMY DATA (full control here) ───────────────────────────────
const USERS = {
  andi: { name: "Andi Pratama", avatar: "AP", role: "Admin", color: "#E85D3A" },
  sari: { name: "Sari Dewi", avatar: "SD", role: "Moderator", color: "#3A7BE8" },
  budi: { name: "Budi Santoso", avatar: "BS", role: "Member", color: "#8B5CF6" },
  rina: { name: "Rina Wulandari", avatar: "RW", role: "Member", color: "#10B981" },
  dimas: { name: "Dimas Aditya", avatar: "DA", role: "Member", color: "#F59E0B" },
  maya: { name: "Maya Anggraini", avatar: "MA", role: "Contributor", color: "#EC4899" },
};

const NEWS_DATA = [
  {
    id: 1,
    title: "Platform Update v2.5: New Threading System",
    excerpt: "We've completely revamped the threading system to allow nested replies up to 5 levels deep. This update also includes performance improvements and bug fixes.",
    author: "andi",
    date: "Mar 28, 2026",
    category: "Update",
    readTime: "3 min read",
    featured: true,
    image: "📦",
  },
  {
    id: 2,
    title: "Community Guidelines Refresh — What's Changed",
    excerpt: "After gathering feedback from over 500 members, we've updated our community guidelines to better reflect our values around respectful discourse.",
    author: "sari",
    date: "Mar 25, 2026",
    category: "Announcement",
    readTime: "5 min read",
    featured: false,
    image: "📋",
  },
  {
    id: 3,
    title: "Monthly Spotlight: Top Contributors of March",
    excerpt: "Recognizing the members who made our community better this month through quality posts, helpful answers, and positive engagement.",
    author: "sari",
    date: "Mar 22, 2026",
    category: "Community",
    readTime: "4 min read",
    featured: false,
    image: "🏆",
  },
  {
    id: 4,
    title: "Scheduled Maintenance — April 2nd",
    excerpt: "We'll be performing server maintenance on April 2nd from 02:00 to 06:00 UTC. The forum may be intermittently unavailable during this window.",
    author: "andi",
    date: "Mar 20, 2026",
    category: "Maintenance",
    readTime: "2 min read",
    featured: false,
    image: "🔧",
  },
  {
    id: 5,
    title: "Introducing Dark Mode and Theme Customization",
    excerpt: "You asked, we delivered. Dark mode is now available along with 6 custom accent color themes to personalize your forum experience.",
    author: "andi",
    date: "Mar 15, 2026",
    category: "Update",
    readTime: "3 min read",
    featured: false,
    image: "🌙",
  },
];

const FORUM_POSTS = [
  {
    id: 1,
    author: "budi",
    date: "Mar 29, 2026 · 10:34 AM",
    content: "Just tried the new threading system and it's a game changer! Finally can follow conversations properly without losing context. Great work to the dev team 👏",
    likes: 24,
    comments: 8,
    shares: 3,
    liked: false,
    tags: ["feedback", "update"],
    replies: [
      { author: "rina", content: "Agreed! The nested replies make discussions so much easier to follow.", date: "10:52 AM", likes: 7 },
      { author: "andi", content: "Thanks Budi! We've been working on this for months. More improvements coming soon.", date: "11:15 AM", likes: 12 },
    ],
  },
  {
    id: 2,
    author: "maya",
    date: "Mar 29, 2026 · 9:15 AM",
    content: "Hot take: The best way to learn programming is by building projects you actually care about, not following tutorials. I wasted 6 months on tutorial hell before I realized this.\n\nWhat finally worked for me:\n• Built a budget tracker (needed it IRL)\n• Made a recipe app for my mom\n• Created a study scheduler\n\nEach one taught me more than 50 tutorials combined.",
    likes: 89,
    comments: 34,
    shares: 21,
    liked: true,
    tags: ["programming", "advice"],
    replies: [
      { author: "dimas", content: "This is so true. I only really understood APIs when I built something that needed one.", date: "9:30 AM", likes: 15 },
      { author: "budi", content: "Tutorial hell is real 😭 Currently trying to break out of it", date: "9:45 AM", likes: 8 },
    ],
  },
  {
    id: 3,
    author: "rina",
    date: "Mar 28, 2026 · 6:20 PM",
    content: "Anyone else attending the local tech meetup next Saturday? Would love to meet some people from this community IRL! 📍 Surabaya Creative Hub, April 5th at 2PM",
    likes: 45,
    comments: 19,
    shares: 12,
    liked: false,
    tags: ["meetup", "networking"],
    replies: [
      { author: "maya", content: "Count me in! I'll bring stickers 🎉", date: "6:45 PM", likes: 9 },
    ],
  },
  {
    id: 4,
    author: "dimas",
    date: "Mar 28, 2026 · 2:10 PM",
    content: "Unpopular opinion: We should have a dedicated 'Beginner Questions' section with no judgment. I see too many newcomers getting shut down for asking basic stuff. We all started somewhere.",
    likes: 112,
    comments: 47,
    shares: 28,
    liked: false,
    tags: ["suggestion", "community"],
    replies: [
      { author: "sari", content: "Love this idea! I'll bring it up with the admin team. Creating safe spaces for learning is important.", date: "2:30 PM", likes: 22 },
      { author: "andi", content: "Already on our roadmap! We're planning a mentorship-style Q&A section for Q2.", date: "3:00 PM", likes: 35 },
    ],
  },
  {
    id: 5,
    author: "sari",
    date: "Mar 27, 2026 · 11:00 AM",
    content: "📊 Weekly community stats:\n\n• 342 new members this week (+18% from last week)\n• 1,247 posts created\n• 89% positive sentiment score\n• Most active topic: Web Development\n• Peak hours: 8-10 PM\n\nThis community keeps growing! Thank you all for making this a great place.",
    likes: 67,
    comments: 15,
    shares: 8,
    liked: true,
    tags: ["stats", "community"],
    replies: [],
  },
  {
    id: 6,
    author: "andi",
    date: "Mar 26, 2026 · 4:45 PM",
    content: "Quick poll: What feature should we prioritize next?\n\n🔔 Push notifications\n📱 Mobile app\n🎨 Profile customization\n📊 Analytics dashboard\n\nDrop your vote in the replies! We're listening.",
    likes: 78,
    comments: 62,
    shares: 15,
    liked: false,
    tags: ["poll", "feedback"],
    replies: [
      { author: "budi", content: "Mobile app 📱 all day! I browse this forum on my phone 90% of the time", date: "4:52 PM", likes: 28 },
      { author: "rina", content: "Profile customization! I want to show off my personality 🎨", date: "5:10 PM", likes: 14 },
      { author: "maya", content: "Push notifications would be great so I don't miss important threads", date: "5:22 PM", likes: 19 },
    ],
  },
];

const STATS = { members: "12,847", posts: "48,392", online: "234", topics: "3,128" };

const TRENDING = ["#WebDev", "#MobileApp", "#CommunityUpdate", "#TechMeetup", "#BeginnerFriendly"];

// ─── ICONS ────────────────────────────────────────────────────────
const Icons = {
  Home: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  News: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  Forum: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Heart: ({filled}) => <svg width="16" height="16" fill={filled ? "#E85D3A" : "none"} stroke={filled ? "#E85D3A" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Comment: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
  Share: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16,6 12,2 8,6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>,
  Search: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  TrendUp: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  ChevronRight: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"/></svg>,
  Users: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Zap: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
  Globe: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  Bookmark: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
};

// ─── AVATAR COMPONENT ─────────────────────────────────────────────
const Avatar = ({ userId, size = 40 }) => {
  const user = USERS[userId];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${user.color}, ${user.color}88)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.35,
      fontFamily: "'DM Sans', sans-serif", flexShrink: 0,
      boxShadow: `0 2px 8px ${user.color}33`,
    }}>{user.avatar}</div>
  );
};

// ─── ROLE BADGE ───────────────────────────────────────────────────
const RoleBadge = ({ role }) => {
  const colors = {
    Admin: { bg: "#FEE2E2", text: "#DC2626" },
    Moderator: { bg: "#DBEAFE", text: "#2563EB" },
    Contributor: { bg: "#FCE7F3", text: "#DB2777" },
    Member: { bg: "#F3F4F6", text: "#6B7280" },
  };
  const c = colors[role] || colors.Member;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
      background: c.bg, color: c.text, letterSpacing: "0.05em",
      textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
    }}>{role}</span>
  );
};

// ─── CATEGORY TAG ─────────────────────────────────────────────────
const CategoryTag = ({ label }) => {
  const palette = {
    Update: "#3B82F6", Announcement: "#8B5CF6", Community: "#10B981",
    Maintenance: "#F59E0B", feedback: "#3B82F6", update: "#3B82F6",
    programming: "#8B5CF6", advice: "#10B981", meetup: "#EC4899",
    networking: "#F59E0B", suggestion: "#3B82F6", community: "#10B981",
    stats: "#6366F1", poll: "#EF4444",
  };
  const color = palette[label] || "#6B7280";
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
      background: `${color}15`, color: color, fontFamily: "'DM Sans', sans-serif",
    }}>#{label}</span>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function ForumApp() {
  const [page, setPage] = useState("home");
  const [posts, setPosts] = useState(FORUM_POSTS);
  const [expandedPost, setExpandedPost] = useState(null);

  const toggleLike = (id) => {
    setPosts(p => p.map(post =>
      post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  return (
    <div style={{
      minHeight: "100vh", fontFamily: "'DM Sans', sans-serif",
      background: "#F8F6F3",
      color: "#1A1A1A",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet"/>

      {/* ─── HEADER ─────────────────────────────────── */}
      <header style={{
        background: "#1A1A1A", color: "#fff", position: "sticky", top: 0, zIndex: 100,
        borderBottom: "3px solid #E85D3A",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 60,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "#E85D3A",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 16, color: "#fff",
            }}>K</div>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20,
              letterSpacing: "-0.02em",
            }}>Komunitas</span>
          </div>

          <nav style={{ display: "flex", gap: 4 }}>
            {[
              { id: "home", label: "Home", icon: Icons.Home },
              { id: "news", label: "News", icon: Icons.News },
              { id: "forum", label: "Forum", icon: Icons.Forum },
            ].map(item => (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                background: page === item.id ? "#E85D3A" : "transparent",
                color: page === item.id ? "#fff" : "#999",
                fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
              }}>
                <item.icon/> {item.label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, background: "#2A2A2A",
              borderRadius: 8, padding: "6px 14px",
            }}>
              <Icons.Search/>
              <span style={{ color: "#666", fontSize: 13 }}>Search...</span>
            </div>
            <Avatar userId="andi" size={34}/>
          </div>
        </div>
      </header>

      {/* ─── PAGE CONTENT ───────────────────────────── */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {page === "home" && <HomePage setPage={setPage}/>}
        {page === "news" && <NewsPage/>}
        {page === "forum" && <ForumPage posts={posts} toggleLike={toggleLike} expandedPost={expandedPost} setExpandedPost={setExpandedPost}/>}
      </main>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1A1A1A 0%, #2D1B14 100%)",
        borderRadius: 20, padding: "56px 48px", marginBottom: 32,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -40, width: 300, height: 300,
          borderRadius: "50%", background: "#E85D3A22",
        }}/>
        <div style={{
          position: "absolute", bottom: -80, right: 100, width: 200, height: 200,
          borderRadius: "50%", background: "#E85D3A11",
        }}/>
        <div style={{ position: "relative" }}>
          <div style={{
            fontSize: 12, fontWeight: 700, color: "#E85D3A", letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 12,
          }}>Welcome to the community</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 800,
            color: "#fff", lineHeight: 1.15, marginBottom: 16, maxWidth: 550,
          }}>Where ideas spark and conversations thrive.</h1>
          <p style={{ color: "#999", fontSize: 16, lineHeight: 1.6, maxWidth: 480, marginBottom: 28 }}>
            Join thousands of members sharing knowledge, debating ideas, and building connections in our growing community.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setPage("forum")} style={{
              padding: "12px 28px", borderRadius: 10, border: "none",
              background: "#E85D3A", color: "#fff", fontWeight: 700, fontSize: 14,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>Enter Forum →</button>
            <button onClick={() => setPage("news")} style={{
              padding: "12px 28px", borderRadius: 10, border: "1px solid #444",
              background: "transparent", color: "#ccc", fontWeight: 600, fontSize: 14,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>Read News</button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32,
      }}>
        {[
          { icon: Icons.Users, label: "Members", value: STATS.members },
          { icon: Icons.Forum, label: "Posts", value: STATS.posts },
          { icon: Icons.Zap, label: "Online Now", value: STATS.online },
          { icon: Icons.Globe, label: "Topics", value: STATS.topics },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#fff", borderRadius: 16, padding: "24px",
            border: "1px solid #E8E4DF",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: i === 0 ? "#FEE2E2" : i === 1 ? "#DBEAFE" : i === 2 ? "#D1FAE5" : "#FEF3C7",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: i === 0 ? "#DC2626" : i === 1 ? "#2563EB" : i === 2 ? "#059669" : "#D97706",
            }}><s.icon/></div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#999", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Recent + Trending */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        {/* Recent Posts */}
        <div>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16,
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700 }}>Recent Discussions</h2>
            <button onClick={() => setPage("forum")} style={{
              fontSize: 13, color: "#E85D3A", fontWeight: 600, background: "none",
              border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", gap: 4,
            }}>View all <Icons.ChevronRight/></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FORUM_POSTS.slice(0, 4).map(post => (
              <div key={post.id} onClick={() => setPage("forum")} style={{
                background: "#fff", borderRadius: 14, padding: "20px",
                border: "1px solid #E8E4DF", cursor: "pointer",
                transition: "all 0.15s",
              }} onMouseOver={e => e.currentTarget.style.borderColor = "#E85D3A44"}
                 onMouseOut={e => e.currentTarget.style.borderColor = "#E8E4DF"}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Avatar userId={post.author} size={32}/>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{USERS[post.author].name}</span>
                    <span style={{ color: "#999", fontSize: 12, marginLeft: 8 }}>{post.date}</span>
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "#444", margin: 0 }}>
                  {post.content.length > 120 ? post.content.slice(0, 120) + "..." : post.content}
                </p>
                <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 4 }}>
                    <Icons.Heart filled={false}/> {post.likes}
                  </span>
                  <span style={{ fontSize: 12, color: "#999", display: "flex", alignItems: "center", gap: 4 }}>
                    <Icons.Comment/> {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Trending */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "24px",
            border: "1px solid #E8E4DF",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Icons.TrendUp/>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Trending</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TRENDING.map((tag, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 12px", borderRadius: 8, background: "#F8F6F3",
                }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "#E85D3A" }}>{tag}</span>
                  <span style={{ fontSize: 11, color: "#999" }}>{Math.floor(Math.random() * 200 + 50)} posts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Members */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "24px",
            border: "1px solid #E8E4DF",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Active Members</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(USERS).slice(0, 5).map(([id, user]) => (
                <div key={id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar userId={id} size={32}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
                    <div style={{ fontSize: 11, color: "#999" }}>{user.role}</div>
                  </div>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: "#10B981",
                  }}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NEWS PAGE ────────────────────────────────────────────────────
function NewsPage() {
  const featured = NEWS_DATA.find(n => n.featured);
  const rest = NEWS_DATA.filter(n => !n.featured);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800,
          marginBottom: 4,
        }}>News & Announcements</h1>
        <p style={{ color: "#999", fontSize: 14 }}>Stay updated with the latest from our community</p>
      </div>

      {/* Featured */}
      {featured && (
        <div style={{
          background: "linear-gradient(135deg, #1A1A1A, #2D1B14)", borderRadius: 20,
          padding: "48px", marginBottom: 32, display: "flex", gap: 40, alignItems: "center",
          border: "1px solid #333",
        }}>
          <div style={{ flex: 1 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#E85D3A", textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>Featured</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700,
              color: "#fff", lineHeight: 1.3, margin: "12px 0",
            }}>{featured.title}</h2>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{featured.excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar userId={featured.author} size={28}/>
              <span style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}>{USERS[featured.author].name}</span>
              <span style={{ color: "#666", fontSize: 12 }}>·</span>
              <span style={{ color: "#666", fontSize: 12 }}>{featured.date}</span>
              <span style={{ color: "#666", fontSize: 12 }}>·</span>
              <span style={{ color: "#666", fontSize: 12 }}>{featured.readTime}</span>
            </div>
          </div>
          <div style={{
            width: 140, height: 140, borderRadius: 20, background: "#E85D3A22",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 56, flexShrink: 0,
          }}>{featured.image}</div>
        </div>
      )}

      {/* News Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20,
      }}>
        {rest.map(article => (
          <div key={article.id} style={{
            background: "#fff", borderRadius: 16, padding: "28px",
            border: "1px solid #E8E4DF", cursor: "pointer", transition: "all 0.2s",
          }} onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
             onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ display: "flex", alignItems: "start", gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: "#F8F6F3",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, flexShrink: 0,
              }}>{article.image}</div>
              <div style={{ flex: 1 }}>
                <CategoryTag label={article.category}/>
                <h3 style={{
                  fontSize: 16, fontWeight: 700, lineHeight: 1.35, margin: "10px 0 8px",
                  fontFamily: "'Playfair Display', serif",
                }}>{article.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.5, margin: "0 0 14px" }}>
                  {article.excerpt.length > 100 ? article.excerpt.slice(0, 100) + "..." : article.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar userId={article.author} size={22}/>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>{USERS[article.author].name}</span>
                  <span style={{ fontSize: 11, color: "#bbb" }}>· {article.date}</span>
                  <span style={{ fontSize: 11, color: "#bbb", marginLeft: "auto" }}>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FORUM PAGE ───────────────────────────────────────────────────
function ForumPage({ posts, toggleLike, expandedPost, setExpandedPost }) {
  const [filter, setFilter] = useState("all");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
      {/* Main Feed */}
      <div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24,
        }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800 }}>Forum</h1>
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "trending", "latest"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                background: filter === f ? "#1A1A1A" : "#fff",
                color: filter === f ? "#fff" : "#666",
                fontWeight: 600, fontSize: 12, fontFamily: "'DM Sans', sans-serif",
                textTransform: "capitalize",
              }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Compose Box */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px",
          border: "1px solid #E8E4DF", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <Avatar userId="andi" size={38}/>
          <div style={{
            flex: 1, padding: "12px 16px", borderRadius: 10, background: "#F8F6F3",
            color: "#999", fontSize: 14,
          }}>What's on your mind?</div>
          <button style={{
            padding: "10px 22px", borderRadius: 10, border: "none",
            background: "#E85D3A", color: "#fff", fontWeight: 700, fontSize: 13,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Post</button>
        </div>

        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {posts.map(post => (
            <div key={post.id} style={{
              background: "#fff", borderRadius: 16, padding: "24px",
              border: "1px solid #E8E4DF", transition: "all 0.15s",
            }}>
              {/* Post Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Avatar userId={post.author} size={40}/>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{USERS[post.author].name}</span>
                    <RoleBadge role={USERS[post.author].role}/>
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{post.date}</div>
                </div>
                <button style={{
                  background: "none", border: "none", cursor: "pointer", color: "#ccc",
                  padding: 4,
                }}>
                  <Icons.Bookmark/>
                </button>
              </div>

              {/* Post Content */}
              <div style={{
                fontSize: 14, lineHeight: 1.65, color: "#333", marginBottom: 14,
                whiteSpace: "pre-wrap",
              }}>{post.content}</div>

              {/* Tags */}
              <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                {post.tags.map(tag => <CategoryTag key={tag} label={tag}/>)}
              </div>

              {/* Actions */}
              <div style={{
                display: "flex", alignItems: "center", gap: 24,
                paddingTop: 14, borderTop: "1px solid #F0EDE9",
              }}>
                <button onClick={() => toggleLike(post.id)} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer",
                  color: post.liked ? "#E85D3A" : "#999", fontWeight: 600, fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <Icons.Heart filled={post.liked}/> {post.likes}
                </button>
                <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer",
                  color: "#999", fontWeight: 600, fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <Icons.Comment/> {post.comments}
                </button>
                <button style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer",
                  color: "#999", fontWeight: 600, fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <Icons.Share/> {post.shares}
                </button>
              </div>

              {/* Replies */}
              {expandedPost === post.id && post.replies.length > 0 && (
                <div style={{
                  marginTop: 16, paddingTop: 16, borderTop: "1px solid #F0EDE9",
                  display: "flex", flexDirection: "column", gap: 14,
                }}>
                  {post.replies.map((reply, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 10, padding: "12px 14px",
                      background: "#FAFAF8", borderRadius: 12,
                    }}>
                      <Avatar userId={reply.author} size={30}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 12 }}>{USERS[reply.author].name}</span>
                          <span style={{ fontSize: 11, color: "#bbb" }}>{reply.date}</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{reply.content}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, color: "#bbb", fontSize: 12 }}>
                          <Icons.Heart filled={false}/> {reply.likes}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{
                    display: "flex", gap: 10, alignItems: "center",
                  }}>
                    <Avatar userId="andi" size={28}/>
                    <div style={{
                      flex: 1, padding: "10px 14px", borderRadius: 10,
                      background: "#F8F6F3", color: "#bbb", fontSize: 13,
                    }}>Write a reply...</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Community Info */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "24px",
          border: "1px solid #E8E4DF",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>About Community</h3>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.5, marginBottom: 16 }}>
            A space for developers, designers, and tech enthusiasts to share ideas and grow together.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#999" }}>Members</span>
              <span style={{ fontWeight: 700 }}>{STATS.members}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#999" }}>Online</span>
              <span style={{ fontWeight: 700, color: "#10B981" }}>{STATS.online}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#999" }}>Created</span>
              <span style={{ fontWeight: 700 }}>Jan 2024</span>
            </div>
          </div>
        </div>

        {/* Trending Tags */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "24px",
          border: "1px solid #E8E4DF",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Icons.TrendUp/>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Trending Tags</h3>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TRENDING.map((tag, i) => (
              <span key={i} style={{
                padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                background: "#F8F6F3", color: "#E85D3A", cursor: "pointer",
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "24px",
          border: "1px solid #E8E4DF",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Top Contributors</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { id: "maya", posts: 156 },
              { id: "budi", posts: 142 },
              { id: "dimas", posts: 128 },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 6, fontSize: 11, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: i === 0 ? "#FEF3C7" : i === 1 ? "#F3F4F6" : "#FED7AA",
                  color: i === 0 ? "#D97706" : i === 1 ? "#6B7280" : "#EA580C",
                }}>{i + 1}</span>
                <Avatar userId={c.id} size={28}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{USERS[c.id].name}</div>
                  <div style={{ fontSize: 11, color: "#999" }}>{c.posts} posts</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          fontSize: 11, color: "#bbb", lineHeight: 1.5, padding: "0 4px",
        }}>
          Terms · Privacy · Guidelines · About
          <br/>© 2026 Komunitas. All rights reserved.
        </div>
      </div>
    </div>
  );
}
