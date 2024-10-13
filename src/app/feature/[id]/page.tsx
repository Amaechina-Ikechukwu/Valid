import ContributionHeader from "@/components/UI/ContributionHeader";
import { contributionGroups } from "@/lib/exampledata";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <ContributionHeader
        data={contributionGroups[decodeURIComponent(params.id)]}
      />
    </div>
  );
}
