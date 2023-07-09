import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
		<body>
		<ul>
			<li><a href="/">home</a></li>
			<li><a href="/enquiries">enquiries</a></li>
			<li><a href="/privacy-policy">privacy-policy</a></li>
			<li><a href="/terms">terms</a></li>
			<li><a href="/fly-in-safari">fly-in-safari</a></li>
			<li><a href="/fly-in-safari/namibia-safaris-from-windhoek">fly-in-safari/namibia-safaris-from-windhoek</a></li>
		</ul>
		{children}
		</body>
		</html>
	);
}
