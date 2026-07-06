"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/nav";
import { AuraMark } from "./aura-mark";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[80] flex w-[88%] max-w-sm flex-col bg-milk shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <AuraMark className="h-7 w-7" />
              <span className="font-display text-xl font-semibold">AURA</span>
            </Link>
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Dialog.Close asChild>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Accordion type="multiple" defaultValue={[NAV[0].label]}>
              {NAV.map((group) => (
                <AccordionItem key={group.label} value={group.label}>
                  <AccordionTrigger className="font-display text-lg">{group.label}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2 py-2 text-ink-70 hover:bg-ink/5 hover:text-ink"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="border-t border-ink/10 p-6">
            <Link
              href="/description"
              onClick={() => setOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-ink font-medium text-milk"
            >
              Explore the Project
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
