import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/glow-effect";

export default function NotFoundPage() {
	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center text-center -mt-16">
			<GlowEffect />

			{/* SVG Illustration */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="mb-8 h-24 w-24 text-muted-foreground"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="15" y1="9" x2="9" y2="15" />
				<line x1="9" y1="9" x2="15" y2="15" />
			</svg>

			{/* 404 Content */}
			<div className="space-y-6">
				<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
					Oops! Page Not Found
				</h1>
				<p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
					The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
				</p>
				<div className="flex flex-col gap-2 justify-center min-[400px]:flex-row">
					<Link href="/">
						<Button size="lg" className="group">
							Go Back Home
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
					<Link href="/contact">
						<Button size="lg" variant="outline">
							Contact Support
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
