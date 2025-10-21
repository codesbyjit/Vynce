# 🗨️ Vynce

**Vynce** is a next-gen, real-time chat application built to redefine seamless digital conversations. Designed for speed, simplicity, and scalability — it merges human-like interaction with modern tech precision.

---

## ⚙️ Tech Stack

| Layer | Technology | Description |
|:------|:------------|:-------------|
| 🧠 Backend | **Node.js** | Handles API routes, real-time sockets, and data flow. |
| 💻 Frontend | **Next.js** | Modern React framework for fast, dynamic UI and SSR support. |
| 🚀 Monorepo | **Turborepo** | Efficient monorepo management for scalable development. |
| ⚡ State & Cache | **Redis (via Aiven)** | High-performance state management and pub/sub messaging. |

---

## 🧩 Structure

```
vynce/
 ├── apps/
 │   ├── frontend/    # Next.js client app
 │   └── backend/     # Node.js server
 ├── packages/
 │   ├── ui/          # Shared UI components
 │   └── utils/       # Shared logic, hooks, constants
 ├── turbo.json       # Turborepo configuration
 ├── README.md
 └── package.json
```
---

## 🎨 Theme (Light & Clean)

| Element | Color | Hex |
|----------|--------|------|
| Primary | Sky Blue | `#3B82F6` |
| Accent | Soft Purple | `#A78BFA` |
| Background | Off-White | `#F9FAFB` |
| Surface | White | `#FFFFFF` |
| Text (Primary) | Charcoal | `#1F2937` |
| Text (Secondary) | Cool Gray | `#6B7280` |
| Border / Divider | Light Gray | `#E5E7EB` |
| Success | Emerald | `#10B981` |
| Error | Rose | `#F43F5E` |

---

## 🚧 Roadmap

- [ ] Implement secure user authentication  
- [ ] Integrate Redis Pub/Sub for live messaging  
- [ ] Build responsive chat UI with message threads  
- [ ] Add media upload and emoji reactions  
- [ ] Deploy scalable monorepo to cloud

---

## 🧠 Vision

Vynce isn’t just another chat app — it’s a step toward **human-centered communication** powered by modern technology.  
Fast. Lightweight. Personal.
