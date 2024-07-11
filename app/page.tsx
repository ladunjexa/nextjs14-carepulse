import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <h1 className="text-white underline">Hello, World!</h1>
        <Button>Click Me</Button>
      </section>
    </div>
  );
}
