import ContributionHeader from "@/components/UI/ContributionHeader";
import { contributionGroups } from "@/lib/exampledata";

export default async function Page({ params }: { params: { id: string } }) {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API}/contributions/${decodeURIComponent(
      params.id
    )}`
  );
  let group = await data.json();

  return <div>{<ContributionHeader group={group.data} />}</div>;
}
