import ContributionHeader from "@/components/UI/ContributionHeader";


export default async function Page({ params }: { params: { id: string } }) {
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API}/contributions/${decodeURIComponent(
    params.id
  )}`,
  {
    method: "GET", // Specify the HTTP method
  }
);

if (!response.ok) {
  throw new Error(`Error fetching contribution data: ${response.statusText}`);
}

const group = await response.json();
console.log(group.data);
return (
  <div className="w-full">{<ContributionHeader group={group.data} />}</div>
);
}
