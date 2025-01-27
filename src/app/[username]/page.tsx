import "../../index.css";
import { ClientOnly } from "./client";

export default function Page({ params }: { params: { username: string } }) {
	return <ClientOnly username={params.username} />
}