import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EComment, ECommentTab } from 'lib/enum/comment';
import { commentTabs, ICommentTab } from 'lib/models/tabs/commentTabs';
import useReply from 'hooks/reply/useReply';
import ReplyCancel from 'components/Reply/ReplyCancel';
import CommentInput from './CommentInput';
import CommentPreview from './CommentPreview';
import CommentSubmit from './CommentSubmit';
import PreviewTab from './PreviewTab';
import PreviewTabItem from './PreviewTab/PreviewTabItem';
import useOfferComment from 'hooks/comment/useOfferComment';

const style = require('./CommentForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentFormProps {
  type: EComment;
  commentIdx?: number;
  onChangeIsReplyWrite?: (isReplyWrite: boolean) => void;
}

const CommentForm = ({
  commentIdx,
  type,
  onChangeIsReplyWrite,
}: CommentFormProps): JSX.Element => {
  const { WRITE } = ECommentTab;
  const { COMMENT, REPLY } = EComment;

  const reply = useReply(commentIdx!);
  const {
    contents,
    onChangeContents,
    requestOfferComment,
    commentInputRef,
    commentDragRef,
    handleDrop,
    handleDragImage,
  } = useOfferComment();

  const [commentTab, setCommentTab] = useState<ECommentTab>(ECommentTab.WRITE);

  useEffect(() => {
    if (type === COMMENT) {
      if (commentDragRef.current !== null) {
        commentDragRef.current.addEventListener('drop', (e) => handleDrop(e, handleDragImage), true);
      }
    } else {
      if (reply.replyDragRef.current !== null) {
        reply.replyDragRef.current.addEventListener('drop', (e) => handleDrop(e, reply.handleDragImage), true);
      }
    }
  }, [COMMENT, commentDragRef, handleDragImage, handleDrop, reply.handleDragImage, reply.replyDragRef, type]);

  return (
    <div
      className={cx('CommentForm')}
      ref={type === COMMENT ? commentDragRef : reply.replyDragRef}
    >
      <div className={cx('CommentForm-ContentsWrap')}>
        <PreviewTab>
        {
          commentTabs.map(({ id, name, icon }: ICommentTab) => (
            <PreviewTabItem
              key={id}
              id={id}
              name={name}
              icon={icon}
              commentTab={commentTab}
              setCommentTab={setCommentTab}
            />
          ))
        }
        </PreviewTab>
        {
          commentTab === WRITE ?
          <CommentInput
            type={type}
            contents={type === COMMENT ? contents : reply.contents}
            onChangeContents={type === COMMENT ? onChangeContents : reply.onChangeContents}
            commentInputRef={type === COMMENT ? commentInputRef : reply.replyInputRef}
          />
          :
          <CommentPreview contents={type === COMMENT ? contents : reply.contents} />
        }
      </div>

      <div className={cx('CommentForm-BottomWrap')}>
        {
          type === REPLY &&
          <ReplyCancel
            onChangeIsReplyWrite={() => onChangeIsReplyWrite!(false)}
          />
        }

        <CommentSubmit
          requestOfferComment={type === COMMENT ? requestOfferComment : reply.requestOfferReply}
        />
      </div>
    </div>
  );
};

export default CommentForm;
