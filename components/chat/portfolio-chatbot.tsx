"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Bot,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

const suggestions = [
  "دربارهٔ تجربه‌های کاری جواد بگو",
  "چه خدماتی ارائه می‌دهد؟",
  "چند نمونه از پروژه‌ها را معرفی کن",
];

function getMessageText(message: {
  parts: Array<{ type: string; text?: string }>;
}) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text ?? "" : ""))
    .join("");
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    clearError,
    setMessages,
    regenerate,
  } = useChat({ transport: chatTransport });

  const isBusy = status === "submitted" || status === "streaming";
  const isConversationFull = messages.length >= 12;
  const lastMessage = messages.at(-1);
  const isWaitingForAssistant =
    isBusy &&
    (lastMessage?.role === "user" ||
      (lastMessage?.role === "assistant" && !getMessageText(lastMessage)));

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  function submitMessage(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText || isBusy || isConversationFull) return;

    clearError();
    setInput("");
    void sendMessage({ text: trimmedText });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(input);
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  }

  function startNewConversation() {
    if (isBusy) void stop();
    setMessages([]);
    clearError();
    setInput("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen ? (
        <section
          aria-labelledby="portfolio-chat-title"
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 flex h-[min(38rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border bg-background shadow-2xl sm:w-[min(26rem,calc(100vw-3rem))]"
          dir="rtl"
          id="portfolio-chat-panel"
          role="region"
        >
          <header className="flex items-center justify-between gap-3 border-b bg-background px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot aria-hidden="true" className="size-5" />
                <span
                  aria-label="دستیار آمادهٔ پاسخ‌گویی است"
                  className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-background bg-emerald-500"
                  role="img"
                />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold" id="portfolio-chat-title">
                  دستیار جواد
                </h2>
                <p className="text-xs text-muted-foreground">
                  آمادهٔ پاسخ‌گویی به شما
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Button
                aria-label="شروع گفتگوی جدید"
                className="text-muted-foreground"
                onClick={startNewConversation}
                size="icon-sm"
                type="button"
                variant="ghost"
              >
                <RotateCcw aria-hidden="true" />
              </Button>
              <Button
                aria-label="بستن گفتگو"
                className="text-muted-foreground"
                onClick={() => setIsOpen(false)}
                size="icon-sm"
                type="button"
                variant="ghost"
              >
                <X aria-hidden="true" />
              </Button>
            </div>
          </header>

          <MessageScrollerProvider autoScroll>
            <MessageScroller className="flex-1 bg-muted/10">
              <MessageScrollerViewport>
                <MessageScrollerContent
                  aria-live="polite"
                  className="gap-4 p-4"
                >
                  {messages.length === 0 ? (
                    <div className="my-auto flex min-h-full flex-col items-center justify-center gap-4 text-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Sparkles aria-hidden="true" className="size-6" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold">
                          سلام، من دستیار جواد هستم.
                        </h3>
                        <p className="max-w-64 text-xs leading-5 text-muted-foreground">
                          چطور می‌تونم کمکتون کنم؟ دربارهٔ مهارت‌ها، تجربه‌ها،
                          خدمات یا پروژه‌های جواد بپرسید.
                        </p>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        {suggestions.map((suggestion) => (
                          <Button
                            className="h-auto justify-start whitespace-normal rounded-xl py-2.5 text-right leading-5"
                            disabled={isBusy}
                            key={suggestion}
                            onClick={() => submitMessage(suggestion)}
                            type="button"
                            variant="outline"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const text = getMessageText(message);
                      if (!text) return null;

                      const isUser = message.role === "user";

                      return (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                          scrollAnchor={isUser}
                        >
                          <Message
                            align={isUser ? "end" : "start"}
                            className="gap-2"
                          >
                            {isUser ? null : (
                              <span
                                aria-hidden="true"
                                className="mt-5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                              >
                                <Bot className="size-4" />
                              </span>
                            )}
                            <MessageContent className="gap-1">
                              <MessageHeader className="px-1">
                                {isUser ? "شما" : "دستیار"}
                              </MessageHeader>
                              <Bubble
                                align={isUser ? "end" : "start"}
                                className="max-w-[92%]"
                                variant={isUser ? "default" : "muted"}
                              >
                                <BubbleContent
                                  className="whitespace-pre-wrap"
                                  dir="auto"
                                >
                                  {text}
                                </BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      );
                    })
                  )}

                  {isWaitingForAssistant ? (
                    <Message className="gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      >
                        <Bot className="size-4" />
                      </span>
                      <MessageContent className="gap-1">
                        <MessageHeader className="px-1">
                          دستیار
                        </MessageHeader>
                        <Bubble variant="muted">
                          <BubbleContent>
                            <span
                              className="inline-flex items-center gap-2 text-muted-foreground"
                              role="status"
                            >
                              <span className="size-2 animate-pulse rounded-full bg-current motion-reduce:animate-none" />
                              در حال نوشتن…
                            </span>
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  ) : null}
                </MessageScrollerContent>
              </MessageScrollerViewport>
            </MessageScroller>
          </MessageScrollerProvider>

          <div className="border-t bg-background p-4">
            {error ? (
              <div
                className="mb-2 flex items-center justify-between gap-2 text-xs text-destructive"
                role="alert"
              >
                <p>ارسال پیام با مشکل روبه‌رو شد. دوباره تلاش کنید.</p>
                <Button
                  className="shrink-0"
                  onClick={() => void regenerate()}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  تلاش دوباره
                </Button>
              </div>
            ) : null}
            {isConversationFull ? (
              <p className="mb-2 text-center text-xs text-muted-foreground">
                برای ادامه، یک گفتگوی جدید شروع کنید.
              </p>
            ) : null}
            <form
              className="flex items-end gap-2"
              onSubmit={handleSubmit}
            >
              <Textarea
                aria-label="پیام شما"
                className="max-h-32 min-h-12 resize-none rounded-2xl px-4 py-3"
                disabled={isBusy || isConversationFull}
                maxLength={2_000}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="پیامتون رو بنویسید…"
                rows={1}
                value={input}
              />
              {isBusy ? (
                <Button
                  aria-label="توقف پاسخ"
                  className="size-12 shrink-0 rounded-2xl"
                  onClick={() => void stop()}
                  size="icon-lg"
                  type="button"
                  variant="secondary"
                >
                  <Square aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  aria-label="ارسال پیام"
                  className="size-12 shrink-0 rounded-2xl"
                  disabled={!input.trim() || isConversationFull}
                  size="icon-lg"
                  type="submit"
                >
                  <Send aria-hidden="true" />
                </Button>
              )}
            </form>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              پاسخ‌ها با هوش مصنوعی تولید می‌شوند.
            </p>
          </div>
        </section>
      ) : null}

      <div className="flex items-end gap-3">
        {!isOpen && showGreeting ? (
          <div
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 flex max-w-[min(19rem,calc(100vw-6rem))] items-start gap-2 rounded-2xl border bg-background p-3 shadow-lg"
            dir="rtl"
            role="status"
          >
            <button
              className="flex-1 rounded-lg text-right text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => {
                setShowGreeting(false);
                setIsOpen(true);
              }}
              type="button"
            >
              <span className="font-semibold">سلام، من دستیار جواد هستم.</span>
              <span className="block text-muted-foreground">
                چطور می‌تونم کمکتون کنم؟
              </span>
            </button>
            <Button
              aria-label="بستن پیام خوشامدگویی"
              className="-mt-1 -ml-1 shrink-0 text-muted-foreground"
              onClick={() => setShowGreeting(false)}
              size="icon-xs"
              type="button"
              variant="ghost"
            >
              <X aria-hidden="true" />
            </Button>
          </div>
        ) : null}

        <Button
          aria-controls={isOpen ? "portfolio-chat-panel" : undefined}
          aria-expanded={isOpen}
          aria-label={isOpen ? "بستن دستیار گفتگو" : "باز کردن دستیار گفتگو"}
          className="size-14 rounded-full shadow-lg"
          onClick={() => {
            setShowGreeting(false);
            setIsOpen((open) => !open);
          }}
          ref={triggerRef}
          size="icon-lg"
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <MessageCircle aria-hidden="true" className="size-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
