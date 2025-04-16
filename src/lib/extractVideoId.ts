export function extractVideoId(url: string): string {
    try {
      const parsed = new URL(url);
  
      if (parsed.searchParams.has("v")) {
        return parsed.searchParams.get("v")!;
      }
  
      if (parsed.hostname === "youtu.be") {
        return parsed.pathname.slice(1);
      }
  
      const match = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  
      return match ? match[1] : "";
    } catch {
      return "";
    }
  }
  