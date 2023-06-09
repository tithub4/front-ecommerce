"use client";

import { FC } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

const Chat: FC = () => {
	return (
		<Accordion
			type="single"
			collapsible
			className="relative z-40 bg-white shadow"
		>
			<AccordionItem value="item-1">
				<div className="fixed overflow-hidden bg-white border border-gray-200 rounded-md right-8 w-80 bottom-8">
					<div className="flex flex-col w-full h-full">
						<AccordionTrigger className="px-6 border-b border-zinc-300">
							<ChatHeader />
						</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col h-80">
								<ChatMessages className="flex-1 px-2 py-3" />
								<ChatInput className="px-4" />
							</div>
						</AccordionContent>
					</div>
				</div>
			</AccordionItem>
		</Accordion>
	);
};

export default Chat;
