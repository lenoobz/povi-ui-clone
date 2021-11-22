import React, { useCallback, useContext, useState } from 'react';
import { GlobalContext } from 'stores/contexts/GlobalContext';
import { GlobalContextType } from 'stores/contexts/GlobalContext';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PageContent } from 'components/PageContent';
import { Sidebar } from 'components/Sidebar';
import { PageAlert } from 'components/PageAlert';
import { ProgressBar } from 'components/ProgressBar';

export const DashboardLayout: React.FC = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [ctx]: GlobalContextType = useContext(GlobalContext);

  const onClickHeader = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  const onCloseSidebar = useCallback(() => {
    setOpened(false);
  }, [setOpened]);

  const { userDetails, isFetching } = ctx;
  const progressBar = isFetching ? <ProgressBar /> : null;

  return (
    <>
      {progressBar}
      <Header userDetails={userDetails} onClick={onClickHeader} />
      <Sidebar isOpened={opened} onClose={onCloseSidebar} />
      <PageContent>
        <PageAlert />
        {children}
        <Footer />
      </PageContent>
    </>
  );
};
