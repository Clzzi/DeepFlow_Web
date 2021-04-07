import PageTemplate from 'components/Template/PageTemplate';
import UserTemplate from 'components/User';
import UserContainer from 'containers/User';

const UserInfoPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserTemplate>
        <UserContainer />
      </UserTemplate>
    </PageTemplate>
  );
}

export default UserInfoPage;