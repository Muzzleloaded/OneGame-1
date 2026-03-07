# One Game — The Human Tradition Facilitator

A coaching and facilitation tool based on the Human Tradition framework from *One Game* by Jase Berger.

## Project Structure

```
one-game-facilitator/
├── api/
│   └── chat.js          ← Server function (keeps your API key safe)
├── public/
│   └── index.html       ← The app (everything in one file)
├── vercel.json          ← Routing config
├── package.json
└── README.md
```

## Deployment Steps

### 1. Upload to GitHub

1. Go to github.com and sign in
2. Click the **+** button (top right) → **New repository**
3. Name it `one-game-facilitator`
4. Keep it **Public** or **Private** (your choice)
5. Click **Create repository**
6. On the next page, click **"uploading an existing file"**
7. Drag and drop ALL the files from this project folder (keep the folder structure — drag the `api` folder, `public` folder, `vercel.json`, `package.json`, and `README.md`)
8. Click **Commit changes**

### 2. Deploy on Vercel

1. Go to vercel.com and sign up with your GitHub account
2. Click **"Add New..."** → **Project**
3. Find `one-game-facilitator` in your repo list and click **Import**
4. **IMPORTANT: Add your API key**
   - Expand **Environment Variables**
   - Name: `ANTHROPIC_API_KEY`
   - Value: paste your Anthropic API key
   - Click **Add**
5. Click **Deploy**
6. Wait about 60 seconds — you'll get a URL like `one-game-facilitator.vercel.app`

That's it! Share the URL with anyone.

## Making Changes Later

1. Ask Claude to update the code
2. Download the updated file(s)
3. Go to your GitHub repo
4. Click the file you want to update → pencil icon (edit) → paste new content → Commit
5. Vercel auto-redeploys in ~60 seconds

## Custom Domain (Optional)

If you want a nicer URL:
1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel dashboard → your project → Settings → Domains
3. Add your domain and follow the DNS instructions
