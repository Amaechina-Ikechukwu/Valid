import ContributionHeader from "@/components/UI/ContributionHeader";
import { contributionGroups } from "@/lib/exampledata";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <ContributionHeader
        data={contributionGroups[decodeURIComponent(params.id)]}
      />
    </div>
  );
}
