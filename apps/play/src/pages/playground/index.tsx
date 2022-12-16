import { FC, useEffect } from 'react';
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import PageWrapper from '../../hoc/page-wrapper';
import { SelectOptions } from './components/slect-options';
import { getTimer, TestEvent } from '../../apis/socketIo/timerSocketIo';

export const PlayGround: FC = () => {
  useEffect(() => {
    TestEvent();
    console.log('🚀 ~ file: index.tsx:19 ~ useEffect ~ getTimer');
    getTimer();
  }, []);
  return (
    <PageWrapper>
      <Flex>
        <Tabs w="100%" isFitted={true} variant="enclosed-colored">
          <TabList>
            <Tab>Option one</Tab>
            <Tab>Option Two</Tab>
            <Tab>Option Three</Tab>
            <Tab>Option Four</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SelectOptions />
            </TabPanel>
            <TabPanel>
              <SelectOptions />
            </TabPanel>
            <TabPanel>
              <SelectOptions />
            </TabPanel>
            <TabPanel>
              <SelectOptions />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </PageWrapper>
  );
};
