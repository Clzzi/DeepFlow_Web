import { useCallback, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { commentContentsState, commentListState, modifyState } from 'atom/comment';
import usePageParam from './util/usePageParam';
import { createComment, deleteComment, getCommentsByPostIdx, modifyComment } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';
import { IComment, ICommentModify } from 'types/comment.types';
import { ICommentDto } from 'lib/api/comment/comment.dto';

const useComment = () => {
  const postIdx: number = usePageParam();
  const [commentList, setCommentList] = useRecoilState<IComment[]>(commentListState);
  const [contents, setContents] = useRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState<ICommentModify | null>(modifyState);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

  const requestCommentList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { comments } } = await getCommentsByPostIdx(postIdx);

      if (status === EResponse.OK) {
        setCommentList(comments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postIdx, setCommentList]);

  const requestOfferComment = useCallback(async (): Promise<void> => {
    try {
      const commentDto: ICommentDto = {
        postIdx,
        contents,
      }

      if (modifyObject === null) {
        await createComment(commentDto);
      } else {
        await modifyComment(modifyObject.idx, commentDto);
      }

      setContents('');
      setModifyObject(null);
      await requestCommentList();
    } catch (error) {
      console.log(error);
    }
  }, [contents, modifyObject, postIdx, requestCommentList, setContents, setModifyObject]);

  const requestDeleteComment = useCallback(async (commentIdx: number): Promise<void> => {
    try {
      const { status } = await deleteComment(commentIdx, postIdx);

      if (status === EResponse.OK) {
        setModifyObject(null);
        await requestCommentList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [postIdx, requestCommentList, setModifyObject]);

  return {
    contents,
    setContents,
    onChangeContents,

    commentList,
    requestCommentList,

    requestOfferComment,
    requestDeleteComment,
  };
};

export default useComment;