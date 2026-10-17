import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionTitle } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rohit Raj Sharma" },
      { name: "description", content: "Get in touch with Rohit Raj Sharma for full stack and AI/ML projects." },
      { property: "og:title", content: "Contact — Rohit Raj Sharma" },
      { property: "og:description", content: "Get in touch for full stack and AI/ML projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <SectionTitle eyebrow="Contact" title="Let's build something." />
      <Reveal>
        <p className="max-w-xl text-lg text-muted-foreground">
          Open to full stack, AI/ML automation and freelance collaborations.
        </p>
        <a
          href="mailto:rohitrajsharma@example.com"
          className="mt-10 inline-block font-display text-3xl font-bold text-gradient md:text-5xl"
        >
          rohitrajsharma@example.com
        </a>
      </Reveal>
    </>
  );
}
