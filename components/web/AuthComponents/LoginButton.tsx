import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Signin() {
  return (
    <div>
      <Button className="cursor-pointer">
        <Link className="buttonVariant" href="/auth/login">
          Sign In
        </Link>
      </Button>
    </div>
  );
}
