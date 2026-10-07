'use client';

import { Drawer } from 'vaul';
import React from "react";
import Link from "next/link";
import {MenuIcon, XIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function NavDrawer() {
  return (
      <Drawer.Root direction="right">
        <Drawer.Trigger className="relative flex h-16 w-16 shrink-0 items-center justify-center gap-2 overflow-hidden px-4 text-sm font-medium shadow-sm transition-all">
            <MenuIcon size={32}/>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
              className="right-2 top-2 bottom-2 fixed z-50 outline-none w-77.5 flex "
              // The gap between the edge of the screen and the drawer is 8px in this case.
              style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
          >
            <div className="bg-zinc-950 h-full w-full grow p-5 flex flex-col">
              <div className="max-w-md mx-4">
                <Drawer.Title className="font-medium mb-8 text-center text-xl">navigation menu</Drawer.Title>
                <div className={"w-full flex flex-col  space-y-8"}>
                  <Drawer.Close asChild>
                    <Link href={"/"} className={"flex-2 hover:underline underline-offset-8"}>home</Link>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Link href={"/portfolio"} className={"hover:underline underline-offset-8"}>portfolio</Link>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Link href={"/blog"} className={"hover:underline underline-offset-8"}>blog</Link>
                  </Drawer.Close>
                  <Drawer.Close asChild>
                    <Link href={"/about"} className={"hover:underline underline-offset-8"}>about</Link>
                  </Drawer.Close>
                </div>
              </div>
              
              <div className={"absolute top-4 right-4"}>
                <Drawer.Close asChild>
                  <Button type={"button"} variant={"link"} size={"icon"}>
                    <XIcon />
                  </Button>
                </Drawer.Close>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
  );
}