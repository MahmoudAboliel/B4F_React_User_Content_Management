import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import type { Comment } from "@/lib/types";

const CommentMessage = ({
  comments,
}: {
  comments: Comment[];
  userEmail: string | undefined;
}) => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 py-12">
      {comments.map((comment, idx) => {
        // In React, calling a state updater function during render causes an immediate re-render.
        // handleToggle();
        return (
          <Message key={comment.id} align={idx % 2 === 0 ? "start" : "end"}>
            <MessageAvatar>
              <Avatar>
                <AvatarImage src="/avatars/10.png" alt="@me" />
                <AvatarFallback>{comment.name}</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>{comment.body}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        );
      })}
    </div>
  );
};

export default CommentMessage;
