import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { FC } from 'react';
import PageWrapper from '../../hoc/page-wrapper';
import { HistoryTable } from './components/history-table';
import { SelectOptions } from './components/slect-options';
import { Timer } from './components/timer';

export const PlayGround: FC = () => {
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
              <Timer />
              <SelectOptions />
              <HistoryTable />
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
