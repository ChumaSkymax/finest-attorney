import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LogoutButton() {
  return (
    <div>
      <Button
        className="cursor-pointer"
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toast.success("Logged out successfully");
              },
              onError: () => {
                toast.error("Failed to log out");
              },
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
}
