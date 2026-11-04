# Pushing this project to your second GitHub account (`chauhan-complex`)

## First, the thing that trips everyone up

`git config user.name` / `user.email` are **only the name printed on commits**. They are not a login.
Pushing is decided by **credentials**, and your PC currently has `brodante`'s credentials cached — so
git will happily try to push as brodante and either fail with `403` or push to the wrong account.

So there are two jobs:

1. **Create the repository under `chauhan-complex`** (the owner dropdown, not your default account).
2. **Authenticate as `chauhan-complex` for this one repository.** Pick Method A, B or C below.

Nothing inside the project needs changing — `public/CNAME` already says `chauhan.qd.je`, and the
custom domain hides whichever account owns the repo.

---

## Quick reference

| What | Value |
|---|---|
| Repository owner | `chauhan-complex` |
| Repository name | `chauhan-properties` |
| Remote URL (HTTPS) | `https://chauhan-complex@github.com/chauhan-complex/chauhan-properties.git` |
| Remote URL (SSH) | `git@github-chauhan:chauhan-complex/chauhan-properties.git` |
| Temporary Pages URL | `https://chauhan-complex.github.io/chauhan-properties/` |
| `www` DNS target | `chauhan-complex.github.io` |
| Real domain | `chauhan.qd.je` (already wired in `public/CNAME`) |

---

## STEP 0 — Create the empty repository on the other account

1. Sign **out** of brodante (or open a private/incognito window) and sign in as
   **`chauhan-complex`** at github.com.
2. **+** (top right) → **New repository**.
3. **Owner:** `chauhan-complex` ← check this dropdown, it defaults to your personal account.
   - If `chauhan-complex` is an **organisation**, you must be an owner/member with repo-creation
     rights; ask an owner to add you, or have them create the empty repo and jump to Method A.
4. **Repository name:** `chauhan-properties`
5. **Visibility:** **Public** (GitHub Pages is free on public repos; on a private repo it needs a
   paid Team/Enterprise plan).
6. Do **not** add README, .gitignore or license — the project already has all three.
7. **Create repository.**

---

## Method A — HTTPS + Personal Access Token *(recommended, ~5 minutes)*

**A1 · Make a token on the `chauhan-complex` account** (while signed in as that account):

1. Avatar → **Settings** → bottom of the left sidebar → **Developer settings**.
2. **Personal access tokens → Tokens (classic) → Generate new token (classic)**.
3. Note: `chauhan-properties push` · Expiration: 90 days (or *No expiration*).
4. Scope: tick **`repo`** (all of it). If you plan to edit workflow files later, also tick
   **`workflow`**.
5. **Generate token** → **copy it immediately** (starts with `ghp_…`; GitHub never shows it again).

**A2 · Tell git to keep separate credentials per repository.** This is the step that stops it from
reusing brodante's login:

```bash
git config --global credential.useHttpPath true
```

On a **Mac**, if it still uses the old identity, clear the stored one first:

```bash
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
```

On **Windows**, Git Credential Manager will now show an account picker in the browser — choose
`chauhan-complex`, or pick *"Sign in with a token"* and paste the PAT.

**A3 · Point this project at the new repository.** In the project folder:

```bash
git remote remove origin 2>/dev/null
git remote add origin https://chauhan-complex@github.com/chauhan-complex/chauhan-properties.git
git remote -v
```

Putting `chauhan-complex@` in the URL is what makes git ask for **that** account's credentials.

**A4 · Commit as that account (this repo only — your global brodante identity stays untouched):**

```bash
git config user.name "chauhan-complex"
git config user.email "chauhan-complex@users.noreply.github.com"
```

Use the exact no-reply address shown on that account under **Settings → Emails**.

**A5 · Push:**

```bash
git branch -M main
git push -u origin main
```

When it asks for a password, **paste the PAT** — your GitHub password will be rejected.

> Storing the token in the remote URL instead (`https://chauhan-complex:ghp_xxx@github.com/…`) also
> works and never prompts, but it saves the token in plain text inside `.git/config`. Only do that on
> a personal machine you trust.

---

## Method B — A second SSH key *(best if you'll switch accounts often)*

**B1 · Generate a new key — do not overwrite the brodante one:**

```bash
ssh-keygen -t ed25519 -C "chauhan-complex" -f ~/.ssh/id_ed25519_chauhan
```
Press Enter at the passphrase prompt (or set one).

**B2 · Add the *public* key to the other account:**

```bash
cat ~/.ssh/id_ed25519_chauhan.pub
```
Copy the output → sign in as `chauhan-complex` → **Settings → SSH and GPG keys → New SSH key** →
paste → **Add SSH key**.

**B3 · Give that key its own hostname.** Create/edit `~/.ssh/config`
(Windows: `C:\Users\YOU\.ssh\config`, no extension):

```
Host github-chauhan
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_chauhan
  IdentitiesOnly yes
```

**B4 · Use the alias and push:**

```bash
git remote set-url origin git@github-chauhan:chauhan-complex/chauhan-properties.git
ssh -T git@github-chauhan        # must say: Hi chauhan-complex!
git branch -M main
git push -u origin main
```

`IdentitiesOnly yes` is important — without it ssh offers your brodante key first and GitHub
authenticates you as brodante.

---

## Method C — GitHub Desktop *(no terminal at all)*

1. Install **GitHub Desktop** → **File → Options → Accounts → Add** → sign in as `chauhan-complex`.
2. **File → Add local repository** → select the project folder. If it says "this directory does not
   appear to be a Git repository", click **create a repository** and keep the existing `.gitignore`.
3. Top-right **Publish repository** → **uncheck** "Keep this code private" → the owner dropdown must
   show `chauhan-complex` → **Publish**.
4. It creates the repo and pushes in one go. To switch accounts later: Options → Accounts, or the
   repository's Settings → remote URL.

---

## After the push — three differences from the brodante instructions

1. **Enable Pages on the NEW repo.** Settings do not transfer:
   repo → **Settings → Pages → Source: `GitHub Actions`**, then Actions → *Run workflow*.
   (This is STEP 7 and STEP 8 in `DEPLOY-STEPS.md`.)
2. **Temporary URL** is `https://chauhan-complex.github.io/chauhan-properties/`.
3. **The `www` DNS record** must point at `chauhan-complex.github.io` — *not* brodante.github.io.
   The four `A` records (`185.199.108.153`–`185.199.111.153`) are identical for everybody.
   `DEPLOY-STEPS.md` STEP 10 already has the correct values.

`chauhan.qd.je` itself is unaffected — `public/CNAME` ships with every build.

---

## Why uploading through the website didn't work

- The **Upload files** button flattens folders. You *can* fake a path by typing it into the filename
  box (`src/data/site.ts`) — fine for editing one file later, hopeless for ~90 files.
- It ignores `.gitignore`, so dragging the project folder in would try to upload `node_modules`
  (tens of thousands of files, hundreds of MB) and your `.env` (secrets).
- Use `git push` once. After that, single-file edits from the browser — open `src/data/site.ts`,
  press the **pencil** icon, commit — work perfectly and trigger a rebuild automatically.

---

## Easier alternative, if two logins get annoying

Keep the repo owned by `chauhan-complex` (that is the public face you want) and add brodante as a
collaborator:

repo → **Settings → Collaborators and access → Add people** → `brodante` → accept the invite.

Your existing cached credentials then work unchanged, you can push to
`https://github.com/chauhan-complex/chauhan-properties.git` straight away, and the repository still
lives entirely on the other account. For a one-person site this is usually the least friction.
