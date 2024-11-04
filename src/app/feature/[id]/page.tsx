import ContributionHeader from "@/components/UI/ContributionHeader";
import { contributionGroups } from "@/lib/exampledata";

export default async function Page({ params }: { params: { id: string } }) {
  // let data = await fetch(
  //   `${process.env.NEXT_PUBLIC_API}/contributions/${params.id}`,
  //   {
  //     headers: {
  //       // Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // let group = await data.json();

  return <div>{<ContributionHeader id={params.id} />}</div>;
}
