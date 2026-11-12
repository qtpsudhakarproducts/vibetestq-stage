# Tamash Chrome Web Store — Privacy Disclosure

Updated for extension **v2.0.0** (May 31, 2026).

This document is a practical draft for the Chrome Web Store privacy form for **Tamash — WebMCP Tester**.

It is aligned with the published privacy policy at `vibetestq.com/tamash/privacy`.

---

## Short Position

- **Yes**, the extension handles user data.
- It does so **only** to provide its core functionality.
- It does **not** sell user data.
- It does **not** use user data for advertising.
- It does **not** send any data to VibeTestQ servers.

---

## Data Types to Disclose

### 1. Authentication information
**Why:** The extension stores user-supplied AI API keys and Remote MCP server credentials (Jira email/token, GitHub PAT) in `chrome.storage.local`. These credentials are also transmitted to the respective third-party providers when the user invokes those features.

### 2. Website content
**Why:** The extension intercepts WebMCP tool registrations (`document.modelContext.registerTool()`) on the active page and reads the tool names, descriptions, and input schemas. In Agent Mode, tool results returned by the page may be sent to the user-configured AI provider as part of the agentic conversation.

### 3. User activity
**Why:** The extension processes user prompts (Agent tab goal field), tool invocations, and tool results to perform automation. Agent run history is held in-memory for the current session.

### 4. Personally identifiable information (conservative)
**Why:** The extension may process whatever personal data is present in WebMCP tool responses, tool parameters, or agent prompts for the site being automated. TAMASH does not collect PII itself, but it operates on page content that may contain it.

---

## Data Types NOT to Disclose

Leave these **unselected** — the current extension does not access them:

- Health information
- Financial and payment information *(note: if pages being automated involve payments, the tool parameters may incidentally carry financial data — use conservative PII disclosure above)*
- Precise location
- Personal communications
- Audio, photos, videos
- Contacts
- Web history *(the extension reads the current tab URL/title but does not maintain a browsing history feature)*
- Cookies *(removed in v2.0.0 — `__agent_getCookies` no longer exists)*
- Local storage *(removed in v2.0.0 — `__agent_getLocalStorage` no longer exists)*

---

## Purposes to Select

**Select:**
- **App functionality** — all disclosed data is used solely to discover WebMCP tools, execute browser actions, support Agent Mode, and support configured Remote MCP providers

**Do not select:**
- Analytics
- Developer communications
- Advertising or marketing
- Personalization unrelated to core functionality

---

## Is Data Sold?
**No.** Tamash does not sell user data.

---

## Is Data Used for Advertising?
**No.** Tamash does not use user data for advertising, retargeting, profiling, or data brokerage.

---

## Is Data Used for Creditworthiness or Lending?
**No.**

---

## Is Data Shared with Third Parties?
**Yes — only when required by a user-enabled feature.**

Use this explanation if the form allows free text:

> "Tamash may transmit WebMCP tool results, tool parameters, user prompts, and AI tool schemas to user-configured third-party AI providers (OpenAI, Anthropic, Google, Ollama) when Agent Mode is used. If the user configures Jira or GitHub Remote MCP, tool-call requests and authentication credentials may be sent to those providers. All third-party transmission is opt-in, user-initiated, and uses HTTPS. No data is sent to VibeTestQ."

---

## Is Data Processed Locally?
**Yes — primarily.**

Use this explanation if needed:

> "Tamash performs all WebMCP tool discovery and invocation inside the browser. Tool Tester and Flow tabs operate entirely locally with no network calls. Agent Mode and Remote MCP features involve outbound HTTPS requests to user-configured providers only when the user explicitly initiates a run or test."

---

## Store Listing Narrative

If the Chrome Web Store asks for an explanation of why the extension needs the disclosed data, use wording close to this:

> "Tamash intercepts WebMCP tools registered by web applications via `document.modelContext.registerTool()` and makes them available in a side panel for manual testing (Tool Tester), AI-driven execution (Agent), and reusable replay (Flow). The extension stores user-configured AI provider settings and credentials locally in Chrome extension storage. In Agent Mode, it sends user prompts, tool schemas, and tool results to the AI provider chosen by the user. If the user configures a Remote MCP provider such as Jira or GitHub, Tamash sends requests and authentication headers to that provider. Tamash does not sell user data, does not collect analytics, and does not send any data to VibeTestQ servers."

---

## Chrome Permissions Justification

| Permission | Justification |
|---|---|
| `<all_urls>` host | Must inject the WebMCP interceptor into any tab; WebMCP-enabled apps can be hosted on any domain |
| `scripting` | Inject interceptor into page MAIN world at `document_start` to capture `registerTool()` calls; execute tool calls in MAIN world |
| `activeTab` | Target tool operations at the currently active tab |
| `storage` | Persist AI provider settings, API key, Remote MCP credentials, and saved flows across sessions |
| `sidePanel` | Render the TAMASH side panel alongside the browsed page |
| `tabs` | Detect tab switches and page loads to auto-refresh the tool list |
| `api.openai.com` etc. | Direct `fetch()` from the extension to user-configured LLM providers (Agent Mode) |
| `mcp.atlassian.com` | Direct `fetch()` to Jira Remote MCP when user configures it |
| `api.githubcopilot.com` | Direct `fetch()` to GitHub Remote MCP when user configures it |

---

## What Changed from v1.x to v2.0.0

These features were **removed** and no longer need to be disclosed:

- **MCP Mode / WebSocket** — the extension no longer maintains a WebSocket connection to a local MCP server
- **DOM tool scanning** — the extension no longer auto-generates `fill_*` / `click_*` tools from DOM elements
- **`__agent_getCookies`** — cookie reading helper removed
- **`__agent_getLocalStorage`** — localStorage reading helper removed
- **`wmcpPort` / `tamashMode`** — no longer stored in `chrome.storage.sync`

These features were **added** in v2.0.0:

- **Flow tab** — stores `tamashFlows` array in `chrome.storage.local` (flow name, steps, parameters, creation timestamp)

---

## Summary: Minimum Disclosure

For the lowest review risk, disclose:

- **Authentication information** — API keys, Remote MCP credentials
- **Website content** — WebMCP tool definitions, tool results from active page
- **User activity** — prompts, tool invocations, agent steps
- **Personally identifiable information** — (conservative) page content via tools may contain PII

Purpose: **App functionality only**

Sold: **No** | Advertising: **No** | Creditworthiness/lending: **No**
