import {
  AreaChart,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import { useUserId } from "../../../../services/hooks/users";
import LoadingAnimation from "../../../shared/loadingAnimation";
import { formatNumber } from "../initialColumns";
import StyledAreaChart from "../../dashboard/styledAreaChart";
import RequestsPageV2 from "../../requestsV2/requestsPageV2";
import { ElementType } from "react";
import {
  PresentationChartLineIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import HcBreadcrumb from "../../../ui/hcBreadcrumb";
import { IslandContainer } from "@/components/ui/islandContainer";

interface UserIdPageProps {
  userId: string;
  defaultIndex?: number;
}

const tabs: {
  id: number;
  title: string;
  icon: ElementType<any>;
}[] = [
  {
    id: 0,
    title: "Usage",
    icon: PresentationChartLineIcon,
  },
  {
    id: 1,
    title: "Logs",
    icon: TableCellsIcon,
  },
];

const UserIdPage = (props: UserIdPageProps) => {
  const { userId, defaultIndex = 0 } = props;

  const { user, isLoading, costOverTime, requestOverTime } = useUserId(userId);
  const router = useRouter();

  return (
    <IslandContainer className=" py-10">
      <div className="flex flex-col items-start space-y-4 w-full">
        <HcBreadcrumb
          pages={[
            {
              href: "/users",
              name: "Users",
            },
            {
              href: `/users/${userId}`,
              name: userId,
            },
            // {},
          ]}
        />
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-end">
            <h1 className="font-semibold text-4xl text-black dark:text-white">
              {userId}
            </h1>
          </div>
        </div>
      </div>

      <>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="grid grid-cols-10 gap-8 w-full pt-8">
            <div className="flex flex-col items-start space-y-4 w-full col-span-12 md:col-span-3 pt-2">
              <div className="flex flex-col space-y-2 divide-y divide-gray-200 dark:divide-gray-800 w-full text-black dark:text-white">
                <p className="font-semibold text-md">Overview</p>
                <div className="flex flex-wrap w-full justify-between gap-2 pt-4 pr-4">
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">Total Cost</p>
                    <p className="text-sm text-gray-500">
                      ${formatNumber(Number(user.cost || 0), 6)}
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">Total Requests</p>
                    <p className="text-sm text-gray-500">
                      {user.total_requests}
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">Active For</p>
                    <p className="text-sm text-gray-500">
                      {user.active_for} day{user.active_for > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 divide-y divide-gray-200 dark:divide-gray-800 w-full pt-8 text-black dark:text-white">
                <p className="font-semibold text-md">Details</p>
                <div className="flex flex-col pt-4 pr-4 space-y-4">
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">First Active</p>
                    <p className="text-sm text-gray-500">
                      {new Date(user.first_active).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">Last Active</p>
                    <p className="text-sm text-gray-500">
                      {new Date(user.last_active).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">
                      Average Requests per day
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatNumber(user.average_requests_per_day_active)}
                    </p>
                  </div>{" "}
                  <div className="flex flex-col items-start space-y-1">
                    <p className="text-sm font-semibold">
                      Average Tokens per request
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatNumber(user.average_tokens_per_request)}
                    </p>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full col-span-12 md:col-span-7">
              <TabGroup defaultIndex={defaultIndex}>
                <TabList className="font-semibold" variant="line">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
                      icon={tab.icon}
                      onClick={() => {
                        const { id, page, t } = router.query;
                        router.replace(
                          {
                            pathname: `/users/[id]`,
                            query: { id, page, t, tab: tab.id },
                          },
                          undefined,
                          { shallow: true }
                        );
                      }}
                    >
                      {tab.title}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className="py-4 flex flex-col space-y-4">
                      <StyledAreaChart
                        title={"Requests last 30 days"}
                        value={undefined}
                        isDataOverTimeLoading={isLoading}
                        height={"200px"}
                      >
                        <AreaChart
                          data={requestOverTime}
                          categories={["requests"]}
                          index={"date"}
                          className="h-56"
                          colors={["blue"]}
                          showLegend={false}
                          curveType="monotone"
                        />
                      </StyledAreaChart>
                      <StyledAreaChart
                        title={"Costs in the last 30 days"}
                        value={undefined}
                        isDataOverTimeLoading={isLoading}
                        height={"200px"}
                      >
                        <AreaChart
                          data={costOverTime}
                          categories={["cost"]}
                          index={"date"}
                          className="h-56"
                          colors={["green"]}
                          showLegend={false}
                          valueFormatter={(value) => {
                            return `$${formatNumber(value, 6)}`;
                          }}
                          curveType="monotone"
                        />
                      </StyledAreaChart>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="py-2">
                      <RequestsPageV2
                        currentPage={1}
                        pageSize={25}
                        sort={{
                          sortKey: null,
                          sortDirection: null,
                          isCustomProperty: false,
                        }}
                        userId={userId}
                        currentFilter={null}
                        organizationLayout={null}
                        organizationLayoutAvailable={false}
                      />
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        )}
      </>
    </IslandContainer>
  );
};

export default UserIdPage;
