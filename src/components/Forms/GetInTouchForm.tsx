"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function GetInTouchForm() {
  return (
    <div className="flex w-[380px] flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl">
      <h3 className="desktop-tablet__heading__h4 !font-semibold text-black">
        Get In Touch
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Full Name</label>
          <Input
            type="text"
            className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Phone number</label>
          <Input
            type="text"
            className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Email</label>
          <Input
            type="email"
            className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Messages</label>
          <Textarea
            rows={4}
            className="focus:ring-danger-500 w-full resize-none rounded-md border-none bg-gray-100 outline-none focus:ring-2"
          />
        </div>

        <Button
          type="submit"
          variant={"outline"}
          className="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
