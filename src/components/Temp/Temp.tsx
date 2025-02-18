import { useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useQuestions from 'hooks/question/questionHooks/useQuestions';
import useTempQuestions from 'hooks/question/useTempQuestions';
import { IQuestion } from 'types/question.types';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import PageNumberList from 'components/Common/Post/PageNumberList';
import NoItems from 'components/Common/NoItems';
import Helmet from 'components/Common/Helmet';
import useDeleteQuestion from 'hooks/question/questionHooks/useDeleteQuestion';

const style = require('./Temp.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Temp = (): JSX.Element => {
  const {
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = useQuestions();
  const { tempQuestions, requestTempQuestions } = useTempQuestions();
  const { requestDeleteQuestion } = useDeleteQuestion();

  useEffect(() => {
    requestTempQuestions();
  }, [requestTempQuestions]);

  return (
    <div className={cx('Temp')}>
      <Helmet title='임시저장' />
      <PageTitle
        title='임시저장 글 목록'
        subTitle='임시저장 글 목록이 여기에 표시됩니다.'
      />

      <div className={cx('Temp-List')}>
        {
          tempQuestions.length > 0 ?
          tempQuestions.map((question: IQuestion) => (
            <ListItem
              key={question.idx}
              {...question}
              requestDeleteQuestion={requestDeleteQuestion}
            />
          )) : <NoItems text='임시저장글이 없습니다.' />
        }
      </div>

      {
        tempQuestions.length > 0 &&
        <PageNumberList
          currentPage={currentPage}
          onChangeCurrentPage={onChangeCurrentPage}
          numberListPage={numberListPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pageList={splitedNumberList}
        />
      }
    </div>
  );
};

export default Temp;
