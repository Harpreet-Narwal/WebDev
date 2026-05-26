import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export default function Page() {
  return (
    <div className="flex text-2xl text-center">
      Hi there
    </div>
  );
}
