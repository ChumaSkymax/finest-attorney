import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { options } from "@/convex/betterAuth/auth";

export const authClient = createAuthClient({
  plugins: [convexClient(), inferAdditionalFields<typeof options>()],
});
